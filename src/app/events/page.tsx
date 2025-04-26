'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'

// Define the Event type
type Event = {
    id: string;
    name: string;
    committee: string;
    hours: string;
    description: string;
    url: string;
    featured: boolean;
    address: string
};

function Event({ event }: { event: Event }) {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg w-auto ${event.featured ? "border-2 border-blue-600" : ""}`}>
            <img src={`/api/events/${event.id}/image.png`} alt="Event Image" className="rounded-lg"></img>
            <h4 className="text-xl font-semibold mt-4 text-black">{event.name}</h4>
            <p className="mt-2 text-black">{event.description}</p>
            <p className="mt-2 text-gray-600">{event.address}</p>
            {event.url && (
                <div className="my-4">
                    <a href={event.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="border-2 border-blue-600 text-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        Sign Up
                    </a>
                </div>
            )}
            <p className="mt-2 text-gray-500">{event.committee}, {event.hours}</p>
        </div>
    );
}

export default function Home() {
    const [events, setEvents] = useState<Event[] | 'loading'>('loading');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [selectedCommittee, setSelectedCommittee] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/events');
            if (response.ok) {
                const responseData: Event[] = await response.json();
                setEvents(responseData);
                setFilteredEvents(responseData); // Ensure full list is available initially
            } else {
                console.error("Failed to fetch events");
            }
        }
        fetchData();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCommittee(value);

        if (events !== 'loading') {
            if (value === "") {
                setFilteredEvents(events); // Reset to full list
            } else {
                setFilteredEvents(events.filter(event => event.committee === value));
            }
        }
    };

    return (
        <div className="bg-white">
            <nav className="bg-white shadow-md p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        Delta Club
                    </Link>
                    <div className="flex items-center space-x-6">
                        <a href="events" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
                        <a href="contribute" className="text-gray-700 hover:text-blue-600 text-lg">Contribute</a>
                        <button className="invisible px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex p-8">
                {/* Sidebar */}
                <aside className="w-1/4 p-8 shadow-md rounded-lg sticky top-4 h-fit">
                    <h3 className="text-2xl font-semibold text-blue-600">Filter Events</h3>

                    {/* Committee Filter */}
                    <div className="mt-4">
                        <label className="block text-black font-semibold">Committee</label>
                        <select 
                            className="w-full mt-2 p-2 border rounded-lg text-black"
                            value={selectedCommittee}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Committees</option>
                            <option value="Animals">Animals</option>
                            <option value="Children and Education">Children and Education</option>
                            <option value="Elderly">Elderly</option>
                            <option value="Disabilities">Disabilities</option>
                            <option value="Environment and Climate Change">Environment and Climate Change</option>
                            <option value="Food Insecurity and Poverty">Food Insecurity and Poverty</option>
                            <option value="Health and Wellness">Health and Wellness</option>
                            <option value="Homelessness">Homelessness</option>
                            <option value="Community and Culture">Community and Culture</option>
                        </select>
                    </div>
                </aside>

                {/* Main Section */}
                <section className="w-3/4 pl-8 pr-8">
                    <h3 className="text-3xl font-semibold text-blue-600 mt-10">Available Volunteer Events</h3>
                    <div className="container mx-auto">
                        <div className="gap-8 mt-6 masonry sm:masonry-sm md:masonry-md mb-6">
                            {events === 'loading' ? (
                                <div className="text-black">Loading...</div>
                            ) : filteredEvents.length > 0 ? (
                                filteredEvents.map(event => (
                                    <div className="break-inside mb-4" key={`event-${event.id}`}>
                                        <Event event={event} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-600 mt-4">No events found for this committee.</div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <footer className="bg-blue-600 text-white text-center py-6">
                <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
            </footer>
        </div>
    );
}
