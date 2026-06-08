import { BookingOrder, Review, ContactRequest, SupportRequest } from '../types'

export const MOCK_BOOKINGS: BookingOrder[] = [
  {
    id: "BTN-123456",
    fullName: "Priya Sharma",
    email: "priya@example.com",
    phonePrimary: "9876543210",
    phoneAlt: "9876543211",
    pickupAddress: "123 Main Street",
    pickupLandmark: "Near Park",
    pickupState: "Delhi",
    pickupCity: "Delhi",
    pickupPincode: "110001",
    garmentCategory: "Blouse",
    serviceType: "New stitching",
    fabricPickupOption: "Pickup from my address",
    preferredPickupDate: "2025-06-10",
    preferredPickupTime: "10:00",
    status: "New",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "BTN-123457",
    fullName: "Neha Verma",
    email: "neha@example.com",
    phonePrimary: "9876543212",
    pickupAddress: "456 Park Avenue",
    pickupState: "Uttar Pradesh",
    pickupCity: "Noida",
    pickupPincode: "201301",
    garmentCategory: "Suit",
    serviceType: "New stitching",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export const MOCK_PENDING_REVIEWS: Review[] = [
  {
    id: "REV-1001",
    customerName: "Anjali Gupta",
    phone: "9876543213",
    serviceUsed: "Lehenga Stitching",
    rating: 5,
    comment: "Excellent service!",
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
]

export const MOCK_APPROVED_REVIEWS: Review[] = [
  // We'll use site-config default testimonials as approved reviews
]

export const MOCK_CONTACT_REQUESTS: ContactRequest[] = [
  {
    id: "CON-2001",
    fullName: "Ritu Singh",
    phone: "9876543214",
    email: "ritu@example.com",
    inquiryType: "Pricing inquiry",
    message: "Looking for pricing details.",
    status: "New",
    createdAt: new Date().toISOString(),
  },
]

export const MOCK_SUPPORT_REQUESTS: SupportRequest[] = [
  {
    id: "SUP-3001",
    fullName: "Pooja Mishra",
    phone: "9876543215",
    orderId: "BTN-123456",
    issueCategory: "Fitting issue",
    message: "Fitting needs a bit tight.",
    status: "New",
    createdAt: new Date().toISOString(),
  },
]
