function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-slate-600 sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p>© {new Date().getFullYear()} VillaBook. Designed for modern villa stays.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
          <span>Secure booking</span>
          <span>Trusted hosts</span>
          <span>24/7 support</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
