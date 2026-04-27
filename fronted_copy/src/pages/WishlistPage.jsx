import { useEffect, useState } from "react"
import { Heart, Home } from "lucide-react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import VillaCard from "../components/VillaCard"
import { getWishlist } from "../services/wishlistService"

function WishlistPage() {
  const [loading, setLoading] = useState(true)
  const [wishlistItems, setWishlistItems] = useState([])
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("villa_user") || "null"))

  const loadWishlist = async (email) => {
    try {
      const data = await getWishlist(email)
      setWishlistItems(data)
    } catch (error) {
      console.error("Failed to load wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email) {
      loadWishlist(user.email)
    } else {
      setLoading(false)
    }
  }, [user?.email])

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <Heart size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Your Wishlist</h2>
        <p className="mt-2 max-w-xs text-slate-500">Sign in to save your favorite villas and plan your next getaway.</p>
        <Link 
          to="/auth?redirect=/wishlist" 
          className="mt-8 rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200"
        >
          Sign In Now
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <header>
        <div className="flex items-center gap-3 text-rose-500 mb-2">
           <Heart size={24} fill="currentColor" />
           <span className="text-sm font-black uppercase tracking-widest">My Favorites</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Wishlist</h1>
        <p className="mt-1 text-slate-500 font-medium">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'Villa' : 'Villas'} saved for your next trip
        </p>
      </header>

      {loading ? (
        <Loader count={3} />
      ) : wishlistItems.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <VillaCard 
              key={`${item.id}-${item.villa}`} 
              villa={item.villa_details} 
              onWishlistUpdate={() => loadWishlist(user.email)}
              showHeart={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 p-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-slate-300">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Saved Villas</h3>
          <p className="mt-2 text-slate-500 max-w-sm">Tap the heart on any villa to save it here for easy access later.</p>
          <Link 
            to="/villas" 
            className="mt-8 flex items-center gap-2 font-bold text-slate-900 transition-transform hover:scale-105"
          >
            <Home size={20} />
            Browse All Villas
          </Link>
        </div>
      )}
    </div>
  )
}

export default WishlistPage
