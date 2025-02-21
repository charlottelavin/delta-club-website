"use client"

import Image from "next/image";
import galleryImage from './images/ismael-paramo-Cns0h4ypRyA-unsplash.jpg'
import galleryImage2 from './images/joel-muniz-A4Ax1ApccfA-unsplash.jpg'
import galleryImage3 from './images/ray-sangga-kusuma-7uSrOyY1U0I-unsplash.jpg'
import heroImage from './images/delta.jpg'
import { useEffect, useState } from "react"

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
          <div className={`bg-white p-6 rounded-lg shadow-lg w-auto border-2 border-blue-600 max-w-96`}>
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
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href={"/"} 
              className="text-2xl font-bold text-blue-600">
                  Delta Club
            </a>
          <div className="flex items-center space-x-6">
            <a href="events" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
            <a href="#" className="invisible text-gray-700 hover:text-blue-600 text-lg">Planner</a>
            <button className="invisible px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <section className="relative w-full h-screen bg-cover bg-center">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <h1 className="text-5xl font-bold">Volunteer Today</h1>
          <p className="text-xl mt-4">Find opportunities to volunteer with Delta Club</p>
          <a
            href="events"
            className="border-2 border-blue-600 mt-6 bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition hover:border-blue-600 font-bold"
          >
            View Events
          </a>
        </div>
      </section>

      <section id="about" className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-600">About Delta Club</h2>
          <p className="mt-4 text-lg">
            Delta Club is dedicated to serving the community through volunteer work. Our mission is to empower students to
            make a positive impact while developing leadership skills.
          </p>
        </div>
      </section>

      <div className="flex flex-col self-center bg-blue-100 text-center">
        <h2 className="pt-16 text-4xl font-semibold text-blue-600">Featured Events</h2>
        <div className="flex md:flex-cols-3 gap-10 mt-10 mb-16 mx-20">
        {
            events === 'loading'
            ? <div className="text-black">Loading...</div>
            : events.map(event => (<div className='break-inside' key={`event-${event.id}`}>
                <Event event={event}/>
                </div>
            ))
        }
        </div>
      </div>


      <section id="hours" className="py-16 bg-white text-center">
        <div className="mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-600">How to Record Hours</h2>
          <p className="mt-4 text-xl justify-self-center">Follow these simple steps to ensure your volunteer hours are counted:</p>
          <ul className="mt-6 space-y-4 text-lg text-gray-700 justify-self-center">
            <li>✅ Sign up and attend a Delta Club event.</li>
            <li>✅ Take pictures while completing your activity.</li>
            <li>✅ Write a post on Unrulr about your event.</li>
            <li>✅ Congrats! Your hours have been recorded!</li>
            <div className="mt-6">
              <a 
              href={"https://tinyurl.com/unrulrpost"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 border-2 border-blue-600 text-blue-600 font-bold px-6 py-4 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all">View Unrulr Post Guide</a>
            </div>
          </ul>
        </div>
      </section>

      <section id="gallery" className="py-16 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-600 text-center">Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[galleryImage, galleryImage2, galleryImage3].map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Gallery Image"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white text-center py-6">
        <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
      </footer>
    </div>
  );
}
