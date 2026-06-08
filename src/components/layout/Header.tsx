import { Link, useLocation } from 'react-router-dom'
import { SITE_CONFIG } from '../../config/site'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 py-2 text-center text-sm text-gray-700">
        {SITE_CONFIG.offerBanner}
      </div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-pink-700">{SITE_CONFIG.businessName}</span>
            <span className="text-xs text-gray-500">{SITE_CONFIG.brandTagline}</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {SITE_CONFIG.routeLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                  location.pathname === link.path ? 'text-pink-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <Link
                to="/profile"
                className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
              >
                Hi, {currentUser.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
              >
                Login / Sign Up
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-4">
          <nav className="flex flex-col gap-3">
            {SITE_CONFIG.routeLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-gray-50 ${
                  location.pathname === link.path ? 'text-pink-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-full bg-pink-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Hi, {currentUser.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-full bg-pink-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Login / Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
