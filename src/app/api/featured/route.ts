import { NextResponse } from "next/server"
import { db } from '../../../db'
import { events } from '../../../db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    try {
        console.log("Fetching featured events from PostgreSQL database")
        
        const featuredEvents = await db.select().from(events).where(eq(events.featured, true));
        
        console.log(`Found ${featuredEvents.length} featured events`)
        
        const formattedEvents = featuredEvents.map((event) => ({
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

        return NextResponse.json(formattedEvents)
    } catch (error) {
        console.error('Error fetching featured events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch featured events' },
            { status: 500 }
        )
    }
}