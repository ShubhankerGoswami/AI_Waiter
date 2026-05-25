import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { onboardingApi } from '../../api/onboarding'
import FileUpload from '../../components/ui/FileUpload'
import Button from '../../components/ui/Button'

export default function Step2({ onBack }) {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const token = useAuthStore((s) => s.token)
  const [menuFile, setMenuFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function finish(skip = false) {
    setError('')
    setLoading(true)
    try {
      if (!skip && menuFile) {
        await onboardingApi.step2(menuFile)
      }
      const result = await onboardingApi.complete()
      // Update user in store with is_onboarded = true
      login(result.user, token)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-8"
    >
      <h2 className="text-xl font-bold text-white mb-1">Upload your menu</h2>
      <p className="text-gray-400 text-sm mb-6">
        Upload a JPG or PDF of your menu. Our AI will parse and digitise it automatically. You can always do this later.
      </p>

      <FileUpload
        label="Menu file"
        accept="image/jpeg,image/png,application/pdf"
        hint="JPG, PNG, or PDF · Max 10 MB"
        onChange={setMenuFile}
      />

      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <Button
          onClick={() => finish(false)}
          loading={loading}
          disabled={!menuFile}
          className="w-full"
        >
          Upload & Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => finish(true)}
          disabled={loading}
          className="w-full"
        >
          <SkipForward className="w-4 h-4" />
          Skip for now
        </Button>

        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mt-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to restaurant details
        </button>
      </div>
    </motion.div>
  )
}
