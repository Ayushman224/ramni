import { useState } from 'react'
import { SEO } from '../../components/ui/SEO'
import { GalleryCard } from '../../components/ui/GalleryCard'
import { SITE_CONFIG } from '../../config/site'

const filterOptions = ['All', 'Blouse', 'Lehenga', 'Suit', 'Bridal', 'Party Wear', 'Custom']

export const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredDesigns = activeFilter === 'All' 
    ? SITE_CONFIG.designs 
    : SITE_CONFIG.designs.filter(item => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="designs" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Design Gallery</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Our Work</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Browse through our design portfolio for inspiration.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-pink-600 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
