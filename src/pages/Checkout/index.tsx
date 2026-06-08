import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useBookings } from '../../context/BookingContext'
import { SITE_CONFIG } from '../../config/site'
import { CartItem, CustomerAddress } from '../../types'

const getCartItemName = (item: CartItem) => {
  if ('name' in item.item) {
    return item.item.name
  }
  return item.item.title
}

export const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart()
  const { currentUser, addAddress } = useAuth()
  const { addBooking } = useBookings()
  const navigate = useNavigate()

  const [showAddAddress, setShowAddAddress] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [pickupOption, setPickupOption] = useState('Pickup from my address')
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || ''
  })
  const [newAddress, setNewAddress] = useState({
    label: 'Home' as 'Home' | 'Office' | 'Other',
    fullAddress: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  })

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  const handlePlaceOrder = () => {
    if (!selectedAddressId && !showAddAddress) {
      alert('Please select an address')
      return
    }
    
    let address: CustomerAddress | null = null
    if (showAddAddress) {
      address = {
        id: `addr-${Date.now()}`,
        label: newAddress.label,
        fullAddress: newAddress.fullAddress,
        landmark: newAddress.landmark,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode
      }
      if (currentUser) {
        addAddress(address)
      }
    } else if (selectedAddressId) {
      address = currentUser?.addresses.find(a => a.id === selectedAddressId) || null
    }
    
    if (!address) return

    const order = {
      id: `ST-${Date.now().toString().slice(-6)}`,
      customer: currentUser || {
        id: `user-${Date.now()}`,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        addresses: [address]
      },
      pickupDate,
      pickupTime,
      pickupOption,
      address,
      items: cartItems,
      status: 'New' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    addBooking(order)
    clearCart()
    navigate('/')
    alert('Your order has been placed! We will contact you soon.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title="Checkout - Stitchly" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Confirm Your Order</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Pickup Address</h2>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  {showAddAddress ? 'Select Existing' : '+ Add New Address'}
                </button>
              </div>

              {!showAddAddress && currentUser?.addresses && currentUser.addresses.length > 0 && (
                <div className="space-y-3">
                  {currentUser.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                        selectedAddressId === addr.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs uppercase font-semibold">{addr.label}</span>
                      </div>
                      <p className="text-sm text-gray-900">{addr.fullAddress}</p>
                      <p className="text-xs text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                  ))}
                </div>
              )}

              {showAddAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <select
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({...newAddress, label: e.target.value as any})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select City</option>
                      {SITE_CONFIG.serviceCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <textarea
                      rows={2}
                      value={newAddress.fullAddress}
                      onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <input
                      value={newAddress.landmark}
                      onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {!showAddAddress && (!currentUser?.addresses || currentUser.addresses.length === 0) && (
                <p className="text-gray-500">No saved addresses. Add a new address.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pickup Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Option</label>
                  <select
                    value={pickupOption}
                    onChange={(e) => setPickupOption(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Pickup from my address">Pickup from my address</option>
                    <option value="I will visit boutique">I will visit boutique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 - 12:00">10:00 - 12:00</option>
                    <option value="12:00 - 14:00">12:00 - 14:00</option>
                    <option value="14:00 - 16:00">14:00 - 16:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                    <option value="18:00 - 20:00">18:00 - 20:00</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Items</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3 border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{getCartItemName(item)} x {item.quantity}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>
                    <span className="text-sm text-gray-700">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="font-semibold text-gray-900">Total Items</p>
                <p className="text-lg font-bold text-pink-700">{cartItems.reduce((sum, i) => sum + i.quantity, 0)}</p>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-4 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
