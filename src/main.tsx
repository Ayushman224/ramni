import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BookingProvider } from './context/BookingContext.tsx'
import { ReviewProvider } from './context/ReviewContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { WishlistProvider } from './context/WishlistContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BookingProvider>
                <ReviewProvider>
                  <App />
                </ReviewProvider>
              </BookingProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)