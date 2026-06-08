import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SEO } from '../../components/ui/SEO'
import { SignupFormSchema } from '../../lib/validations'
import { SITE_CONFIG } from '../../config/site'
import { useAuth } from '../../context/AuthContext'

type SignupFormInputs = z.infer<typeof SignupFormSchema>

export const SignupPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      city: '',
      pincode: '',
    },
  })

  const onSubmit = (data: SignupFormInputs) => {
    const userData = {
      name: data.fullName,
      phone: data.phone,
      phoneAlt: data.phoneAlt,
      email: data.email,
      address: data.address,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      password: data.password,
    }
    login(userData)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">Your {SITE_CONFIG.businessName} account has been created successfully.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <SEO pageKey="home" />
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to {SITE_CONFIG.businessName} and book tailoring services</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Number (Optional)</label>
              <input
                type="tel"
                {...register('phoneAlt')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phoneAlt ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.phoneAlt && <p className="text-red-500 text-sm mt-1">{errors.phoneAlt.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
            <textarea
              {...register('address')}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State (Optional)</label>
              <input
                type="text"
                {...register('state')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                {...register('city')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              >
                <option value="">Select City</option>
                {SITE_CONFIG.serviceCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                {...register('pincode')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register('password')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 font-semibold hover:text-pink-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
