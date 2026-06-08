import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Service, GalleryItem } from '../types'

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Service | GalleryItem, type: 'service' | 'design') => string
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('stitchly-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Failed to load cart from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('stitchly-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Service | GalleryItem, type: 'service' | 'design'): string => {
    const id = `cart-${Date.now()}`
    const newItem: CartItem = {
      id,
      type,
      item,
      quantity: 1,
    }
    setCartItems(prev => [...prev, newItem])
    return id
  }

  const updateCartItem = (itemId: string, updates: Partial<CartItem>) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    )
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateCartItem, 
      removeFromCart, 
      clearCart,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
