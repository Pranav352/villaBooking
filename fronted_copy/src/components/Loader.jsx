function Loader({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          {/* Skeleton Image Area */}
          <div className="relative h-64 bg-slate-200" />
          
          <div className="p-5">
            {/* Title Skeleton */}
            <div className="mb-4 h-6 w-3/4 rounded-lg bg-slate-200" />
            
            {/* Description/Location Skeletons */}
            <div className="space-y-3">
              <div className="h-3 w-1/2 rounded-full bg-slate-100" />
              <div className="h-3 w-2/3 rounded-full bg-slate-100" />
            </div>
            
            {/* Footer Skeleton */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="h-6 w-24 rounded-lg bg-slate-200" />
              <div className="h-10 w-24 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loader
