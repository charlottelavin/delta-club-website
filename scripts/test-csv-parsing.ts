import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';

async function testCSVParsing(): Promise<void> {
  const csvPath = join(process.cwd(), 'src', 'Delta Club.csv');
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(csvPath)
      .pipe(parse({
        columns: ['name', 'committee', 'hours', 'description', 'url', 'featured', 'address', 'age', 'imageUrl'],
        skip_empty_lines: true,
        trim: true,
      }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        console.log(`Found ${results.length} events in CSV`);
        console.log('First 3 events:');
        results.slice(0, 3).forEach((event, index) => {
          console.log(`\nEvent ${index + 1}:`);
          console.log(`  Name: ${event.name}`);
          console.log(`  Committee: ${event.committee}`);
          console.log(`  Hours: ${event.hours}`);
          console.log(`  Description: ${event.description.substring(0, 100)}...`);
          console.log(`  URL: ${event.url}`);
          console.log(`  Featured: ${event.featured}`);
          console.log(`  Address: ${event.address}`);
          console.log(`  Age: ${event.age}`);
          console.log(`  Image URL: ${event.imageUrl}`);
        });
        resolve();
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      });
  });
}

async function main() {
  try {
    console.log('🧪 Testing CSV parsing...');
    await testCSVParsing();
    console.log('✅ CSV parsing test completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ CSV parsing test failed:', error);
    process.exit(1);
  }
}

main();
