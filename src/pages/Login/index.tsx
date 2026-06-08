import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SEO } from '../../components/ui/SEO'
import { LoginFormSchema } from '../../lib/validations'
import { useAuth } from '../../context/AuthContext'

type LoginFormInputs = z.infer<typeof LoginFormSchema>

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit = (data: LoginFormInputs) => {
    const savedUser = localStorage.getItem('boutique_user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      if ((user.phone === data.loginId || user.email === data.loginId || user.name === data.loginId) && user.password === data.password) {
        login(user)
        navigate('/')
      } else {
        setError('Invalid credentials')
      }
    } else {
      setError('No account found, please sign up first')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <SEO pageKey="home" />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your {SITE_CONFIG.businessName} account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone / Email / Name</label>
            <input
              type="text"
              {...register('loginId')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.loginId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.loginId && <p className="text-red-500 text-sm mt-1">{errors.loginId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-600 font-semibold hover:text-pink-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

// Import SITE_CONFIG for name
import { SITE_CONFIG } from '../../config/site'
