import { useState } from "react"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSent, setIsSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSent(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="space-y-8">
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
              <p>Mon - Sun, 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-slate-900/20 focus:ring"
            />
            <input
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
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {isSent ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Thanks for reaching out. Your message has been sent successfully.
        </p>
      ) : null}
    </div>
  )
}

export default ContactPage
