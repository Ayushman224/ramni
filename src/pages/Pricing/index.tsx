import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { PricingCard } from '../../components/ui/PricingCard'
import { SITE_CONFIG } from '../../config/site'

export const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="pricing" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Transparent Pricing</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Our Pricing</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Get an estimate for your custom stitching. For exact pricing, please contact us with your requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SITE_CONFIG.pricing.map((item, index) => (
            <PricingCard key={index} item={item} />
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 shadow-sm border border-pink-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Free pickup on your first stitching order in {SITE_CONFIG.serviceArea}.</h3>
          <p className="text-gray-600 mb-6">
            For exact pricing, please share your fabric details and design references with our team.
          </p>
          <Link
            to="/book-order"
            className="inline-flex items-center justify-center rounded-full bg-pink-600 px-8 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
