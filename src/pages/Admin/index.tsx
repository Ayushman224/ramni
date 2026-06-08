import { useState } from 'react'
import { SEO } from '../../components/ui/SEO'
import { useBookings } from '../../context/BookingContext'
import { useReviews } from '../../context/ReviewContext'
import { SITE_CONFIG } from '../../config/site'
import { CartItem } from '../../types'

type Tab = 'bookings' | 'reviews' | 'pricing'

const getItemName = (item: CartItem) => {
  if ('name' in item.item) {
    return item.item.name
  }
  return item.item.title
}

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('bookings')
  const { bookings, updateBookingStatus } = useBookings()
  const { pendingReviews, approvedReviews, updateReviewStatus } = useReviews()

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <SEO title="Admin Panel" />
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-6">
            {(['bookings', 'reviews', 'pricing'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Booking ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                          No bookings yet
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking: any) => (
                        <tr key={booking.id}>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">{booking.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {booking.customer?.fullName || booking.fullName} ({booking.customer?.phone || booking.phonePrimary})
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {booking.items ? (
                              <div className="space-y-1">
                                {booking.items.map((item: CartItem, idx: number) => (
                                  <div key={idx}>
                                    {getItemName(item)} x{item.quantity}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              booking.garmentCategory
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="New">New</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pickup Scheduled">Pickup Scheduled</option>
                              <option value="Cloth Picked Up">Cloth Picked Up</option>
                              <option value="Measurement Pending">Measurement Pending</option>
                              <option value="Stitching Started">Stitching Started</option>
                              <option value="Trial/Fitting">Trial/Fitting</option>
                              <option value="Ready for Delivery">Ready for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Pending Approval</h3>
                {pendingReviews.length === 0 ? (
                  <p className="text-gray-500">No pending reviews</p>
                ) : (
                  <div className="space-y-4">
                    {pendingReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{review.customerName}</p>
                            <p className="text-sm text-gray-500">{review.serviceUsed}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateReviewStatus(review.id, 'Approved')}
                              className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateReviewStatus(review.id, 'Rejected')}
                              className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Approved Reviews</h3>
                {approvedReviews.length === 0 ? (
                  <p className="text-gray-500">No approved reviews yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {approvedReviews.map((review, idx) => (
                      <div key={review.id || idx} className="border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-gray-900">{review.customerName}</p>
                        <p className="text-sm text-gray-500">{review.serviceUsed}</p>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Management</h2>
              <p className="text-gray-500">Pricing management placeholder (will be implemented with backend)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
