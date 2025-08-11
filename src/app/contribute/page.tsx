"use client"

import Link from 'next/link'

export default function Home() {
  
  return (
    <div className="bg-blue-100 text-gray-900 min-h-screen flex flex-col items-stretch" >
        <nav className="bg-white shadow-xl p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    Delta Club
                </Link>
                <div className="flex items-center space-x-10">
                    <a href="events" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
                    <a href="contribute" className="text-gray-700 hover:text-blue-600 text-lg">Contribute</a>
                    <button className="invisible px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
        <script defer src="https://unpkg.com/alpinejs@3.2.3/dist/cdn.min.js"></script>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />

        <section id="volunteer-suggestions" className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Suggest a Volunteering Opportunity</h2>
            <p className="mb-6">Have a great idea for a organization to partner with? We&apos;re always looking to add more events. Share your idea with us!</p>
            <a href="https://forms.office.com/r/89ipxvpdb7" target="_blank" className="inline-block border-2 border-blue-600 text-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white active:translate-y-1 active:shadow-none transition-all">Submit a Suggestion</a>
          </div>
        </section>

        <section id="executive-positions" className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Apply for Executive Positions</h2>
            <p className="mb-6">You can apply to become an executive officer. All officers work together as a team with Ms. Grant, Service Learning Director/Club Adviser. Responsibilities are to be shared equally among officers. Responsibilities include: Overseeing club membership including service and attendance requirements and communicating necessary information regarding such with committee leaders, Working closely with Committee Leaders with each Officer responsible for individually mentoring at least two committees, as well as many other responsibilities.</p>
          </div>
        </section>

        <section id="committee-leader" className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Become a Committee Leader</h2>
            <p className="mb-6">As a committee leader, you will be responsible for planning committee meetings (consisting of education around committee issues, guest speakers, indirect service projects, etc.); reaching out to organizations; planning and coordinating service opportunities (direct, indirect, advocacy); taking attendance; and monitoring members’ engagement, including monitoring posts on the Unrulr app. Your attendance will be required for some committee opportunities. Committee leaders are expected to complete the same club membership requirements as other members.</p>
          </div> 
        </section>

      <footer className="bg-blue-600 text-white text-center py-6">
        <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
      </footer>
    </div>
  );
}
