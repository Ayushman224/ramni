import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Customer } from '../types'

type AuthContextType = {
  currentUser: Customer | null
  login: (user: Customer) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Customer | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('boutique_user')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage', error)
      }
    }
  }, [])

  const login = (user: Customer) => {
    localStorage.setItem('boutique_user', JSON.stringify(user))
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem('boutique_user')
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
