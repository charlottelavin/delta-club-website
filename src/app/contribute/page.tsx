"use client"

import Link from 'next/link'

export default function Home() {
  
  return (
    <div className="bg-blue-100 text-gray-900 min-h-screen flex flex-col items-stretch" >
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

      <section className="relative w-full h-screen bg-cover bg-center">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6"
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

    

      <footer className="bg-blue-600 text-white text-center py-6">
        <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
      </footer>
    </div>
  );
}
