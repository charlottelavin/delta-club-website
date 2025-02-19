'use client'

import { useEffect, useState } from "react"

// Make a new type for an event
type Event = {
    id: string,
    name: string
    committee: string
    hours: string
    description: string
    url: string
}


function Event({event}: {event: Event}) {
    return <div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-auto">
            <img src={`/api/events/${event.id}/image.png`} alt="Event Image" className="rounded-lg"></img>
            <h4 className="text-xl font-semibold mt-4 text-black">{event.name}</h4>
            <p className="mt-2 text-black">{event.description}</p>
            {event.url 
                ? <div className="my-4">
                    <a href={event.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="border-2 border-blue-600 text-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all">
                            Sign Up
                        </a>
                    </div>
                : null}
            <p className="mt-2 text-gray-500">{event.committee}, {event.hours}</p>
            </div>

        </div>
}



export default function Home() {
    const [events, setEvents] = useState<Event[] | 'loading'>('loading')


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/events')
            if (response.ok) {
                const responseData = await response.json()
                // Ideally the response would be checked to make sure it's really event data
                // but, YOLO (happy version). We'll just assume for now
                setEvents(responseData)
            } else {
                // Idealy we would show this to the user or retry
                throw new Error("Something failed")
            }
        }

        fetchData();

        console.log('This is when I could fetch from the server')
    }, [])

    return <div className="bg-white">
                <nav className="bg-white shadow-lg p-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Delta Club</h1>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 text-lg">Planner</a>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg active:translate-y-1 active:shadow-none transition-all">
                        Sign In
                        </button>
                    </div>
                    </div>
                </nav>

                <div className="flex">
                <aside className="w-1/4 p-6 shadow-md rounded-lg sticky top-4 h-fit">
                    <h3 className="text-2xl font-semibold text-gray-800">Filter Events</h3>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold">Hours</label>
                        <select className="w-full mt-2 p-2 border rounded-lg text-black">
                            <option value="">Any</option>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3+">3+ Hours</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold">Age Range</label>
                        <input type="range" min="10" max="60" value="20" className="w-full mt-2"></input>
                        <p className="text-gray-600 text-sm mt-1">Adjust age range as needed.</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold">Committee</label>
                        <select className="w-full mt-2 p-2 border rounded-lg text-black">
                            <option value="">All Committees</option>
                            <option value="environment">Environment</option>
                            <option value="education">Education</option>
                            <option value="health">Health & Wellness</option>
                            <option value="community">Community Outreach</option>
                        </select>
                    </div>
                </aside>


                <section className="w-3/4 pl-8">
                    <h3 className="text-3xl font-semibold text-blue-600 mt-10">Available Volunteer Events</h3>
                    <div className="container mx-auto">
                        <div className="gap-8 mt-6 masonry sm:masonry-sm md:masonry-md">
                        {
                            events === 'loading' 
                            ? <div className="text-black">Loading...</div>
                            : events.map(event => (<div className='break-inside mb-4'>
                                <Event event={event}/>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </section>
                </div>
                <footer className="bg-blue-600 text-white text-center py-6">
                    <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
                </footer>
            </div>    

}
