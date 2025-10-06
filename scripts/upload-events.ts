import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { put } from '@vercel/blob';
import { db } from '../src/db';
import { events } from '../src/db/schema';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

interface CSVEvent {
  name: string;
  committee: string;
  hours: string;
  description: string;
  url: string;
  featured: boolean;
  address: string;
  age: string;
  imageUrl: string;
}

async function downloadImageAsBlob(imageUrl: string): Promise<string> {
  try {
    console.log(`Downloading image: ${imageUrl}`);
    
    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    const imageBlob = new Blob([imageBuffer]);
    
    // Upload to Vercel Blob
    const blob = await put(`event-images/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`, imageBlob, {
      access: 'public',
    });
    
    console.log(`Uploaded image to: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`Error processing image ${imageUrl}:`, error);
    // Return the original URL if blob upload fails
    return imageUrl;
  }
}

async function processCSV(): Promise<void> {
  const csvPath = join(process.cwd(), 'src', 'Delta Club.csv');
  const results: CSVEvent[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(parse({
        columns: ['name', 'committee', 'hours', 'description', 'url', 'featured', 'address', 'age', 'imageUrl'],
        skip_empty_lines: true,
        trim: true,
      }))
      .on('data', (data) => {
        // Convert featured string to boolean
        const featured = data.featured === 'TRUE';
        results.push({
          ...data,
          featured,
        });
      })
      .on('end', async () => {
        console.log(`Found ${results.length} events in CSV`);
        
        try {
          // Process each event
          for (let i = 0; i < results.length; i++) {
            const event = results[i];
            console.log(`Processing event ${i + 1}/${results.length}: ${event.name}`);
            
            // Download and upload image to Vercel Blob
            let blobImageUrl = event.imageUrl;
            if (event.imageUrl && event.imageUrl.trim() !== '') {
              blobImageUrl = await downloadImageAsBlob(event.imageUrl);
            }
            
            // Insert event into database
            await db.insert(events).values({
              name: event.name,
              committee: event.committee,
              hours: event.hours || null,
              description: event.description,
              url: event.url || null,
              featured: event.featured,
              address: event.address,
              age: event.age,
              imageUrl: blobImageUrl || null,
            });
            
            console.log(`✅ Inserted event: ${event.name}`);
          }
          
          console.log(`🎉 Successfully uploaded ${results.length} events to the database!`);
          resolve();
        } catch (error) {
          console.error('Error processing events:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      });
  });
}

async function main() {
  try {
    console.log('🚀 Starting CSV upload process...');
    await processCSV();
    console.log('✅ Upload process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Upload process failed:', error);
    process.exit(1);
  }
}

// Run the script
main();
