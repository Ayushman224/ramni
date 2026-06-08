import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BookingProvider } from './context/BookingContext.tsx'
import { ReviewProvider } from './context/ReviewContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <ReviewProvider>
              <App />
            </ReviewProvider>
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)