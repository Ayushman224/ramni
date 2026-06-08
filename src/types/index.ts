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

export type CustomerAddress = {
  id: string
  label: 'Home' | 'Office' | 'Other'
  fullAddress: string
  landmark?: string
  city: string
  state: string
  pincode: string
}

export type Customer = {
  id: string
  fullName: string
  phone: string
  phoneAlt?: string
  email: string
  addresses: CustomerAddress[]
  password?: string
}

export type CartItem = {
  id: string
  type: 'service' | 'design'
  item: Service | GalleryItem
  quantity: number
  designReference?: string
  measurementPreference?: 'existing' | 'sample' | 'fresh'
  notes?: string
}

export type BookingOrder = {
  id: string
  customer: Customer
  pickupDate?: string
  pickupTime?: string
  pickupOption?: string
  address: CustomerAddress
  items: CartItem[]
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
