import { NextResponse } from "next/server"
import { events } from '../../../db/schema'

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { db } = await import('../../../db');
        console.log("Fetching events from PostgreSQL database")
        
        const allEvents = await db.select().from(events);
        
        console.log(`Found ${allEvents.length} events`)
        
        const formattedEvents = allEvents.map((event) => ({
            id: event.id,
            name: event.name,
            committee: event.committee,
            hours: event.hours,
            description: event.description,
            url: event.url,
            imageUrl: event.imageUrl,
            featured: event.featured,
            address: event.address,
            age: event.age,
        }))

        return NextResponse.json(formattedEvents, {
            headers: { 'Cache-Control': 'no-store' },
        })
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}