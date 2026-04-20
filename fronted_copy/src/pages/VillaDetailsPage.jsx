import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getVillaById } from "../services/villaService"

function VillaDetailsPage() {
  const { villaId } = useParams()
  const [villa, setVilla] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const data = await getVillaById(villaId)
        setVilla(data)
      } catch (error) {
        console.error("Failed to fetch villa:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchVilla()
  }, [villaId])

  if (loading) {
    return <div className="p-10 text-center text-slate-600">Loading villa details...</div>
  }

  if (!villa) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
        Villa not found.
      </div>
    )
  }

  const goToNext = () => setActiveImage((prev) => (prev + 1) % villa.images.length)
  const goToPrevious = () => setActiveImage((prev) => (prev - 1 + villa.images.length) % villa.images.length)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <section className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={villa.images[activeImage]} alt={villa.name} className="h-[380px] w-full object-cover" />
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {villa.images.map((image, index) => (
            <button key={image} onClick={() => setActiveImage(index)} className="overflow-hidden rounded-xl">
              <img src={image} alt={`${villa.name} ${index + 1}`} className="h-24 w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{villa.name}</h1>
          <p className="text-sm text-slate-500">{villa.location}</p>
          <p className="mt-3 text-slate-600">{villa.description}</p>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {villa.amenities.map((amenity) => (
              <span key={amenity} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-600">Price per night</p>
          <p className="text-2xl font-bold text-slate-900">₹{villa.pricePerNight}</p>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Availability Calendar</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p>Unavailable dates:</p>
            <div className="flex flex-wrap gap-2">
              {villa.unavailableDates.map((date) => (
                <span key={date} className="rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          to={`/booking?villaId=${villa.id}`}
          className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          Book Now
        </Link>
      </section>
    </div>
  )
}

export default VillaDetailsPage
