import { SEO } from '../../components/ui/SEO'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { SITE_CONFIG } from '../../config/site'
import { useReviews } from '../../context/ReviewContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewFormSchema } from '../../lib/validations'
import { z } from 'zod'
import { Star } from 'lucide-react'

type ReviewFormInputs = z.infer<typeof ReviewFormSchema>

export const ReviewsPage = () => {
  const { approvedReviews, addReview } = useReviews()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInputs>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: { rating: 0 },
  })

  const watchedRating = watch('rating')

  const onSubmit = (data: ReviewFormInputs) => {
    addReview(data)
    setIsSuccess(true)
  }

  const setRating = (rating: number) => {
    setValue('rating', rating)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="reviews" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Customer Reviews</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h1>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {approvedReviews.map((review, index) => (
            <TestimonialCard key={review.id || index} review={review} />
          ))}
          {SITE_CONFIG.defaultTestimonials.slice(0, Math.max(0, 6 - approvedReviews.length)).map((testimonial, index) => (
            <TestimonialCard key={`default-${index}`} review={testimonial} />
          ))}
        </div>

        {/* Add Review Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
          <p className="text-gray-600 mb-6">We'd love to hear about your experience with {SITE_CONFIG.businessName}.</p>

          {isSuccess ? (
            <div className="bg-green-50 text-green-800 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold mb-1">Thank You!</p>
              <p>Your review has been submitted for approval.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  {...register('customerName')}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.customerName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Used</label>
                <select
                  {...register('serviceUsed')}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.serviceUsed ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                >
                  <option value="">Select</option>
                  <option value="Blouse Stitching">Blouse Stitching</option>
                  <option value="Salwar Suit">Salwar Suit</option>
                  <option value="Lehenga">Lehenga</option>
                  <option value="Kurti">Kurti</option>
                  <option value="Alteration">Alteration</option>
                  <option value="Other">Other</option>
                </select>
                {errors.serviceUsed && <p className="text-red-500 text-sm mt-1">{errors.serviceUsed.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`${star <= watchedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} cursor-pointer`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea
                  {...register('comment')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.comment ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-4 text-base font-semibold text-white hover:bg-pink-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
