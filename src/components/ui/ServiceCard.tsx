import { Service } from '../../types'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { Heart, Plus } from 'lucide-react'

type ServiceCardProps = {
  service: Service
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = () => {
    addToCart(service, 'service')
  }

  const handleBookNow = () => {
    addToCart(service, 'service')
    navigate('/checkout')
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id)
    } else {
      addToWishlist(service)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow relative">
      <button
        onClick={handleToggleWishlist}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
      >
        <Heart size={20} fill={isInWishlist(service.id) ? "#db2777" : "none"} color={isInWishlist(service.id) ? "#db2777" : "#6b7280"} />
      </button>
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-pink-600">{service.category}</span>
        <h3 className="mt-2 text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="text-xl font-bold text-gray-900">From ₹{service.startingPrice}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add to Order
            </button>
            <button
              onClick={handleBookNow}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
