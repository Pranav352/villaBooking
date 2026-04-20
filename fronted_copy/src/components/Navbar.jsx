import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X, User, LogOut } from "lucide-react"

const navItemClass = ({ isActive }) =>
  `cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
    isActive ? "bg-slate-900 text-white shadow-md shadow-slate-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`

const mobileNavItemClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
    isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`

function Navbar() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const syncUser = () => {
      const rawUser = localStorage.getItem("villa_user")
      setUser(rawUser ? JSON.parse(rawUser) : null)
    }

    syncUser()
    window.addEventListener("storage", syncUser)
    window.addEventListener("auth-change", syncUser)

    return () => {
      window.removeEventListener("storage", syncUser)
      window.removeEventListener("auth-change", syncUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("villa_user")
    window.dispatchEvent(new Event("auth-change"))
    setUser(null)
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink 
          to="/" 
          className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">V</div>
          <span>VillaBook</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink to="/" className={navItemClass}>Home</NavLink>
          <NavLink to="/villas" className={navItemClass}>Villas</NavLink>
          <NavLink to="/about" className={navItemClass}>About</NavLink>
          <NavLink to="/contact" className={navItemClass}>Contact</NavLink>
          {user && (
            <NavLink to="/dashboard" className={navItemClass}>My Stays</NavLink>
          )}

          <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-slate-50 pl-1 pr-3 py-1 border border-slate-100">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="group flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <NavLink 
                to="/auth" 
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 hover:shadow-none active:scale-95"
              >
                Log In
              </NavLink>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all active:scale-90 lg:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white p-4 lg:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={mobileNavItemClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/villas" className={mobileNavItemClass} onClick={() => setIsMenuOpen(false)}>Villas</NavLink>
            <NavLink to="/about" className={mobileNavItemClass} onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileNavItemClass} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
            {user && (
              <NavLink to="/dashboard" className={mobileNavItemClass} onClick={() => setIsMenuOpen(false)}>My Stays</NavLink>
            )}
            
            <div className="mt-4 border-t border-slate-100 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-white uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl bg-rose-50 px-4 py-3 text-rose-600 font-bold"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink 
                  to="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-bold text-white"
                >
                  Log In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
