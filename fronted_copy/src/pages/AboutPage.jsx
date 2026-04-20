function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-sm sm:px-10">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">About VillaBook</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            Curated villas, seamless bookings, and memorable stays.
          </h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            VillaBook helps travelers discover premium villas with transparent pricing and a smooth booking experience.
            We combine modern design with trusted hosting standards so every trip starts with confidence.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-slate-900">250+</p>
          <p className="mt-1 text-sm text-slate-600">Premium Villas</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-slate-900">18k+</p>
          <p className="mt-1 text-sm text-slate-600">Happy Guests</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-slate-900">4.8/5</p>
          <p className="mt-1 text-sm text-slate-600">Average Rating</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-slate-900">24/7</p>
          <p className="mt-1 text-sm text-slate-600">Support Team</p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">Our Mission</h2>
          <p className="mt-2 text-sm text-slate-600">
            Make luxury villa booking effortless for couples, families, and groups.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">What We Offer</h2>
          <p className="mt-2 text-sm text-slate-600">
            Curated listings, rich villa details, quick checkout, and booking status tracking.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">Why Guests Choose Us</h2>
          <p className="mt-2 text-sm text-slate-600">
            Reliable support, modern UI, responsive design, and transparent guest-first policies.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">How VillaBook Works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">1. Discover</p>
            <p className="mt-2 text-sm text-slate-600">Browse location-based villas with amenities, ratings, and verified photos.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">2. Book Instantly</p>
            <p className="mt-2 text-sm text-slate-600">Choose your dates, guests, and confirm within minutes through a clean flow.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">3. Stay Confident</p>
            <p className="mt-2 text-sm text-slate-600">Track your bookings, manage plans, and contact support anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
