import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SITE_CONFIG } from '../../config/site'
import { useState } from 'react'
import { Menu, X, ShoppingBag, Search, User, LogOut, MapPin, ClipboardList, Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const newNavLinks = [
  { id: "home", label: "Home", path: "/" },
  { id: "designs", label: "Designs", path: "/gallery" },
  { id: "services", label: "Services", path: "/services" },
  { id: "track-order", label: "Track Order", path: "/my-orders" },
];

export const Header = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 py-2 text-center text-sm text-gray-700">
        {SITE_CONFIG.offerBanner}
      </div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex flex-col flex-shrink-0">
            <span className="font-serif text-2xl font-bold text-pink-700">{SITE_CONFIG.businessName}</span>
            <span className="text-xs text-gray-500">{SITE_CONFIG.brandTagline}</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
            {newNavLinks.map((link) => (
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
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for blouse, lehenga, kurti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </form>
          
          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link to="/cart" className="relative">
              <ShoppingBag size={24} className="text-gray-700 hover:text-pink-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-pink-600 text-white text-xs rounded-full w-5 h-5">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="relative">
              <Heart size={24} className="text-gray-700 hover:text-pink-600" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-pink-600 text-white text-xs rounded-full w-5 h-5">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
                >
                  <User size={20} className="text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.name?.split(' ')[0] || 'Profile'}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <Link
                      to="/my-orders"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ClipboardList size={18} />
                      My Orders
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={18} />
                      Profile
                    </Link>
                    <Link
                      to="/profile/addresses"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MapPin size={18} />
                      Saved Addresses
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
          
          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingBag size={20} className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-pink-600 text-white text-xs rounded-full w-4 h-4">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="relative">
              <Heart size={20} className="text-gray-700" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-pink-600 text-white text-xs rounded-full w-4 h-4">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for blouse, lehenga, kurti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-3">
            {newNavLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-gray-100 ${
                  location.pathname === link.path ? 'text-pink-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 border-b border-gray-100 text-gray-600"
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 border-b border-gray-100 text-gray-600"
                >
                  Profile
                </Link>
                <Link
                  to="/profile/addresses"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 border-b border-gray-100 text-gray-600"
                >
                  Saved Addresses
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                  className="text-sm font-medium py-2 text-red-600 text-left"
                >
                  Logout
                </button>
              </>
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
