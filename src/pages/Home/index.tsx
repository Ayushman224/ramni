import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { SITE_CONFIG } from '../../config/site'
import { useReviews } from '../../context/ReviewContext'

export const HomePage = () => {
  const { approvedReviews } = useReviews()

  return (
    <div className="min-h-screen">
      <SEO pageKey="home" />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-cream-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Custom Tailoring
                <br />
                <span className="text-pink-600">Delivered to Your Doorstep</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto md:mx-0">
                Book tailoring online, schedule cloth pickup, and get beautifully stitched outfits delivered to your home.
              </p>
              <p className="font-serif text-xl text-pink-700 italic mb-8">
                {SITE_CONFIG.quotes["Your fabric, our craftsmanship"]}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link
                  to="/book-order"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Book Now
                </Link>
                <Link
                  to={SITE_CONFIG.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold text-gray-800 bg-white border-2 border-gray-200 hover:border-pink-300 transition-all"
                >
                  WhatsApp Help Desk
                </Link>
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold text-gray-800 bg-white border-2 border-gray-200 hover:border-pink-300 transition-all"
                >
                  View Designs
                </Link>
              </div>
              
              <div className="mt-10 flex items-center justify-center md:justify-start gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">🏙️</div>
                  <span>Multi-City Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">🚚</div>
                  <span>Pickup & Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">✓</div>
                  <span>Verified Tailors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">📏</div>
                  <span>Custom Fitting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">💬</div>
                  <span>WhatsApp Support</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
                alt="Custom Tailoring"
                className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Our Services</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Expert Stitching for Every Occasion</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONFIG.services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
            >
              View All Services
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Happy Customers</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.slice(0, 3).map((review, index) => (
              <TestimonialCard key={review.id || index} review={review} />
            ))}
            {SITE_CONFIG.defaultTestimonials.slice(0, 3 - Math.min(approvedReviews.length, 3)).map((testimonial, index) => (
              <TestimonialCard key={`default-${index}`} review={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Stitched?</h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Book your first order today and experience the convenience of doorstep pickup and delivery with perfect fitting.
          </p>
          <Link
            to="/book-order"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold bg-white text-pink-600 hover:bg-gray-100 shadow-lg transition-all"
          >
            Book Your First Order
          </Link>
        </div>
      </section>
    </div>
  )
}
