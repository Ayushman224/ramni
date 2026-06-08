import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { useWishlist } from '../../context/WishlistContext'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { GalleryCard } from '../../components/ui/GalleryCard'
import { Trash2 } from 'lucide-react'

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title="My Wishlist - Stitchly" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">My Wishlist</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">My Saved Items</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={'id' in item ? item.id : (item as any).title} className="relative">
                <button
                  onClick={() => 'id' in item && removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
                {'startingPrice' in item ? (
                  <ServiceCard service={item} />
                ) : (
                  <GalleryCard item={item} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
