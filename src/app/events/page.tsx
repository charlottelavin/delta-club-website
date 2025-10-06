'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'

// Function to convert time format (e.g., "2:30") to decimal hours (e.g., "2.5 hours")
function formatHours(hours: string): string {
    if (!hours || hours.trim() === '') return 'Hours Vary';
    
    // Handle formats like "2:30", "1:45", etc.
    const timeMatch = hours.match(/^(\d+):(\d+)$/);
    if (timeMatch) {
        const hoursNum = parseInt(timeMatch[1]);
        const minutesNum = parseInt(timeMatch[2]);
        const decimalHours = hoursNum + (minutesNum / 60);
        return `${decimalHours} hours`;
    }
    
    // Handle formats like "2.5", "1.25", etc.
    const decimalMatch = hours.match(/^(\d+\.?\d*)$/);
    if (decimalMatch) {
        const num = parseFloat(decimalMatch[1]);
        if (!isNaN(num)) {
            return `${num} hours`;
        }
    }
    
    // Handle formats like "2", "1", etc.
    const wholeNumberMatch = hours.match(/^(\d+)$/);
    if (wholeNumberMatch) {
        const num = parseInt(wholeNumberMatch[1]);
        if (!isNaN(num)) {
            return `${num} hours`;
        }
    }
    
    // Return "Hours Vary" if no pattern matches
    return 'Hours Vary';
}

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
    age: string
    imageUrl: string
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    event: Event
};
function Modal({ isOpen, onClose, event}: ModalProps) {
    if (!isOpen) return null; // Don't render if not open
  
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
                        <div className="img">
                            <div className="img-box h-48 sm:h-64 lg:h-96">
                                <img src={event.imageUrl} className="h-full w-full object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="data flex flex-col justify-center">
                            <div className="data w-full">
                                <p className="mb-2 sm:mb-4 text-sm sm:text-lg leading-6 sm:leading-8 font-medium text-indigo-600">{event.committee}</p>
                                <h2 className="font-manrope mb-2 text-xl sm:text-2xl lg:text-3xl leading-6 sm:leading-8 lg:leading-10 font-bold text-gray-900 capitalize">{event.name}</h2>
                                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center">
                                    <h6 className="font-manrope mr-0 sm:mr-5 border-gray-200 pr-0 sm:pr-5 text-lg sm:text-xl lg:text-2xl leading-6 sm:leading-8 lg:leading-9 font-semibold text-gray-900 sm:border-r">{formatHours(event.hours)}</h6>
                                </div>
                                <p className="mb-4 sm:mb-5 text-sm sm:text-base font-normal text-gray-500">{event.description}</p>
                                <ul className="mb-6 sm:mb-8 grid gap-y-2 sm:gap-y-4">
                                    <li className="flex items-center gap-2 sm:gap-3">
                                        <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                                        </svg>
                                        <span className="text-sm sm:text-base font-normal text-gray-900">{event.age}</span>
                                    </li>
                                    <li className="flex items-center gap-2 sm:gap-3">
                                        <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                                        </svg>
                                        <span className="text-sm sm:text-base font-normal text-gray-900">{event.address}</span>
                                    </li>
                                </ul>
                                {event.url && (
                                    <div className="my-4">
                                        <a
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center rounded-[100px] bg-indigo-600 px-4 sm:px-5 py-3 sm:py-4 text-center text-sm sm:text-lg font-semibold text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
                                        >
                                            Sign Up
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={onClose}
                                    className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

function Event({ event, }: { event: Event;}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full ${event.featured ? "border-2 border-blue-600" : ""}`}>
            <img src={event.imageUrl} alt="Event Image" className="rounded-lg w-full h-48 sm:h-56 object-cover" />
            <h4 className="text-lg sm:text-xl font-semibold mt-4 text-black">{event.name}</h4>
            <div className="flex flex-col sm:flex-row mt-4 justify-between items-start sm:items-center gap-2">
                <p className="text-gray-600 text-sm sm:text-base flex-1">{event.committee}, {formatHours(event.hours)}</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-blue-600 text-blue-600 font-bold px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all whitespace-nowrap text-sm sm:text-base w-full sm:w-auto">
                    View
                </button>

                {/* Modal */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={event}/>
            </div>
        </div>
    );
}


export default function Home() {
    const [events, setEvents] = useState<Event[] | 'loading'>('loading');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [selectedCommittee, setSelectedCommittee] = useState<string>("");

    useEffect(() => {
        // Set the page title
        document.title = "Volunteer Events - Delta Club";
    }, []);

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
            <nav className="bg-white shadow-xl p-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        Delta Club
                    </Link>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-10">
                        <a href="events" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
                        <a href="contribute" className="text-gray-700 hover:text-blue-600 text-lg">Contribute</a>
                        <button className="invisible px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col lg:flex-row p-4 sm:p-8 gap-4 lg:gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 p-4 sm:p-8 shadow-xl rounded-lg lg:sticky lg:top-4 h-fit">
                    <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Filter Events</h3>
                    {/* Committee Filter */}
                    <div className="mt-4">
                        <label className="block text-black font-semibold text-sm sm:text-base">Committee</label>
                        <select 
                            className="w-full mt-2 p-2 border rounded-lg text-black text-sm sm:text-base"
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
                <section className="w-full lg:w-3/4">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-blue-600 mt-4 lg:mt-10">Available Volunteer Events</h3>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6 mb-6">
                            {events === 'loading' ? (
                                <div className="text-black col-span-full">Loading...</div>
                            ) : filteredEvents.length > 0 ? (
                                filteredEvents.map(event => (
                                    <div className="break-inside" key={`event-${event.id}`}>
                                        <Event event={event} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-600 mt-4 col-span-full">No events found for this committee.</div>
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
