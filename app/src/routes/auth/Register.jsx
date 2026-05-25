import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import { Bot, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { authApi } from '../../api/auth'
import { useAuthStore } from '../../store/authStore'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  restaurantName: z.string().min(2, 'Restaurant name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
})

const perks = ['14-day free trial', 'No credit card required', 'Cancel anytime']

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data) {
    setError('')
    try {
      const { user, token } = await authApi.register(data)
      login(user, token)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message || 'Registration failed. Please try again.')
    }
  }

  async function onGoogleSuccess(response) {
    setError('')
    try {
      const { user, token } = await authApi.googleAuth(response.credential)
      login(user, token)
      navigate('/dashboard')
    } catch (e) {
      setError('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[420px]"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AIWaiter</span>
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Start your free trial</h1>

          {/* Perks */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6 mt-2">
            {perks.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs text-gray-400">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                {p}
              </span>
            ))}
          </div>

          {/* Google OAuth */}
          <div className="mb-4">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => setError('Google sign-up failed. Try email instead.')}
              theme="filled_black"
              shape="rectangular"
              width="100%"
              text="signup_with"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-gray-500 shrink-0">or sign up with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 gap-3.5">
              <Input
                label="Your name"
                placeholder="Rajesh Kumar"
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="Restaurant name"
                placeholder="The Golden Spoon"
                error={errors.restaurantName?.message}
                {...register('restaurantName')}
              />
              <Input
                label="Work email"
                type="email"
                placeholder="you@restaurant.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 chars, 1 uppercase, 1 number"
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all duration-150 ${errors.password ? 'border-red-500/50' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <Button type="submit" loading={isSubmitting} className="w-full mt-1">
              Create account
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-center text-xs text-gray-600 mt-1">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
