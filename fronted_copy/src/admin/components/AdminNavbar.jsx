import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAdminSession, logoutAdmin } from "../../services/adminAuthService"

function AdminNavbar() {
  const navigate = useNavigate()
  const [session, setSession] = useState(() => getAdminSession())

  useEffect(() => {
    const handleChange = () => setSession(getAdminSession())
    window.addEventListener("admin-auth-change", handleChange)
    return () => window.removeEventListener("admin-auth-change", handleChange)
  }, [])

  const handleLogout = () => {
    logoutAdmin()
    navigate("/admin/login")
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">VillaBook Admin</h1>
        <p className="text-sm text-slate-500">Manage villas, users, and bookings</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-700">{session?.username}</span>
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default AdminNavbar
