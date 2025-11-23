import React from 'react'
import EventsClient from './EventsClient'

export default function Page() {
  return (
    <React.Suspense fallback={<div className="p-8">Loading events...</div>}>
      {/* EventsClient uses client-side navigation hooks and search params; wrap in Suspense */}
      <EventsClient />
    </React.Suspense>
  )
}

