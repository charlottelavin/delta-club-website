'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
// Helper to parse hours string to a number, or null for 'Hours Vary'
function parseHours(hours: string): number | null {
    if (!hours || hours.trim() === '' || hours.toLowerCase().includes('vary')) return null;
    const timeMatch = hours.match(/^(\d+):(\d+)$/);
    if (timeMatch) {
        const hoursNum = parseInt(timeMatch[1]);
        const minutesNum = parseInt(timeMatch[2]);
        return hoursNum + (minutesNum / 60);
    }
    const decimalMatch = hours.match(/^(\d+\.?\d*)$/);
    if (decimalMatch) {
        return parseFloat(decimalMatch[1]);
    }
    const wholeNumberMatch = hours.match(/^(\d+)$/);
    if (wholeNumberMatch) {
        return parseInt(wholeNumberMatch[1]);
    }
    return null;
}
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
        return `${decimalHours} ${decimalHours === 1 ? 'hour' : 'hours'}`;
    }
    // Handle formats like "2.5", "1.25", etc.
    const decimalMatch = hours.match(/^(\d+\.?\d*)$/);
    if (decimalMatch) {
        const num = parseFloat(decimalMatch[1]);
        if (!isNaN(num)) {
            return `${num} ${num === 1 ? 'hour' : 'hours'}`;
        }
    }
    // Handle formats like "2", "1", etc.
    const wholeNumberMatch = hours.match(/^(\d+)$/);
    if (wholeNumberMatch) {
        const num = parseInt(wholeNumberMatch[1]);
        if (!isNaN(num)) {
            return `${num} ${num === 1 ? 'hour' : 'hours'}`;
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
    // hoursFilter: null = 'Hours Vary', number = max hours
    const [hoursFilter, setHoursFilter] = useState<number>(11 / 2); // default to max (5.5)
    // ageFilter: number = max age allowed
    const [ageFilter, setAgeFilter] = useState<number>(0); // default to 0 (all ages)
    const router = useRouter();
    const searchParams = useSearchParams();
    const DEFAULT_HOURS = 5.5;
// Helper to parse age string to a number, or null for 'All Ages'
function parseAge(age: string): number | null {
    if (!age || age.trim() === '' || age.toLowerCase().includes('all')) return null;
    const match = age.match(/(\d+)/);
    if (match) return parseInt(match[1]);
    return null;
}

    useEffect(() => {
        // Set the page title
        document.title = "Volunteer Events - Delta Club";
    }, []);

    // Initialize filter state from URL query params so links are shareable
    useEffect(() => {
        try {
            const committeeParam = searchParams?.get('committee') ?? '';
            const hoursParam = searchParams?.get('hours');
            const ageParam = searchParams?.get('age');

            setSelectedCommittee(committeeParam);

            if (hoursParam === 'vary') {
                setHoursFilter(0);
            } else if (hoursParam != null) {
                const parsed = parseFloat(hoursParam);
                setHoursFilter(Number.isNaN(parsed) ? DEFAULT_HOURS : parsed);
            } else {
                setHoursFilter(DEFAULT_HOURS);
            }

            if (ageParam === 'all' || ageParam == null) {
                setAgeFilter(0);
            } else {
                const parsedAge = parseInt(ageParam);
                setAgeFilter(Number.isNaN(parsedAge) ? 0 : parsedAge);
            }
        } catch {
            // ignore and keep defaults
        }
        // only run on mount / when search params change
    }, [searchParams]);

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


    // Update URL query params without adding history entries
    const updateUrl = (params: { committee?: string; hours?: number | null; age?: number | null }) => {
        try {
            const current = new URLSearchParams(Array.from(searchParams ?? new URLSearchParams()));

            if (params.committee !== undefined) {
                if (params.committee) current.set('committee', params.committee);
                else current.delete('committee');
            }

            if (params.hours !== undefined) {
                if (params.hours === null) {
                    current.set('hours', 'vary');
                } else if (params.hours === DEFAULT_HOURS) {
                    current.delete('hours');
                } else {
                    current.set('hours', String(params.hours));
                }
            }

            if (params.age !== undefined) {
                if (params.age === 0 || params.age === null) current.delete('age');
                else current.set('age', String(params.age));
            }

            const qs = current.toString();
            const pathname = window.location.pathname;
            if (qs) router.replace(`${pathname}?${qs}`);
            else router.replace(pathname);
        } catch {
            // fallback: do nothing
        }
    };

    // Committee filter handler
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCommittee(value);
        updateUrl({ committee: value });
    };

    const handleHoursChange = (valUnits: number) => {
        const val = valUnits / 2;
        setHoursFilter(val);
        updateUrl({ hours: val });
    };

    const handleAgeChange = (val: number) => {
        setAgeFilter(val);
        updateUrl({ age: val });
    };



    // Filtering logic
    useEffect(() => {
        if (events === 'loading') return;
        let filtered = events;
        if (selectedCommittee) {
            filtered = filtered.filter(event => event.committee === selectedCommittee);
        }
        // Hours filter: always show 'Hours Vary' events, filter others by slider
        filtered = filtered.filter(event => {
            const eventHours = parseHours(event.hours);
            return eventHours === null || eventHours <= hoursFilter;
        });
        // Age filter: always show 'All Ages' events, filter others by slider
        filtered = filtered.filter(event => {
            const eventAge = parseAge(event.age);
            return eventAge === null || eventAge <= ageFilter;
        });
        setFilteredEvents(filtered);
    }, [events, selectedCommittee, hoursFilter, ageFilter]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
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
                            <option value="Poverty and Food Insecurity">Poverty and Food Insecurity</option>
                            <option value="Health and Wellness">Health and Wellness</option>
                            <option value="Homelessness">Homelessness</option>
                        </select>
                    </div>
                    {/* Hours Filter */}
                    <div className="mt-6">
                        <label className="block text-black font-semibold text-sm sm:text-base mb-2">Hours</label>
                        <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm text-black">Vary</span>
                            <input
                                type="range"
                                min={0}
                                max={11}
                                step={1}
                                value={Math.round(hoursFilter * 2)}
                                onChange={e => handleHoursChange(parseInt(e.target.value))}
                                className="flex-1 accent-blue-600"
                                aria-label="Hours filter slider"
                            />
                            <span className="text-xs sm:text-sm text-black">5.5</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                            {hoursFilter === 0
                                ? 'Hours Vary'
                                : `${hoursFilter} ${hoursFilter === 1 ? 'hour' : 'hours'} or less`}
                        </div>
                    </div>
                    {/* Age Filter */}
                    <div className="mt-6">
                        <label className="block text-black font-semibold text-sm sm:text-base mb-2">Ages</label>
                        <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm text-black">All</span>
                            <input
                                type="range"
                                min={0}
                                max={18}
                                step={1}
                                value={ageFilter}
                                onChange={e => handleAgeChange(parseInt(e.target.value))}
                                className="flex-1 accent-blue-600"
                                aria-label="Age filter slider"
                            />
                            <span className="text-xs sm:text-sm text-black">18</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                            {ageFilter === 0 ? 'All Ages' : `${ageFilter}+ allowed`}
                        </div>
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

            <footer className="bg-blue-600 text-white text-center py-6 mt-auto">
                <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
            </footer>
        </div>
    );
}
