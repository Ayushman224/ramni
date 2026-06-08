import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { useBookings } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'
import { CartItem } from '../../types'
import { Calendar, Clock, MapPin, Package } from 'lucide-react'

const getItemName = (item: CartItem) => {
  if ('name' in item.item) {
    return item.item.name
  }
  return item.item.title
}

const STATUS_STYLES: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Confirmed': 'bg-yellow-100 text-yellow-800',
  'Pickup Scheduled': 'bg-purple-100 text-purple-800',
  'Cloth Picked Up': 'bg-indigo-100 text-indigo-800',
  'Measurement Pending': 'bg-orange-100 text-orange-800',
  'Stitching Started': 'bg-pink-100 text-pink-800',
  'Trial/Fitting': 'bg-cyan-100 text-cyan-800',
  'Ready for Delivery': 'bg-emerald-100 text-emerald-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
}

export const MyOrdersPage = () => {
  const { bookings } = useBookings()
  const { currentUser } = useAuth()

  // Simple filter to show only orders that are likely for this user
  const userOrders = bookings.filter(
    b => !currentUser || 
      b.customer?.email === currentUser.email || 
      b.customer?.phone === currentUser.phone ||
      b.customer?.fullName === currentUser.name
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title="My Orders - Stitchly" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">My Orders</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Track Your Orders</h1>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <Package size={80} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet!</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start exploring our designs and services.</p>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${STATUS_STYLES[order.status] || STATUS_STYLES['New']}`}>
                    {order.status}
                  </span>
                </div>

                <div className="px-6 py-4 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Package size={16} className="mr-2" />
                    Items in Order
                  </h4>
                  <ul className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{getItemName(item)}</span>
                          <span className="text-gray-500">×{item.quantity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {order.pickupDate && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Pickup Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.pickupDate && (
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          {new Date(order.pickupDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                      {order.pickupTime && (
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock size={14} className="mr-2 text-gray-400" />
                          {order.pickupTime}
                        </p>
                      )}
                      {order.address && (
                        <p className="text-sm text-gray-600 flex items-start sm:col-span-2">
                          <MapPin size={14} className="mr-2 text-gray-400 mt-1" />
                          {order.address.fullAddress}, {order.address.city}, {order.address.state} - {order.address.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
