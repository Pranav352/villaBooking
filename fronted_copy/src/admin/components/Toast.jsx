function Toast({ toast }) {
  if (!toast) return null

  return (
    <div className="fixed right-4 top-4 z-50">
      <div
        className={`rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
          toast.type === "error" ? "bg-rose-600" : "bg-emerald-600"
        }`}
      >
        {toast.message}
      </div>
    </div>
  )
}

export default Toast
