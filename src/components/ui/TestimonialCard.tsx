import { Review } from '../../types'
import { Star } from 'lucide-react'

type TestimonialCardProps = {
  review: Review | {
    name: string
    locality: string
    service: string
    rating: number
    comment: string
  }
}

export const TestimonialCard = ({ review }: TestimonialCardProps) => {
  const name = 'customerName' in review ? review.customerName : review.name
  const locality = 'locality' in review ? review.locality : (review as any).pickupCity || ''
  const service = 'serviceUsed' in review ? review.serviceUsed : review.service

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">{review.comment}</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{locality} • {service}</p>
      </div>
    </div>
  )
}
