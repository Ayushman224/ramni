import { Review, ReviewStatus } from '../types'

export const ReviewService = {
  async getPendingReviews(): Promise<Review[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('boutique_pending_reviews')
        if (saved) {
          resolve(JSON.parse(saved))
        } else {
          resolve([])
        }
      }, 500)
    })
  },

  async getApprovedReviews(): Promise<Review[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('boutique_reviews')
        if (saved) {
          resolve(JSON.parse(saved))
        } else {
          resolve([])
        }
      }, 500)
    })
  },

  async submitReview(data: Omit<Review, 'id' | 'status' | 'createdAt'>): Promise<Review> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = 'REV-' + Math.floor(100000 + Math.random() * 900000).toString()
        const review: Review = {
          ...data,
          id,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        }
        resolve(review)
      }, 500)
    })
  },

  async updateReviewStatus(id: string, status: ReviewStatus): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  },
}
