import { useState } from "react"

const API_BASE = "http://127.0.0.1:8000/api"

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        const data = await res.json()
        const firstError =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Something went wrong. Please try again."
        setErrorMsg(firstError)
        setStatus("error")
      }
    } catch {
      setErrorMsg("Unable to reach the server. Please check your connection.")
      setStatus("error")
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-10 text-white sm:px-10">
        <div className="absolute -right-14 top-0 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Contact Us</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">We are here to help with your next stay.</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            Have a question about villas, bookings, or support? Share your details and our team will respond shortly.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
        {/* Contact info */}
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Reach us directly</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Email</p>
              <p>support@villabook.com</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Phone</p>
              <p>+91 98765 43210</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Office Hours</p>
              <p>Mon - Sun, 9:00 AM – 9:00 PM</p>
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              id="contact-name"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-slate-900/20 focus:ring"
            />
            <input
              id="contact-email"
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-slate-900/20 focus:ring"
            />
          </div>
          <textarea
            id="contact-message"
            required
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-slate-900/20 focus:ring"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">We usually reply within 24 hours.</p>
            <button
              id="contact-submit"
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {status === "loading" && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Success banner */}
      {status === "success" && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          ✅ Thanks for reaching out! Your message has been saved and we'll get back to you shortly.
        </p>
      )}

      {/* Error banner */}
      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          ❌ {errorMsg}
        </p>
      )}
    </div>
  )
}

export default ContactPage
