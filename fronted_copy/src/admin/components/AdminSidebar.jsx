import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAdminSession } from "../../services/adminAuthService"

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
  }`

function AdminSidebar() {
  const [session, setSession] = useState(() => getAdminSession())

  useEffect(() => {
    const handleChange = () => setSession(getAdminSession())
    window.addEventListener("admin-auth-change", handleChange)
    return () => window.removeEventListener("admin-auth-change", handleChange)
  }, [])

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r flex flex-col lg:overflow-y-auto">
      <div>
        <p className="mb-5 text-lg font-bold text-slate-900">Admin Panel</p>
        <nav className="grid gap-1">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/villas" className={linkClass}>
            Manage Villas
          </NavLink>
          <NavLink to="/admin/bookings" className={linkClass}>
            Manage Bookings
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/contact-messages" className={linkClass}>
            Contact Messages
          </NavLink>
        </nav>
      </div>

      {session ? (
        <div className="mt-auto hidden lg:block rounded-xl border border-slate-200 bg-slate-50 p-3 mt-8">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Admin</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-xs font-semibold text-slate-800 truncate" title={session.username}>
              {session.username}
            </p>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

export default AdminSidebar
