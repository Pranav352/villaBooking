import { useEffect, useState } from "react"
import { Star, Trash2, MessageSquare, User, Home } from "lucide-react"
import { getAllReviews, deleteReview, getAllVillas } from "../../services/villaService"
import { toast } from "react-hot-toast"

function ManageReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [villas, setVillas] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, villasData] = await Promise.all([
          getAllReviews(),
          getAllVillas()
        ])
        
        // Create a map for quick villa lookup
        const villaMap = {}
        villasData.forEach(v => {
          villaMap[v.id] = v.name
        })
        
        setReviews(reviewsData)
        setVillas(villaMap)
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
        toast.error("Failed to load reviews")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return

    try {
      await deleteReview(id)
      setReviews(reviews.filter(r => r.id !== id))
      toast.success("Review deleted successfully")
    } catch (error) {
      console.error("Failed to delete review:", error)
      toast.error("Failed to delete review")
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading reviews...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Reviews</h1>
          <p className="text-sm text-slate-500">Monitor and moderate guest feedback</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm border border-slate-100">
          <MessageSquare className="h-5 w-5 text-indigo-500" />
          <span className="font-bold text-slate-700">{reviews.length}</span>
          <span className="text-xs text-slate-400 uppercase font-medium">Total Reviews</span>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-20 text-center text-slate-500">
            No reviews found.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{review.user_name}</h3>
                      <span className="text-xs text-slate-400">•</span>
                      <p className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
                      <Home className="h-3 w-3" />
                      <span>{villas[review.villa] || `Villa ID: ${review.villa}`}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 md:px-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {review.comment}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
                    title="Delete Review"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 h-1 w-0 bg-rose-500 transition-all group-hover:w-full" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ManageReviewsPage
