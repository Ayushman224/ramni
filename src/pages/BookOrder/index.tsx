import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SEO } from '../../components/ui/SEO'
import { BookingFormSchema } from '../../lib/validations'
import { SITE_CONFIG } from '../../config/site'
import { useBookings } from '../../context/BookingContext'
import { CheckCircle } from 'lucide-react'

type BookingFormInputs = z.infer<typeof BookingFormSchema>

export const BookOrderPage = () => {
  const navigate = useNavigate()
  const { addBooking } = useBookings()
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormInputs>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      pickupCity: '',
      pickupPincode: '',
    },
  })

  const onSubmit = (data: BookingFormInputs) => {
    // We'll pass data to context addBooking which manages the state & localStorage
    const bookingData = {
      fullName: data.fullName,
      email: data.email,
      phonePrimary: data.phonePrimary,
      phoneAlt: data.phoneAlt,
      pickupAddress: data.pickupAddress,
      pickupLandmark: data.pickupLandmark,
      pickupState: data.pickupState,
      pickupCity: data.pickupCity,
      pickupPincode: data.pickupPincode,
      garmentCategory: data.garmentCategory,
      serviceType: data.serviceType,
      fabricPickupOption: data.fabricPickupOption,
      preferredPickupDate: data.preferredPickupDate,
      preferredPickupTime: data.preferredPickupTime,
      measurementOption: data.measurementOption,
      specialInstructions: data.specialInstructions,
    }

    // Generate booking ID manually here too to show in UI
    const id = 'BTN-' + Math.floor(100000 + Math.random() * 900000).toString()
    addBooking(bookingData)
    setBookingId(id)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your {SITE_CONFIG.businessName} order request has been received.</p>
          <div className="bg-gray-50 rounded-lg py-4 px-6 mb-6">
            <p className="text-sm text-gray-500 mb-1">Booking ID</p>
            <p className="font-mono font-bold text-xl text-pink-600">{bookingId}</p>
          </div>
          <p className="text-gray-600 mb-6">Our team will contact you shortly for confirmation and measurement scheduling.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <SEO pageKey="book" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Book Now</span>
            <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Book Your Stitching Order</h1>
            <p className="mt-2 text-gray-600">Fill in the details below and our team will get in touch.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phonePrimary')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phonePrimary ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.phonePrimary && <p className="text-red-500 text-sm mt-1">{errors.phonePrimary.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Number (Optional)</label>
                  <input
                    type="tel"
                    {...register('phoneAlt')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phoneAlt ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.phoneAlt && <p className="text-red-500 text-sm mt-1">{errors.phoneAlt.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                <textarea
                  {...register('pickupAddress')}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  {...register('pickupLandmark')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State (Optional)</label>
                  <input
                    type="text"
                    {...register('pickupState')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    {...register('pickupCity')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.pickupCity ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  >
                    <option value="">Select City</option>
                    {SITE_CONFIG.serviceCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.pickupCity && <p className="text-red-500 text-sm mt-1">{errors.pickupCity.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  {...register('pickupPincode')}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.pickupPincode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                {errors.pickupPincode && <p className="text-red-500 text-sm mt-1">{errors.pickupPincode.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Garment Category</label>
                  <select
                    {...register('garmentCategory')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.garmentCategory ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  >
                    <option value="">Select</option>
                    <option value="Blouse">Blouse</option>
                    <option value="Designer Blouse">Designer Blouse</option>
                    <option value="Petticoat">Petticoat</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Suit">Suit</option>
                    <option value="Salwar Suit">Salwar Suit</option>
                    <option value="Kurti">Kurti</option>
                    <option value="Gown">Gown</option>
                    <option value="Bridal Wear">Bridal Wear</option>
                    <option value="Wedding Wear">Wedding Wear</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Alteration">Alteration</option>
                    <option value="Custom Designer Outfit">Custom Designer Outfit</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.garmentCategory && <p className="text-red-500 text-sm mt-1">{errors.garmentCategory.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    {...register('serviceType')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.serviceType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  >
                    <option value="">Select</option>
                    <option value="New Stitching">New Stitching</option>
                    <option value="Alteration">Alteration</option>
                    <option value="Restyling">Restyling</option>
                    <option value="Bridal Fitting">Bridal Fitting</option>
                  </select>
                  {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Pickup Option</label>
                <select
                  {...register('fabricPickupOption')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select</option>
                  <option value="Pickup from my address">Pickup from my address</option>
                  <option value="I will visit boutique">I will visit boutique</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Date</label>
                  <input
                    type="date"
                    {...register('preferredPickupDate')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.preferredPickupDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {errors.preferredPickupDate && <p className="text-red-500 text-sm mt-1">{errors.preferredPickupDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Time</label>
                  <select
                    {...register('preferredPickupTime')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.preferredPickupTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  >
                    <option value="">Select</option>
                    <option value="10:00 - 12:00">10:00 - 12:00</option>
                    <option value="12:00 - 14:00">12:00 - 14:00</option>
                    <option value="14:00 - 16:00">14:00 - 16:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                    <option value="18:00 - 20:00">18:00 - 20:00</option>
                  </select>
                  {errors.preferredPickupTime && <p className="text-red-500 text-sm mt-1">{errors.preferredPickupTime.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Option</label>
                <select
                  {...register('measurementOption')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select</option>
                  <option value="Use my old sample garment">Use my old sample garment</option>
                  <option value="Take fresh measurement">Take fresh measurement</option>
                  <option value="I will provide measurement">I will provide measurement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Reference (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                <textarea
                  {...register('specialInstructions')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-4 text-base font-semibold text-white hover:bg-pink-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
