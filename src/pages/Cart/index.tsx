import { Link, useNavigate } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { useCart } from '../../context/CartContext'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem } from '../../types'

const getCartItemName = (item: CartItem) => {
  if ('name' in item.item) {
    return item.item.name
  }
  return item.item.title
}

export const CartPage = () => {
  const { cartItems, totalItems, updateCartItem, removeFromCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <SEO title="Cart - Stitchly" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title="Your Cart - Stitchly" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Your Order</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Cart</h1>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <p className="text-xl font-semibold text-gray-900 mb-4">Total Items: {totalItems}</p>
            <div className="space-y-4">
              {cartItems.map((cartItem) => (
                <div key={cartItem.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 border-gray-100">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {getCartItemName(cartItem)} x {cartItem.quantity}
                    </h4>
                    <p className="text-sm text-gray-500 capitalize">{cartItem.type}</p>
                    {cartItem.notes && (
                      <p className="text-xs text-gray-600 mt-1">Notes: {cartItem.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartItem(cartItem.id, { quantity: Math.max(1, cartItem.quantity - 1) })}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateCartItem(cartItem.id, { quantity: cartItem.quantity + 1 })}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:border-pink-300 transition-colors"
            >
              Add More Items
            </Link>
            <button
              onClick={() => navigate('/checkout')}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
            >
              Proceed to Pickup Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
