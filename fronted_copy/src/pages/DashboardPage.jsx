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
      const userBookings = await getBookings(user.email)
      setBookings(userBookings)
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
              <article key={booking.id} className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-2 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col gap-6 p-4 md:flex-row md:items-center">
                  {/* Image Section */}
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-[1.5rem] md:h-28 md:w-32">
                    <img 
                      src={booking.villa_image || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80"} 
                      alt={booking.villaName} 
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col justify-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{booking.villaName}</h2>
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="font-medium">{booking.checkIn} → {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-medium">{booking.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Total: ₹{Number(booking.totalPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions Section */}
                  <div className="flex flex-wrap items-center gap-5 md:ml-auto">
                    <div className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                      isConfirmed ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                      isCancelled ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {isConfirmed && <CheckCircle size={14} className="stroke-[3]" />}
                      {isCancelled && <XCircle size={14} className="stroke-[3]" />}
                      {isPending && <Clock size={14} className="stroke-[3]" />}
                      {booking.status}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={isCancelled}
                        className="rounded-2xl px-6 py-2.5 text-sm font-bold transition-all
                          disabled:opacity-40 disabled:cursor-not-allowed
                          bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                      >
                        {isCancelled ? "Cancelled" : "Cancel Booking"}
                      </button>
                      <Link
                        to={`/villas/${booking.villa}`}
                        className="rounded-2xl bg-[#0F172A] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
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
