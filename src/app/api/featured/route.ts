import { NextResponse } from "next/server"
import 'dotenv/config'
import Airtable from 'airtable'
import humanizeDuration from "humanize-duration"
import { DELTA_CLUB_BASE_ID, DELTA_CLUB_EVENTS_TABLE_ID } from "../constants"

export async function GET() {
    console.log("In route", )

    const airtable = new Airtable({ apiKey: process.env['AIRTABLE_API_KEY'] })
    const deltaClubBase = airtable.base(DELTA_CLUB_BASE_ID);
    const eventsTable = deltaClubBase.table(DELTA_CLUB_EVENTS_TABLE_ID);
    const eventsResponse = eventsTable.select()
    const allEvents = await eventsResponse.all()

    const events = allEvents.map((record) => {
        const hours = !record.fields.Hours 
           // If hours == 0 then this is the value of `hours`
            ?  "Hours Vary"
            // Else, this is the value of `hours`
            : humanizeDuration(Math.round((record.fields.Hours as number) * 100) / 100 * 1000, { maxDecimalPoints: 2, units: ["h"] })

        return {
            name: record.fields.Name,
            committee: record.fields.Committee,
            description: record.fields.Description,
            hours: hours,
            url: record.fields.Link,
            id: record.id,
            address: record.fields.Address,
            featured: record.fields.Featured,
            age: record.fields.Age,
        }
    })

  return NextResponse.json(events)
}