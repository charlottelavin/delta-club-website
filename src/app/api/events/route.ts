import { NextResponse } from "next/server"
import { db } from '../../../db'
import { events } from '../../../db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    try {
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

        return NextResponse.json(formattedEvents)
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}