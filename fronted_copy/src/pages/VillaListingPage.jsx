import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { Filter, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import Loader from "../components/Loader"
import VillaCard from "../components/VillaCard"
import { getAllVillas } from "../services/villaService"

function VillaListingPage() {
  const routerLocation = useLocation()
  const searchParams = new URLSearchParams(routerLocation.search)
  const initialLocation = searchParams.get("location") || ""

  const [loading, setLoading] = useState(true)
  const [villas, setVillas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const villasPerPage = 6

  const [filters, setFilters] = useState({
    search: "",
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
      const searchMatch = filters.search 
        ? villa.name.toLowerCase().includes(filters.search.toLowerCase()) || 
          villa.description.toLowerCase().includes(filters.search.toLowerCase())
        : true
      const locationMatch = filters.location ? villa.location === filters.location : true
      const priceMatch = filters.maxPrice ? villa.pricePerNight <= Number(filters.maxPrice) : true
      const wifiMatch = filters.wifi ? villa.amenities.includes("wifi") : true
      const poolMatch = filters.pool ? villa.amenities.includes("pool") : true
      const parkingMatch = filters.parking ? villa.amenities.includes("parking") : true

      return searchMatch && locationMatch && priceMatch && wifiMatch && poolMatch && parkingMatch
    })

    return list.sort((a, b) =>
      filters.sortBy === "price" ? a.pricePerNight - b.pricePerNight : b.rating - a.rating
    )
  }, [filters, villas])

  // Pagination logic
  const totalPages = Math.ceil(filteredVillas.length / villasPerPage)
  const paginatedVillas = useMemo(() => {
    const startIndex = (currentPage - 1) * villasPerPage
    return filteredVillas.slice(startIndex, startIndex + villasPerPage)
  }, [filteredVillas, currentPage])

  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target
    setFilters((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    setCurrentPage(1) // Reset to first page on filter change
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          
          {/* Search Input */}
          <div className="group flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900/5">
            <Search size={20} className="text-slate-400 group-focus-within:text-slate-900" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search</span>
              <input
                name="search"
                type="text"
                placeholder="Villa name or keywords..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="hidden h-8 w-[1px] bg-slate-200 lg:block"></div>

          {/* Location Select */}
          <div className="group flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 transition-all hover:bg-slate-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900">
              <Filter size={18} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</span>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none"
              >
                <option value="">All Regions</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden h-8 w-[1px] bg-slate-200 lg:block"></div>

          {/* Price Filter */}
          <div className="group flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 transition-all hover:bg-slate-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900 text-sm font-bold">
              ₹
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget</span>
              <input
                name="maxPrice"
                type="number"
                placeholder="Any Price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="hidden h-8 w-[1px] bg-slate-200 lg:block"></div>

          {/* Sorting */}
          <div className="group flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 transition-all hover:bg-slate-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900">
              <SlidersHorizontal size={18} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</span>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Top Rated First</option>
              </select>
            </div>
          </div>

          {/* Amenities Toggle */}
          <div className="flex items-center gap-2 p-2">
             {['wifi', 'pool', 'parking'].map((amenity) => (
               <label 
                 key={amenity}
                 className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
                   filters[amenity] 
                     ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200" 
                     : "border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                 }`}
                 title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
               >
                 <input 
                   type="checkbox" 
                   name={amenity} 
                   checked={filters[amenity]} 
                   onChange={handleFilterChange} 
                   className="hidden"
                 />
                 <span className="text-[10px] font-black uppercase tracking-tighter">
                   {amenity.slice(0, 3)}
                 </span>
               </label>
             ))}
             
             {/* Reset Button (Integrated) */}
             {(filters.search || filters.location || filters.maxPrice || filters.wifi || filters.pool || filters.parking) && (
               <button 
                onClick={() => {
                  setFilters({ search: "", location: "", maxPrice: "", wifi: false, pool: false, parking: false, sortBy: "price" })
                  setCurrentPage(1)
                }}
                className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Clear all filters"
               >
                 <Filter size={18} className="rotate-180" />
               </button>
             )}
          </div>
        </div>
      </section>

      {loading ? (
        <Loader count={6} />
      ) : filteredVillas.length ? (
        <div className="space-y-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedVillas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2 px-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`h-12 w-12 rounded-2xl text-sm font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-900 hover:text-slate-900"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 p-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Filter size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Villas Found</h3>
          <p className="mt-2 text-slate-500">Try adjusting your filters or destination to see more results.</p>
          <button 
            onClick={() => {
              setFilters({ search: "", location: "", maxPrice: "", wifi: false, pool: false, parking: false, sortBy: "price" })
              setCurrentPage(1)
            }}
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
