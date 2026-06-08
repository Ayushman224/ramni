import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '../../config/site'
import { Phone, Mail, MapPin } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">{SITE_CONFIG.businessName}</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">{SITE_CONFIG.footerDescription}</p>
            <div className="flex items-center gap-3">
              {SITE_CONFIG.socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                >
                  {link.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {SITE_CONFIG.routeLinks.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <MapPin size={18} className="text-pink-400" />
                <span>{SITE_CONFIG.serviceArea}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-pink-400" />
                <a href={SITE_CONFIG.getPhoneHref()} className="hover:text-white">{SITE_CONFIG.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-pink-400" />
                <a href={SITE_CONFIG.getEmailHref()} className="hover:text-white">{SITE_CONFIG.email}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
