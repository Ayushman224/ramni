import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { BookingOrder } from '../types'
import { MOCK_BOOKINGS } from '../data/mockData'

type BookingContextType = {
  bookings: BookingOrder[]
  addBooking: (booking: Omit<BookingOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void
  updateBookingStatus: (id: string, status: BookingOrder['status']) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<BookingOrder[]>([])

  useEffect(() => {
    const savedBookings = localStorage.getItem('boutique_bookings')
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings))
      } catch (error) {
        console.error('Failed to parse bookings from localStorage, using mock data', error)
        setBookings(MOCK_BOOKINGS)
      }
    } else {
      setBookings(MOCK_BOOKINGS)
    }
  }, [])

  const addBooking = (bookingData: Omit<BookingOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const id = 'BTN-' + Math.floor(100000 + Math.random() * 900000).toString()
    const newBooking: BookingOrder = {
      ...bookingData,
      id,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    localStorage.setItem('boutique_bookings', JSON.stringify(updatedBookings))
  }

  const updateBookingStatus = (id: string, status: BookingOrder['status']) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status, updatedAt: new Date().toISOString() }
      }
      return b
    })
    setBookings(updatedBookings)
    localStorage.setItem('boutique_bookings', JSON.stringify(updatedBookings))
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookings = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider')
  }
  return context
}
