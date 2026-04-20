import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Home, Users, CheckCircle, XCircle, Clock } from "lucide-react"
import toast from "react-hot-toast"
import { cancelBooking, getBookings } from "../services/bookingService"

const getCurrentUser = () => {
  const rawUser = localStorage.getItem("villa_user")
  return rawUser ? JSON.parse(rawUser) : null
}

function DashboardPage() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async (user) => {
    if (!user?.email) return
    try {
      const allBookings = await getBookings()
      setBookings(allBookings.filter((booking) => booking.userEmail === user.email))
    } catch (error) {
      console.error("Failed to fetch user bookings:", error)
      toast.error("Could not load your bookings.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const syncState = async () => {
      const user = getCurrentUser()
      setCurrentUser(user)
      if (user) {
        await fetchBookings(user)
      } else {
        setLoading(false)
      }
    }
    syncState()
  }, [])

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return
    
    const loadingToast = toast.loading("Processing cancellation...")
    try {
      await cancelBooking(bookingId)
      toast.success("Booking cancelled successfully.", { id: loadingToast })
      await fetchBookings(currentUser)
    } catch (error) {
      console.error("Failed to cancel booking:", error)
      toast.error("Failed to cancel booking. Please try again.", { id: loadingToast })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"></div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <Users size={24} />
          </div>
          <h2 className="text-lg font-semibold text-amber-900">Login Required</h2>
          <p className="mt-1 text-sm text-amber-800">You must be signed in to view your booking history.</p>
          <Link
            to="/auth?redirect=%2Fdashboard"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-500">Welcome back, {currentUser.name}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {bookings.length} Bookings
        </div>
      </div>

      {!bookings.length ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <Calendar size={32} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">No bookings found</h2>
          <p className="mt-2 text-slate-500 text-sm">Your upcoming villa stays will appear here.</p>
          <Link 
            to="/villas" 
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Browse Villas
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const isCancelled = booking.status === "cancelled"
            const isConfirmed = booking.status === "confirmed"
            const isPending = booking.status === "pending"

            return (
              <article key={booking.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-1 transition-all hover:border-slate-300 hover:shadow-lg">
                <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-32">
                    <img 
                      src={booking.villa_image || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80"} 
                      alt={booking.villaName} 
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h2 className="text-xl font-bold text-slate-900">{booking.villaName}</h2>
                      <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        isConfirmed ? "bg-emerald-100 text-emerald-700" : 
                        isCancelled ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {isConfirmed && <CheckCircle size={12} />}
                        {isCancelled && <XCircle size={12} />}
                        {isPending && <Clock size={12} />}
                        {booking.status}
                      </div>
                    </div>

                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span>{booking.checkIn} → {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span>{booking.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <span>Total: ₹{booking.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100 md:border-t-0 md:pt-0">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={isCancelled}
                      className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold transition-all md:flex-none
                        disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
                        enabled:bg-rose-50 enabled:text-rose-600 enabled:hover:bg-rose-600 enabled:hover:text-white"
                    >
                      {isCancelled ? "Already Cancelled" : "Cancel Booking"}
                    </button>
                    <Link
                      to={`/villas/${booking.villa}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 md:flex-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
