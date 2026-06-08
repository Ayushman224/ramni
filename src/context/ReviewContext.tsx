import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Review, ReviewStatus } from '../types'
import { SITE_CONFIG } from '../config/site'
import { MOCK_PENDING_REVIEWS } from '../data/mockData'

type ReviewContextType = {
  pendingReviews: Review[]
  approvedReviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'status' | 'createdAt'>) => void
  updateReviewStatus: (id: string, status: ReviewStatus) => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([])
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([])

  useEffect(() => {
    const savedPending = localStorage.getItem('boutique_pending_reviews')
    const savedApproved = localStorage.getItem('boutique_reviews')

    if (savedPending) {
      try {
        setPendingReviews(JSON.parse(savedPending))
      } catch (error) {
        console.error('Failed to parse pending reviews', error)
        setPendingReviews(MOCK_PENDING_REVIEWS)
      }
    } else {
      setPendingReviews(MOCK_PENDING_REVIEWS)
    }

    if (savedApproved) {
      try {
        setApprovedReviews(JSON.parse(savedApproved))
      } catch (error) {
        console.error('Failed to parse approved reviews', error)
        setApprovedReviews(SITE_CONFIG.defaultTestimonials.map((t, idx) => ({
          id: `REV-APPROVED-${idx}`,
          customerName: t.name,
          phone: '',
          email: '',
          serviceUsed: t.service,
          rating: t.rating,
          comment: t.comment,
          status: 'Approved' as ReviewStatus,
          createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
        })))
      }
    } else {
      setApprovedReviews(SITE_CONFIG.defaultTestimonials.map((t, idx) => ({
        id: `REV-APPROVED-${idx}`,
        customerName: t.name,
        phone: '',
        email: '',
        serviceUsed: t.service,
        rating: t.rating,
        comment: t.comment,
        status: 'Approved' as ReviewStatus,
        createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
      })))
    }
  }, [])

  const addReview = (reviewData: Omit<Review, 'id' | 'status' | 'createdAt'>) => {
    const id = 'REV-' + Math.floor(100000 + Math.random() * 900000).toString()
    const newReview: Review = {
      ...reviewData,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    const updatedPending = [...pendingReviews, newReview]
    setPendingReviews(updatedPending)
    localStorage.setItem('boutique_pending_reviews', JSON.stringify(updatedPending))
  }

  const updateReviewStatus = (id: string, status: ReviewStatus) => {
    let updatedPending = [...pendingReviews]
    let updatedApproved = [...approvedReviews]
    const reviewIdx = updatedPending.findIndex(r => r.id === id)
    if (reviewIdx !== -1) {
      const [review] = updatedPending.splice(reviewIdx, 1)
      review.status = status
      if (status === 'Approved') {
        updatedApproved.push(review)
      }
    } else {
      // If it was already approved
      updatedApproved = updatedApproved.map(r => r.id === id ? { ...r, status } : r)
    }
    setPendingReviews(updatedPending)
    setApprovedReviews(updatedApproved)
    localStorage.setItem('boutique_pending_reviews', JSON.stringify(updatedPending))
    localStorage.setItem('boutique_reviews', JSON.stringify(updatedApproved))
  }

  return (
    <ReviewContext.Provider value={{ pendingReviews, approvedReviews, addReview, updateReviewStatus }}>
      {children}
    </ReviewContext.Provider>
  )
}

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider')
  }
  return context
}
