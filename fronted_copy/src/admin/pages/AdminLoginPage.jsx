import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../../services/adminAuthService"

function AdminLoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await loginAdmin(formData.username, formData.password)
      setIsSubmitting(false)
      if (!result.success) {
        setError(result.message)
        return
      }
      navigate("/admin")
    } catch (err) {
      setIsSubmitting(false)
      setError("An unexpected error occurred.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use your Django staff credentials (e.g., username: villa)</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            required
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Admin username"
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
          <input
            required
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Signing in..." : "Login as Admin"}
          </button>
        </form>

        {error ? <p className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}
      </div>
    </div>
  )
}

export default AdminLoginPage
