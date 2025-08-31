import { db } from '../../../../../db';
import { events } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
    console.log("In image route", id)

    try {
        // Fetch event from PostgreSQL database using Drizzle
        const event = await db.select().from(events).where(eq(events.id, id)).limit(1);
        
        if (!event || event.length === 0) {
            console.log("Event not found:", id);
            return new NextResponse(null, { status: 404 });
        }

        const eventData = event[0];
        
        if (!eventData.imageUrl) {
            console.log("No image found for event:", id);
            return new NextResponse(null, { status: 404 });
        }

        console.log("Redirecting to image:", eventData.imageUrl);
        return NextResponse.redirect(eventData.imageUrl);
    } catch (error) {
        console.error("Error fetching event image:", error);
        return new NextResponse(null, { status: 500 });
    }
}