import { Customer } from '../types'

export const AuthService = {
  async login(identifier: string, password: string): Promise<Customer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedUser = localStorage.getItem('boutique_user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          if ((user.phone === identifier || user.email === identifier || user.name === identifier) && user.password === password) {
            resolve(user)
          } else {
            reject(new Error('Invalid credentials'))
          }
        } else {
          reject(new Error('No account found'))
        }
      }, 500)
    })
  },

  async signup(userData: Customer): Promise<Customer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('boutique_user', JSON.stringify(userData))
        resolve(userData)
      }, 500)
    })
  },

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('boutique_user')
        resolve()
      }, 200)
    })
  },
}
