import { useState } from "react"
import { Star, Send, User } from "lucide-react"
import { addReview } from "../services/villaService"

function ReviewSection({ villaId, reviews, onReviewAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const newReview = await addReview({
        villaId,
        ...formData
      })
      onReviewAdded(newReview)
      setFormData({ name: "", email: "", rating: 5, comment: "" })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to submit review. Please try again.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-12 space-y-10">
      <div className="border-t border-slate-100 pt-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Guest Reviews</h3>
        
        {reviews.length === 0 ? (
          <p className="text-slate-500 italic">No reviews yet. Be the first to review this villa!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{review.user_name}</p>
                      <p className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-slate-700">{review.rating}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-slate-900 p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Name</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-slate-800 border-none px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
              <input
                type="email"
                required
                className="w-full rounded-xl bg-slate-800 border-none px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110 active:scale-90"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Experience</label>
            <textarea
              required
              rows={4}
              className="w-full rounded-xl bg-slate-800 border-none px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400"
              placeholder="Tell us about your stay..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          {error && <p className="text-rose-400 text-sm">{error}</p>}
          {success && <p className="text-emerald-400 text-sm">Review submitted successfully!</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full md:w-auto rounded-xl bg-amber-400 px-8 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-amber-300 disabled:opacity-50 active:scale-95"
          >
            {submitting ? "Submitting..." : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewSection
