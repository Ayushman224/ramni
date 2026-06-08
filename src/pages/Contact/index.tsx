import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../../components/ui/SEO'
import { SITE_CONFIG } from '../../config/site'
import { Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'

export const ContactPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your message has been received. Our team will contact you shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO pageKey="contact" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-600 font-semibold tracking-wider uppercase text-sm">Get in Touch</span>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={SITE_CONFIG.getPhoneHref()} className="text-lg font-medium text-gray-900 hover:text-pink-600">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={SITE_CONFIG.getEmailHref()} className="text-lg font-medium text-gray-900 hover:text-pink-600">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Locations</p>
                  <p className="text-lg font-medium text-gray-900">{SITE_CONFIG.serviceArea}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opening Hours</p>
                  <p className="text-lg font-medium text-gray-900">{SITE_CONFIG.openingHours}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <Link
                to={SITE_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
              >
                WhatsApp Help Desk
              </Link>
              <a
                href={SITE_CONFIG.getPhoneHref()}
                className="w-full inline-flex items-center justify-center rounded-full bg-gray-800 px-6 py-3 text-base font-semibold text-white hover:bg-gray-900 transition-colors"
              >
                Call Now
              </a>
              <Link
                to="/book-order"
                className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
              >
                Book Stitching Order
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {SITE_CONFIG.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                  >
                    {social.name.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select</option>
                  <option value="Booking Inquiry">Booking Inquiry</option>
                  <option value="Pricing Inquiry">Pricing Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-4 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
