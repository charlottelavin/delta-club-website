import { parse } from 'csv-parse/sync';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { events } from '@/db/schema';

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
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    const imageBuffer = await response.arrayBuffer();
    const imageBlob = new Blob([imageBuffer]);
    const blob = await put(
      `event-images/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`,
      imageBlob,
      { access: 'public' }
    );
    return blob.url;
  } catch {
    return imageUrl;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    const contentType = file.type;
    if (
      contentType !== 'text/csv' &&
      contentType !== 'application/csv' &&
      !file.name.toLowerCase().endsWith('.csv')
    ) {
      return NextResponse.json(
        { error: 'File must be a CSV' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const records = parse(text, {
      columns: [
        'name',
        'committee',
        'hours',
        'description',
        'url',
        'featured',
        'address',
        'age',
        'imageUrl',
      ],
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as Record<string, string>[];

    const results: CSVEvent[] = records
      .filter((row) => row.name && String(row.name).trim() !== '')
      .map((row) => ({
        ...row,
        featured: row.featured === 'TRUE',
      })) as CSVEvent[];

    for (let i = 0; i < results.length; i++) {
      const event = results[i];
      let blobImageUrl = event.imageUrl ?? '';
      if (blobImageUrl.trim() !== '') {
        blobImageUrl = await downloadImageAsBlob(blobImageUrl);
      }
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
    }

    return NextResponse.json({
      success: true,
      uploaded: results.length,
    });
  } catch (err) {
    console.error('Upload events error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
