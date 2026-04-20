import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Trash2, Calendar, User, Home, Clock } from "lucide-react"
import DataTable from "../components/DataTable"
import Toast from "../components/Toast"
import { deleteBooking, getBookings, updateBookingStatus } from "../../services/bookingService"

function ManageBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [toast, setToast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await getBookings()
      setBookings(data)
    } catch (error) {
      console.error("Failed to load bookings:", error)
      showToast("Could not load bookings.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status)
      showToast(`Booking marked as ${status}.`)
      loadData()
    } catch (error) {
      // Use the error message from the API instead of a hardcoded string
      const errorMessage = error.message || "Error updating status."
      console.error("Failed to update status:", error)
      showToast(errorMessage, "error")
    }
  }

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Delete this booking permanently? This action cannot be undone.")) return
    try {
      await deleteBooking(bookingId)
      showToast("Booking deleted successfully.")
      loadData()
    } catch (error) {
      console.error("Failed to delete booking:", error)
      showToast("Error deleting booking.", "error")
    }
  }

  const columns = [
    {
      key: "name",
      label: "Guest",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <User size={18} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{row.name || "Guest"}</p>
            <p className="text-xs text-slate-500">{row.userEmail || "-"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "villaName",
      label: "Villa",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Home size={14} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-700">{row.villaName}</span>
        </div>
      ),
    },
    {
      key: "dates",
      label: "Check-in/out",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar size={12} className="text-indigo-500" />
            <span>{row.checkIn} to {row.checkOut}</span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
            {row.guests} guests
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        let styles = "bg-slate-100 text-slate-600"
        let Icon = Clock
        
        if (row.status === "confirmed") {
          styles = "bg-emerald-100 text-emerald-700"
          Icon = CheckCircle
        } else if (row.status === "cancelled") {
          styles = "bg-rose-100 text-rose-700"
          Icon = XCircle
        } else if (row.status === "pending") {
          styles = "bg-amber-100 text-amber-700 font-bold"
          Icon = Clock
        }

        return (
          <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>
            <Icon size={12} />
            <span className="capitalize">{row.status}</span>
          </div>
        )
      },
    },
    {
      key: "actions",
      label: "Management",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.status !== "confirmed" && (
            <button
              onClick={() => handleStatusUpdate(row.id, "confirmed")}
              title="Confirm Booking"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <CheckCircle size={16} />
            </button>
          )}
          {row.status !== "cancelled" && (
            <button
              onClick={() => handleStatusUpdate(row.id, "cancelled")}
              title="Cancel Booking"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            >
              <XCircle size={16} />
            </button>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            title="Delete Permanently"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Toast toast={toast} />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Booking Management</h2>
        <div className="text-sm text-slate-500">
          Total: <span className="font-semibold text-slate-900">{bookings.length}</span> bookings
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <DataTable 
          columns={columns} 
          rows={bookings} 
          emptyMessage={isLoading ? "Updating list..." : "No bookings found matching your criteria."} 
        />
      </div>
    </div>
  )
}

export default ManageBookingsPage
