import { useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SEO } from '../../components/ui/SEO'
import { SITE_CONFIG } from '../../config/site'
import { Service, GalleryItem } from '../../types'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { GalleryCard } from '../../components/ui/GalleryCard'

type SearchResultItem = Service | GalleryItem;

export const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      const normalizedQuery = query.toLowerCase()

      const serviceResults = SITE_CONFIG.services.filter(
        (service) =>
          service.name.toLowerCase().includes(normalizedQuery) ||
          service.description.toLowerCase().includes(normalizedQuery) ||
          service.category.toLowerCase().includes(normalizedQuery)
      )

      const designResults = SITE_CONFIG.designs.filter(
        (design) =>
          design.title.toLowerCase().includes(normalizedQuery) ||
          design.description.toLowerCase().includes(normalizedQuery) ||
          design.category.toLowerCase().includes(normalizedQuery) ||
          design.style.toLowerCase().includes(normalizedQuery)
      )

      setResults([...serviceResults, ...designResults])
    } else {
      setResults([])
    }
    setLoading(false)
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title={`Search: ${query} - Stitchly`} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Search Results</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">
            {query ? `"${query}"` : 'All Items'}
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item) => (
              <div key={'id' in item ? item.id : (item as any).title}>
                {'startingPrice' in item ? (
                  <ServiceCard service={item} />
                ) : (
                  <GalleryCard item={item} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No results found for "{query}"</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
