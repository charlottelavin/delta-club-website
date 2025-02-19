import { NextResponse } from "next/server"
import 'dotenv/config'
import Airtable from 'airtable'
import humanizeDuration from "humanize-duration"
import { DELTA_CLUB_BASE_ID, DELTA_CLUB_EVENTS_TABLE_ID } from "../constants"

// some fake events for testing
const EVENTS = [ 
    {
        name: "League with Matt",
        committee: 'Fun',
        hours: '1 hour',   
        description: 'Playing a super fun game + climb past i3!'
    },
    {
        name: 'Robotics',
        committee: 'Extra fun!',
        hours: '2 hours',
        description: 'try not to get tilted at an inanimate object!'
    }
]

export async function GET(request: Request) {
    console.log("In route", )

    const airtable = new Airtable({ apiKey: process.env['AIRTABLE_API_KEY'] })
    const deltaClubBase = airtable.base(DELTA_CLUB_BASE_ID);
    const eventsTable = deltaClubBase.table(DELTA_CLUB_EVENTS_TABLE_ID);
    const eventsResponse = eventsTable.select()
    const allEvents = await eventsResponse.all()
    console.log(allEvents)
    const events = allEvents.map((record) => {
        const hours = !record.fields.Hours 
           // If hours == 0 then this is the value of `hours`
            ?  "Hours Vary"
            // Else, this is the value of `hours`
            : humanizeDuration(record.fields.Hours as number * 1000, { units: ["h"] });

        return {
            name: record.fields.Name,
            committee: record.fields.Committee,
            description: record.fields.Description,
            hours: hours,
            url: record.fields.Link,
            id: record.id,
        }
    })

  return NextResponse.json(events)
}