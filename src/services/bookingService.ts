import { BookingOrder } from '../types'

// This will be replaced with real API calls later
export const BookingService = {
  async getBookings(): Promise<BookingOrder[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('boutique_bookings')
        if (saved) {
          resolve(JSON.parse(saved))
        } else {
          resolve([])
        }
      }, 500)
    })
  },

  async createBooking(data: Omit<BookingOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<BookingOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = 'BTN-' + Math.floor(100000 + Math.random() * 900000).toString()
        const booking: BookingOrder = {
          ...data,
          id,
          status: 'New',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        resolve(booking)
      }, 500)
    })
  },

  async updateBookingStatus(id: string, status: BookingOrder['status']): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  },
}
