import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { GalleryCard } from '../../components/ui/GalleryCard'
import { FAQSection } from '../../components/ui/FAQSection'
import { SITE_CONFIG } from '../../config/site'
import { useReviews } from '../../context/ReviewContext'
import { CheckCircle2, Clock, Package, Truck, Scissors, Ruler, Heart, MessageSquare } from 'lucide-react'

export const HomePage = () => {
  const { approvedReviews } = useReviews()

  const popularCategories = [
    { name: 'Blouses', icon: '👕', count: 24 },
    { name: 'Salwar Suits', icon: '👗', count: 18 },
    { name: 'Lehengas', icon: '💃', count: 12 },
    { name: 'Kurti', icon: '👚', count: 32 },
    { name: 'Gowns', icon: '👗', count: 8 },
    { name: 'Bridal', icon: '💍', count: 6 },
  ]

  const howItWorksSteps = [
    {
      icon: <Heart size={32} />,
      title: 'Choose Design',
      description: 'Browse our designs & add to cart'
    },
    {
      icon: <Ruler size={32} />,
      title: 'Provide Measurements',
      description: 'Choose your preferred measurement method'
    },
    {
      icon: <Truck size={32} />,
      title: 'Schedule Pickup',
      description: 'Pick a convenient pickup date & time'
    },
    {
      icon: <Scissors size={32} />,
      title: 'Receive Perfect Outfit',
      description: 'Get your perfectly stitched outfits delivered'
    },
  ]

  return (
    <div className="min-h-screen">
      <SEO pageKey="home" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16">
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
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Browse Services
                </Link>
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold text-gray-800 bg-white border-2 border-gray-200 hover:border-pink-300 transition-all"
                >
                  View Designs
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-pink-600" />
                  <span>Multi-City Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={20} className="text-pink-600" />
                  <span>Pickup & Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-pink-600" />
                  <span>Custom Fitting</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c86cdc7?w=800&auto=format&fit=crop&q=80"
                alt="Tailor taking measurements"
                className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Popular Categories</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">What Can We Stitch For You?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((cat, index) => (
              <Link to="/services" key={index} className="group text-center p-6 rounded-2xl border border-gray-100 hover:border-pink-200 bg-gray-50 hover:bg-pink-50 transition-all hover:-translate-y-2">
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.count} Designs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Featured Designs</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Our Best Sellers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONFIG.designs.slice(0, 6).map((design) => (
              <GalleryCard key={design.id} item={design} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
            >
              View All Designs
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">How It Works</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Stitching Made Simple</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {index + 1}. {step.title}
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
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
      <section className="py-16 bg-white">
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

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">FAQ</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Got questions or ready to book? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={SITE_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold bg-white text-pink-600 hover:bg-gray-100 shadow-lg transition-all"
            >
              <MessageSquare size={20} className="mr-2" />
              Chat on WhatsApp
            </Link>
            <a
              href={`tel:${SITE_CONFIG.internationalPhone}`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold bg-pink-700 text-white border border-white hover:bg-pink-600 transition-all"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
