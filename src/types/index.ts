export type Service = {
  id: string
  name: string
  category: string
  description: string
  startingPrice: number
  image: string
}

export type GalleryItem = {
  id: number
  title: string
  category: string
  description: string
  rating: number
  review: string
  style: string
}

export type PricingItem = {
  name: string
  price: string
  description: string
  icon: string
  featured: boolean
}

export type Testimonial = {
  name: string
  locality: string
  service: string
  rating: number
  comment: string
}

export type FAQ = {
  question: string
  answer: string
}

export type PageMetadata = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
}

export type ServiceAreas = {
  [key: string]: string[]
}

export type Customer = {
  name: string
  phone: string
  phoneAlt?: string
  email: string
  address?: string
  state?: string
  city?: string
  pincode?: string
  password?: string
}

export type BookingOrder = {
  id: string
  fullName: string
  email: string
  phonePrimary: string
  phoneAlt?: string
  pickupAddress: string
  pickupLandmark?: string
  pickupState?: string
  pickupCity: string
  pickupPincode: string
  garmentCategory: string
  serviceType: string
  fabricPickupOption?: string
  preferredPickupDate?: string
  preferredPickupTime?: string
  measurementOption?: string
  designReference?: string
  specialInstructions?: string
  locLat?: string
  locLon?: string
  status: 'New' | 'Confirmed' | 'Pickup Scheduled' | 'Cloth Picked Up' | 'Measurement Pending' | 'Stitching Started' | 'Trial/Fitting' | 'Ready for Delivery' | 'Delivered' | 'Cancelled'
  createdAt: string
  updatedAt: string
}

export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected'

export type Review = {
  id: string
  customerName: string
  phone: string
  email?: string
  serviceUsed: string
  rating: number
  comment: string
  image?: string
  status: ReviewStatus
  createdAt: string
}

export type ContactRequest = {
  id: string
  fullName: string
  phone: string
  email?: string
  inquiryType: string
  message: string
  status: 'New' | 'In Review' | 'Contacted' | 'Resolved' | 'Closed'
  createdAt: string
}

export type SupportRequest = {
  id: string
  fullName: string
  phone: string
  email?: string
  orderId?: string
  issueCategory: string
  message: string
  status: 'New' | 'In Review' | 'Contacted' | 'Resolved' | 'Closed'
  createdAt: string
}
