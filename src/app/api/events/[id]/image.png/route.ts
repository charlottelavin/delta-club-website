import Airtable, { Attachment } from "airtable";
import { DELTA_CLUB_BASE_ID, DELTA_CLUB_EVENTS_TABLE_ID } from "../../../constants";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
    console.log("In image route", id)

    const airtable = new Airtable({ apiKey: process.env['AIRTABLE_API_KEY'] })
    const deltaClubBase = airtable.base(DELTA_CLUB_BASE_ID);
    const eventsTable = deltaClubBase.table(DELTA_CLUB_EVENTS_TABLE_ID);

    const findResponse = await eventsTable.find(id)
    if (!findResponse.fields.Image) {
        return new NextResponse(null, {status: 404})
    }
    console.log(findResponse.fields.Image)
    const images = findResponse.fields.Image as readonly Attachment[]
    return NextResponse.redirect(images[0].url)
}