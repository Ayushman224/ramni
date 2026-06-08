import { GalleryItem } from '../../types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { Heart, Plus } from 'lucide-react'

type GalleryCardProps = {
  item: GalleryItem
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = () => {
    addToCart(item, 'design')
  }

  const handleBookSimilar = () => {
    addToCart(item, 'design')
    navigate('/checkout')
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  return (
    <>
      <div className="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all relative">
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart size={20} fill={isInWishlist(item.id) ? "#db2777" : "none"} color={isInWishlist(item.id) ? "#db2777" : "#6b7280"} />
        </button>
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <img
            src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80`}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 bg-white">
          <span className="text-xs uppercase text-pink-600 font-medium">{item.category}</span>
          <h4 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h4>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
            >
              <Plus size={14} className="mr-1" />
              Add to Order
            </button>
            <button
              onClick={handleBookSimilar}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            >
              Book Similar Design
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-4">
              <button
                onClick={handleToggleWishlist}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <Heart size={24} fill={isInWishlist(item.id) ? "#db2777" : "none"} color={isInWishlist(item.id) ? "#db2777" : "#6b7280"} />
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <div className="p-6 pt-0">
              <img
                src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80`}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <span className="text-xs uppercase text-pink-600 font-medium">{item.category}</span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">{item.title}</h2>
              <p className="text-gray-600 mt-3">{item.description}</p>
              <p className="mt-4 text-sm text-gray-500 italic">"{item.review}"</p>
              <p className="text-xs text-gray-400 mt-2">{item.style}</p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  <Plus size={18} className="mr-1" />
                  Add to Order
                </button>
                <button
                  onClick={handleBookSimilar}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  Book Similar Design
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
