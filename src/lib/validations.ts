import { z } from 'zod'
import { SITE_CONFIG } from '../config/site'

// Helper for phone number (10 digits)
const phoneRegex = /^\d{10}$/
const pincodeRegex = /^\d{6}$/

export const BookingFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phonePrimary: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number'),
  phoneAlt: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number').optional().or(z.literal('')),
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  pickupLandmark: z.string().optional(),
  pickupState: z.string().optional(),
  pickupCity: z.string().min(2, 'City is required'),
  pickupPincode: z.string().regex(pincodeRegex, 'Please enter a valid 6-digit pincode'),
  garmentCategory: z.string().min(2, 'Garment category is required'),
  serviceType: z.string().min(2, 'Service type is required'),
  fabricPickupOption: z.string().optional(),
  preferredPickupDate: z.string().min(1, 'Pickup date is required'),
  preferredPickupTime: z.string().min(1, 'Pickup time is required'),
  measurementOption: z.string().optional(),
  specialInstructions: z.string().optional(),
}).refine(
  (data) => {
    return SITE_CONFIG.isServiceAvailable(data.pickupCity, data.pickupPincode)
  },
  {
    message: 'Service is not available at this location. We are expanding soon!',
    path: ['pickupPincode'],
  }
)

export const SignupFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number'),
  phoneAlt: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number').optional().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(pincodeRegex, 'Please enter a valid 6-digit pincode'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  confirmPassword: z.string().min(4, 'Confirm password is required'),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
).refine(
  (data) => {
    return SITE_CONFIG.isServiceAvailable(data.city, data.pincode)
  },
  {
    message: 'Service is not available at this location',
    path: ['pincode'],
  }
)

export const LoginFormSchema = z.object({
  loginId: z.string().min(1, 'Please enter phone or email'),
  password: z.string().min(1, 'Password is required'),
})

export const ContactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  inquiryType: z.string().min(1, 'Please select inquiry type'),
  message: z.string().min(5, 'Please enter your message'),
})

export const SupportFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  orderId: z.string().optional(),
  issueCategory: z.string().min(1, 'Please select issue category'),
  message: z.string().min(5, 'Please enter your message'),
})

export const ReviewFormSchema = z.object({
  customerName: z.string().min(2, 'Your name is required'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  serviceUsed: z.string().min(1, 'Please select service used'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Please write your review'),
})
