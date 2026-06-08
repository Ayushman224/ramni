import { SEO } from '../../components/ui/SEO'
import { FAQSection } from '../../components/ui/FAQSection'
import { SITE_CONFIG } from '../../config/site'
import { Link } from 'react-router-dom'

export const HelpDeskPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="help" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Help & Support</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Help Desk</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our tailoring services and get the support you need.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">Quick Help Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_CONFIG.helpTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-pink-200 transition-colors cursor-pointer">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
          >
            WhatsApp Help Desk
          </a>
          <a
            href={SITE_CONFIG.getPhoneHref()}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gray-800 px-6 py-3 text-base font-semibold text-white hover:bg-gray-900 transition-colors"
          >
            Call Now
          </a>
          <Link
            to="/book-order"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
          >
            Book Stitching Order
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <FAQSection faqs={SITE_CONFIG.faqs} />
          
          <div className="mt-12 text-center bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/support"
                className="inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
              >
                Contact Support
              </Link>
              <a
                href={SITE_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
