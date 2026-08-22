import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { events } from '@/db/schema';

export const dynamic = 'force-dynamic';

function getText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? '').trim();
}

export async function POST(request: Request) {
  await auth.protect({ permission: 'org:basic:events_upload' });

  try {
    const formData = await request.formData();
    const name = getText(formData, 'name');
    const committee = getText(formData, 'committee');
    const description = getText(formData, 'description');
    const address = getText(formData, 'address');
    const age = getText(formData, 'age');
    const hours = getText(formData, 'hours');
    const url = getText(formData, 'url');
    const imageUrl = getText(formData, 'imageUrl');

    if (!name || !committee || !description || !address || !age) {
      return NextResponse.json(
        { error: 'Name, committee, description, location, and age information are required.' },
        { status: 400 }
      );
    }

    if (url && !URL.canParse(url)) {
      return NextResponse.json(
        { error: 'The sign-up link must be a complete URL, such as https://example.com.' },
        { status: 400 }
      );
    }

    if (imageUrl && !URL.canParse(imageUrl)) {
      return NextResponse.json(
        { error: 'The image link must be a complete URL, such as https://example.com/image.jpg.' },
        { status: 400 }
      );
    }

    const { db } = await import('@/db');
    const [event] = await db.insert(events).values({
      name,
      committee,
      hours: hours || null,
      description,
      url: url || null,
      featured: formData.get('featured') === 'on',
      address,
      age,
      imageUrl: imageUrl || null,
    }).returning({ id: events.id });

    return NextResponse.json({ success: true, id: event.id }, { status: 201 });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'The event could not be saved. Please check your database connection and try again.' },
      { status: 500 }
    );
  }
}
