import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import { saveBooking } from "../services/bookingService"
import { getAllVillas } from "../services/villaService"

const getCurrentUser = () => {
  const rawUser = localStorage.getItem("villa_user")
  return rawUser ? JSON.parse(rawUser) : null
}

function BookingPage() {
  const [searchParams] = useSearchParams()
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [villas, setVillas] = useState([])
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())
  const villaId = searchParams.get("villaId")

  useEffect(() => {
    const loadVillas = async () => {
      try {
        const data = await getAllVillas()
        setVillas(data)
      } catch (error) {
        console.error("Failed to load villas:", error)
      }
    }
    loadVillas()
  }, [])

  useEffect(() => {
    const syncCurrentUser = () => setCurrentUser(getCurrentUser())
    window.addEventListener("auth-change", syncCurrentUser)
    window.addEventListener("storage", syncCurrentUser)
    return () => {
      window.removeEventListener("auth-change", syncCurrentUser)
      window.removeEventListener("storage", syncCurrentUser)
    }
  }, [])

  const villa = villas.find((item) => String(item.id) === String(villaId)) || villas[0]

  if (!villa) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
        No villas available to book right now.
      </div>
    )
  }

  const handleBookingSubmit = async (formData) => {
    if (!currentUser) return
    try {
      const booking = await saveBooking({
        ...formData,
        name: currentUser.name,
        userEmail: currentUser.email,
        villaId: villa.id,
        villaName: villa.name,
        totalPrice: formData.totalPrice || (villa.pricePerNight * formData.duration), // Ensure price is passed
      })
      setConfirmedBooking(booking)
    } catch (error) {
      console.error("Failed to save booking:", error)
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Booking: {villa.name}</h1>
        <img src={villa.images[0]} alt={villa.name} className="h-64 w-full rounded-xl object-cover" />
        <p className="text-sm text-slate-600">{villa.description}</p>
      </section>

      {confirmedBooking ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-2xl font-bold text-emerald-800">Booking Confirmed</h2>
          <p className="mt-3 text-sm text-emerald-700">Thank you, {confirmedBooking.name}. Your villa stay is locked in.</p>
          <div className="mt-4 space-y-2 text-sm text-emerald-900">
            <p>Booked by: {confirmedBooking.name}</p>
            {confirmedBooking.userEmail ? <p>Email: {confirmedBooking.userEmail}</p> : null}
            <p>Villa: {confirmedBooking.villaName}</p>
            <p>Dates: {confirmedBooking.checkIn} to {confirmedBooking.checkOut}</p>
            <p>Guests: {confirmedBooking.guests}</p>
            <p>Total: ₹{confirmedBooking.totalPrice}</p>
          </div>
          <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white">
            View My Bookings
          </Link>
        </section>
      ) : currentUser ? (
        <BookingForm villa={villa} onSubmit={handleBookingSubmit} currentUser={currentUser} />
      ) : (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-amber-900">Login required to book</h2>
          <p className="mt-2 text-sm text-amber-800">
            Please login or register first, then return to confirm your villa booking.
          </p>
          <Link
            to={`/auth?redirect=${encodeURIComponent(`/booking?villaId=${villa.id}`)}`}
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Go to Login
          </Link>
        </section>
      )}
    </div>
  )
}

export default BookingPage
