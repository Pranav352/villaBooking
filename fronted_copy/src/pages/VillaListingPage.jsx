import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { Filter, Search, SlidersHorizontal } from "lucide-react"
import Loader from "../components/Loader"
import VillaCard from "../components/VillaCard"
import { getAllVillas } from "../services/villaService"

function VillaListingPage() {
  const routerLocation = useLocation()
  const searchParams = new URLSearchParams(routerLocation.search)
  const initialLocation = searchParams.get("location") || ""

  const [loading, setLoading] = useState(true)
  const [villas, setVillas] = useState([])
  const [filters, setFilters] = useState({
    location: initialLocation,
    maxPrice: "",
    wifi: false,
    pool: false,
    parking: false,
    sortBy: "price",
  })

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

  const locations = [...new Set(villas.map((villa) => villa.location))]

  const filteredVillas = useMemo(() => {
    const list = villas.filter((villa) => {
      const locationMatch = filters.location ? villa.location === filters.location : true
      const priceMatch = filters.maxPrice ? villa.pricePerNight <= Number(filters.maxPrice) : true
      const wifiMatch = filters.wifi ? villa.amenities.includes("wifi") : true
      const poolMatch = filters.pool ? villa.amenities.includes("pool") : true
      const parkingMatch = filters.parking ? villa.amenities.includes("parking") : true

      return locationMatch && priceMatch && wifiMatch && poolMatch && parkingMatch
    })

    return list.sort((a, b) =>
      filters.sortBy === "price" ? a.pricePerNight - b.pricePerNight : b.rating - a.rating
    )
  }, [filters, villas])

  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target
    setFilters((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Discover Villas</h1>
          <p className="mt-1 text-slate-500 font-medium">Explore our handpicked collection of premium stays</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white p-1 shadow-sm border border-slate-100">
           <span className="px-4 py-2 text-sm font-bold text-slate-900">
             {filteredVillas.length} {filteredVillas.length === 1 ? 'Villa' : 'Villas'} Found
           </span>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-slate-900">
          <SlidersHorizontal size={20} className="text-slate-400" />
          <h2 className="text-lg font-bold">Refine Your Search</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Destination</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">All Regions</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Max Price (per night)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
              <input
                name="maxPrice"
                type="number"
                placeholder="Any Price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-3 font-medium outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="price">Price: Low to High</option>
              <option value="rating">Top Rated First</option>
            </select>
          </div>

          <div className="flex flex-col justify-end space-y-1.5">
             <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Essential Amenities</label>
             <div className="flex gap-2">
                {['wifi', 'pool', 'parking'].map((amenity) => (
                  <label 
                    key={amenity}
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-2xl border px-2 py-3 text-xs font-bold transition-all ${
                      filters[amenity] 
                        ? "border-slate-900 bg-slate-900 text-white" 
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      name={amenity} 
                      checked={filters[amenity]} 
                      onChange={handleFilterChange} 
                      className="hidden"
                    />
                    <span className="capitalize">{amenity}</span>
                  </label>
                ))}
             </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loader count={6} />
      ) : filteredVillas.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVillas.map((villa) => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 p-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Filter size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Villas Found</h3>
          <p className="mt-2 text-slate-500">Try adjusting your filters or destination to see more results.</p>
          <button 
            onClick={() => setFilters({ location: "", maxPrice: "", wifi: false, pool: false, parking: false, sortBy: "price" })}
            className="mt-6 font-bold text-slate-900 underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

export default VillaListingPage
