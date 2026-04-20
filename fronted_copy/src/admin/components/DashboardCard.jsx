function DashboardCard({ title, value, tone = "slate" }) {
  const toneClassMap = {
    slate: "bg-slate-900 text-white",
    emerald: "bg-emerald-600 text-white",
    blue: "bg-blue-600 text-white",
    amber: "bg-amber-500 text-slate-900",
  }

  return (
    <article
      className={`rounded-xl p-5 shadow-sm transition hover:-translate-y-0.5 ${toneClassMap[tone] || toneClassMap.slate}`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </article>
  )
}

export default DashboardCard
