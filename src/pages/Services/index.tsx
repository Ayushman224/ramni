import { SEO } from '../../components/ui/SEO'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { SITE_CONFIG } from '../../config/site'

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="services" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">What We Offer</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            From daily wear to bridal lehengas, we offer a wide range of tailoring services for every occasion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONFIG.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}
