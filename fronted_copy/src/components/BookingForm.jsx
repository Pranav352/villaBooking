import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import ButtonLoader from "./ButtonLoader"

const ONE_DAY_MS = 1000 * 60 * 60 * 24

const parseDate = (value) => {
  if (!value) return null
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

const getTodayLocal = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function BookingForm({ villa, onSubmit, currentUser }) {
  const [isLoading, setIsLoading] = useState(false)
  const today = getTodayLocal()

  const bookingSchema = z.object({
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    guests: z.coerce.number().min(1).max(villa.maxGuests, `Maximum ${villa.maxGuests} guests allowed`),
  }).refine((data) => {
    const inDate = parseDate(data.checkIn)
    const outDate = parseDate(data.checkOut)
    return inDate && outDate && outDate > inDate
  }, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 1,
      checkIn: "",
      checkOut: "",
    }
  })

  const watchCheckIn = watch("checkIn")
  const watchCheckOut = watch("checkOut")

  const nights = useMemo(() => {
    if (!watchCheckIn || !watchCheckOut) return 0
    const inDate = parseDate(watchCheckIn)
    const outDate = parseDate(watchCheckOut)
    if (!inDate || !outDate || outDate <= inDate) return 0
    const diff = outDate - inDate
    return Math.ceil(diff / ONE_DAY_MS)
  }, [watchCheckIn, watchCheckOut])

  const totalPrice = nights * villa.pricePerNight

  const onFormSubmit = async (data) => {
    setIsLoading(true)
    try {
      await onSubmit({ ...data, nights, totalPrice })
      toast.success("Booking details submitted successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to process booking.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onFormSubmit)} 
      className="sticky top-24 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Book Your Stay</h2>
        <p className="text-sm text-slate-500 text-center">Secure your reservation instantly</p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <p>Booking as <span className="font-bold text-slate-900">{currentUser?.name || "Guest"}</span></p>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1">Check-in Date</label>
          <input
            {...register("checkIn")}
            type="date"
            min={today}
            className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
              errors.checkIn ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-slate-50"
            }`}
          />
          {errors.checkIn && <p className="text-xs font-medium text-rose-500 ml-1">{errors.checkIn.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1">Check-out Date</label>
          <input
            {...register("checkOut")}
            type="date"
            min={watchCheckIn || today}
            className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
              errors.checkOut ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-slate-50"
            }`}
          />
          {errors.checkOut && <p className="text-xs font-medium text-rose-500 ml-1">{errors.checkOut.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1">Number of Guests</label>
          <div className="relative">
            <input
              {...register("guests")}
              type="number"
              min="1"
              max={villa.maxGuests}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.guests ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-slate-50"
              }`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              Max {villa.maxGuests}
            </div>
          </div>
          {errors.guests && <p className="text-xs font-medium text-rose-500 ml-1">{errors.guests.message}</p>}
        </div>
      </div>

      <div className="space-y-3 rounded-2xl bg-slate-900 p-5 text-white shadow-inner">
        <div className="flex justify-between text-sm text-slate-400">
          <span>{nights || 0} nights × ₹{villa.pricePerNight.toLocaleString()}</span>
          <span>₹{(nights * villa.pricePerNight).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-slate-800 pt-3 text-lg font-bold">
          <span>Total Price</span>
          <span className="text-emerald-400">₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || nights === 0}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        {isLoading ? <ButtonLoader /> : "Confirm Reservation"}
      </button>

      {nights === 0 && (
        <p className="text-center text-xs font-medium text-slate-400">
          Please select valid dates to calculate total price
        </p>
      )}
    </form>
  )
}

export default BookingForm
