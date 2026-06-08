import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/common/WhatsAppButton'
import { HomePage } from './pages/Home'
import { ServicesPage } from './pages/Services'
import { PricingPage } from './pages/Pricing'
import { GalleryPage } from './pages/Gallery'
import { ReviewsPage } from './pages/Reviews'
import { BookOrderPage } from './pages/BookOrder'
import { HelpDeskPage } from './pages/HelpDesk'
import { SupportPage } from './pages/Support'
import { ContactPage } from './pages/Contact'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { AdminPage } from './pages/Admin'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/book-order" element={<BookOrderPage />} />
          <Route path="/help-desk" element={<HelpDeskPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
