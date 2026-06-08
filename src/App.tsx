import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/common/WhatsAppButton'
import { HomePage } from './pages/Home'
import { ServicesPage } from './pages/Services'
import { GalleryPage } from './pages/Gallery'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { AdminPage } from './pages/Admin'
import { SearchPage } from './pages/Search'
import { WishlistPage } from './pages/Wishlist'
import { MyOrdersPage } from './pages/MyOrders'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
