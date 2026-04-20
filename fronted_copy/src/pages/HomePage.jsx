import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import VillaCard from "../components/VillaCard"
import Loader from "../components/Loader"
import testimonials from "../data/testimonials"
import { getAllVillas } from "../services/villaService"


function HomePage() {
  const [loading, setLoading] = useState(true)
  const [villas, setVillas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadVillas = async () => {
      try {
        const data = await getAllVillas()
        setVillas(data)
      } catch (error) {
        console.error("Failed to load villas:", error)
      } finally {
        setLoading(false)
      }
    }
    loadVillas()
  }, [])

  const featuredVillas = villas.slice(0, 3)

  return (
    <div className="space-y-14">
      <section
        className="relative overflow-hidden rounded-3xl bg-cover bg-center p-6 sm:p-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615529162924-f8605388464b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-3xl text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Luxury Villa Booking</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Find your perfect villa getaway.</h1>
          <p className="mt-4 text-base text-slate-100 sm:text-lg">
            Browse handpicked properties with premium amenities and instant booking confirmation.
          </p>

          {/* <div className="glass-card mt-8 grid gap-3 rounded-2xl p-4 text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
            <input placeholder="Location" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <input type="date" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <input type="date" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <input type="number" min="1" placeholder="Guests" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          </div> */}

          <Link
            to="/villas"
            className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Explore Villas
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Villas</h2>
          <Link to="/villas" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all
          </Link>
        </div>

        {loading ? (
          <Loader count={3} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVillas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        )}
      </section>

      <h2 className="mb-6 text-2xl font-bold text-slate-900">Why Choose Us</h2>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">🏡</div>
          <p className="font-bold text-slate-800">Handpicked Villas</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">💰</div>
          <p className="font-bold text-slate-800">Best Price Guarantee</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">📍</div>
          <p className="font-bold text-slate-800">Prime Locations</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-2xl">⭐</div>
          <p className="font-bold text-slate-800">Verified Reviews</p>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Popular Destinations</h2>
        {loading ? (
          <Loader count={4} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {villas.slice(3, 7).map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        )}
      </section>


      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">What Guests Say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-600">"{testimonial.comment}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
