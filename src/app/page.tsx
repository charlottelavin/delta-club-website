import Image from "next/image";
import galleryImage from './images/ismael-paramo-Cns0h4ypRyA-unsplash.jpg'
import galleryImage2 from './images/joel-muniz-A4Ax1ApccfA-unsplash.jpg'
import galleryImage3 from './images/ray-sangga-kusuma-7uSrOyY1U0I-unsplash.jpg'
import heroImage from './images/delta.jpg'

export default function Home() {
  return (
    <div className="bg-neutral-50 text-gray-900 min-h-screen" >
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Delta Club</h1>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 text-lg">Database</a>
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
            href="#events"
            className="border-2 border-blue-600 mt-6 bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition hover:border-blue-600"
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

      <section id="events" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-600 text-center">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[ 
              { title: "Community Cleanup", desc: "Join us in keeping our community clean! Supplies provided.", date: "March 10", location: "Local Park" },
              { title: "Food Drive", desc: "Help collect non-perishable food for families in need.", date: "March 15", location: "School Gym" },
              { title: "Animal Shelter Visit", desc: "Spend time with rescue animals and assist shelter staff.", date: "March 20", location: "City Animal Shelter" }
            ].map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold">{event.title}</h3>
                <p className="mt-2 text-gray-700">{event.desc}</p>
                <p className="mt-2 text-gray-500">📅 {event.date} | 📍 {event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-blue-600">How to Record Hours</h2>
          <p className="mt-4 text-lg">Follow these simple steps to ensure your volunteer hours are counted:</p>
          <ul className="mt-6 space-y-4 text-lg text-gray-700">
            <li>✅ Attend an approved Delta Club event.</li>
            <li>✅ Sign in at the event location.</li>
            <li>✅ Submit your volunteer log on the website.</li>
            <li>✅ Get approval from the event supervisor.</li>
          </ul>
        </div>
      </section>

      <section id="gallery" className="py-16 bg-gray-100">
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
