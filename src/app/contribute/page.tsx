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
            <p className="mb-6">Have a great idea for a organization to partner with? We're always looking to add more events. Share your idea with us!</p>
            <a href="https://forms.office.com/r/89ipxvpdb7" target="_blank" className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Submit a Suggestion</a>
          </div>
        </section>

        <section id="executive-positions" className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Apply for Executive Positions</h2>
            <p className="mb-6">You can apply to become an exectuive officer. All officers work together as a team with Ms. Grant, Service Learning Director/Club Adviser. Responsibilities are to be shared equally among officers. </p>
            <a href="/apply-executive" className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Apply Now</a>
          </div>
        </section>

        <section id="committee-leader" className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Become a Committee Leader</h2>
            <p className="mb-6">Committees drive our projects forward. As a leader, you'll guide a team, manage initiatives, and make an impact. Committees include Events, Outreach, Fundraising, and more.</p>
            <a href="/apply-committee" className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Lead a Committee</a>
          </div> 
          </section>
          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-12 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently asked questions.</h1>

                <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">What can i expect at my first consultation?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">What are your opening house?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Do i need a referral?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">Is the cost of the appoinment covered by private health insurance?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">What is your cancellation policy?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">What are the parking and public transport options?</h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatis quos dignissimos beatae dolores exercitationem laboriosam officia magnam atque blanditiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </section>
      <footer className="bg-blue-600 text-white text-center py-6">
        <p className="text-lg">© 2025 Delta Club | Empowering Through Service</p>
      </footer>
    </div>
  );
}
