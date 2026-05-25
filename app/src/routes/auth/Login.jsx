import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import { Bot, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { authApi } from '../../api/auth'
import { useAuthStore } from '../../store/authStore'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login() {
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
      const { user, token } = await authApi.login(data)
      login(user, token)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message || 'Login failed. Please try again.')
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
      {/* Background orbs */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

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
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-6">Sign in to your restaurant dashboard</p>

          {/* Google OAuth */}
          <div className="mb-4">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => setError('Google sign-in failed. Try email instead.')}
              theme="filled_black"
              shape="rectangular"
              width="100%"
              text="continue_with"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-gray-500 shrink-0">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@restaurant.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
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
              <div className="text-right mt-0.5">
                <Link to="/forgot-password" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <Button type="submit" loading={isSubmitting} className="w-full mt-1">
              Sign in
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
            Start free trial
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
