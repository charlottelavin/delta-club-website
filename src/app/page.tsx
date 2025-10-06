"use client"

import heroImage from './images/delta.jpg'
import { useEffect, useState } from "react"
import Link from 'next/link'

type Event = {
  id: string;
  name: string;
  committee: string;
  hours: string;
  description: string;
  url: string;
  featured: boolean;
};


function Event({event}: {event: Event}) {
  return <div className={`${event.featured ? "" : "hidden"}`}>
          <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full border-2 border-blue-600 max-w-sm mx-auto`}>
              <h4 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-4 text-black">{event.name}</h4>
              <p className="mt-2 text-sm sm:text-base text-black">{event.description}</p>
              {event.url
                  ? <div className="my-4">
                      <a href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-blue-600 text-blue-600 font-bold px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all text-sm sm:text-base">
                              Sign Up
                          </a>
                      </div>
                  : null}
              <p className="mt-2 text-gray-500 text-sm sm:text-base">{event.committee}, {event.hours}</p>
          </div>


      </div>
}

export default function Home() {
  const [events, setEvents] = useState<Event[] | 'loading'>('loading')

  useEffect(() => {
    // Set the page title
    document.title = "Delta Club - Empowering Through Service";
  }, []);

  useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/featured');
            if (response.ok) {
                const responseData: Event[] = await response.json();
                // reduce the fetch later
                const featuredEvents = responseData.filter(event => event.featured != null)
                setEvents(featuredEvents);
            } else {
                console.error("Failed to fetch events");
            }
        }
        fetchData();
    }, []);
  
  return (
    <div className="bg-blue-100 text-gray-900 min-h-screen flex flex-col items-stretch" >
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

      <section className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage.src})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Volunteer Today</h1>
          <p className="text-lg sm:text-xl mt-4 max-w-2xl">Find opportunities to volunteer with Delta Club</p>
          <a
            href="events"
            className="border-2 border-blue-600 mt-6 bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition hover:border-blue-600 font-bold"
          >
            View Events
          </a>
        </div>
      </section>

      <section id="about" className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600">About Delta Club</h2>
          <p className="mt-4 text-base sm:text-lg">
            Delta Club is dedicated to serving the community through volunteer work. Our mission is to empower students to
            make a positive impact while developing leadership skills.
          </p>
        </div>
      </section>

      <div className="flex flex-col self-center bg-blue-100 text-center">
        <h2 className="pt-16 text-3xl sm:text-4xl font-semibold text-blue-600">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-16 mx-4 sm:mx-8 lg:mx-20">
        {
            events === 'loading'
            ? <div className="text-black col-span-full">Loading...</div>
            : events.map(event => (<div className='break-inside' key={`event-${event.id}`}>
                <Event event={event}/>
                </div>
            ))
        }
        </div>
      </div>


      <section id="hours" className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600">How to Record Hours</h2>
          <p className="mt-4 text-lg sm:text-xl">Follow these simple steps to ensure your volunteer hours are counted:</p>
          <ul className="mt-6 space-y-4 text-base sm:text-lg text-gray-700">
            <li>Sign up and attend a Delta Club event.</li>
            <li>Take pictures while completing your activity.</li>
            <li>Write a post on Unrulr about your event.</li>
            <li>Congrats! Your hours have been recorded!</li>
            <div className="mt-6 py-6">
              <a 
              href={"https://tinyurl.com/unrulrpost"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 border-2 border-blue-600 text-blue-600 font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all text-sm sm:text-base">View Unrulr Post Guide</a>
            </div>
          </ul>
        </div>
      </section>

      <footer className="bg-blue-600 text-white text-center py-6">
        <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
      </footer>
    </div>
  );
}
