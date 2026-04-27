import { Link } from "react-router-dom"
import { MapPin, Star, User } from "lucide-react"

function VillaCard({ villa }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={villa.images[0]}
          alt={villa.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {villa.rating}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="line-clamp-1 text-xl font-bold text-slate-900">{villa.name}</h3>
        </div>

        <div className="mb-4 flex items-center gap-1 text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="text-sm font-medium">{villa.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-6 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            Up to {villa.maxGuests} guests
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div>
            <p className="text-2xl font-black text-slate-900">₹{villa.pricePerNight.toLocaleString()}</p>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Per Night</p>
          </div>
          <Link
            to={`/villas/${villa.id}`}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
          >
            Explore
          </Link>
        </div>
      </div>
    </article>
  )
}

export default VillaCard
