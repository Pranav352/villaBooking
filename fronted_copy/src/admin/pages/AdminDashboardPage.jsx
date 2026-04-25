import { useEffect, useMemo, useState } from "react"
import DashboardCard from "../components/DashboardCard"
import DataTable from "../components/DataTable"
import { getBookings } from "../../services/bookingService"
import { getUsers } from "../../services/userService"
import { getAllVillas } from "../../services/villaService"
import { getAdminSession } from "../../services/adminAuthService"

function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [session] = useState(() => getAdminSession())
  const [villas, setVillas] = useState([])
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [villaData, bookingData, userData] = await Promise.all([
          getAllVillas(),
          getBookings(),
          getUsers()
        ])
        setVillas(villaData)
        setBookings(bookingData)
        setUsers(userData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const revenue = useMemo(
    () =>
      bookings
        .filter((booking) => booking.status === "confirmed")
        .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0),
    [bookings]
  )

  const recentBookings = useMemo(
    () => bookings.slice(0, 5),
    [bookings]
  )

  const columns = [
    {
      key: "name",
      label: "User",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.name || "Unknown user"}</p>
          <p className="text-xs text-slate-500">{row.userEmail || "-"}</p>
        </div>
      ),
    },
    { key: "villaName", label: "Villa" },
    { key: "dates", label: "Dates", render: (row) => `${row.checkIn} → ${row.checkOut}` },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${row.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "totalPrice", label: "Amount", render: (row) => `₹${row.totalPrice}` },
  ]

  if (loading) {
    return <div className="rounded-xl bg-white p-6 text-sm text-slate-600">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, <span className="font-semibold text-slate-800">{session?.username || "Admin"}</span></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Villas" value={villas.length} tone="slate" />
        <DashboardCard title="Total Bookings" value={bookings.length} tone="blue" />
        <DashboardCard title="Total Users" value={users.length} tone="emerald" />
        <DashboardCard title="Revenue" value={`₹${revenue}`} tone="amber" />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
        <DataTable columns={columns} rows={recentBookings} emptyMessage="No recent bookings available." />
      </section>
    </div>
  )
}

export default AdminDashboardPage
