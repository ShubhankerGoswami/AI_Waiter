import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowRight, Store, Link2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { onboardingApi } from '../../api/onboarding'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import FileUpload from '../../components/ui/FileUpload'
import { STATES, getCities } from '../../lib/indianLocations'

const RESTAURANT_TYPES = [
  { value: 'fast_food', label: 'Fast Food' },
  { value: 'casual_dining', label: 'Casual Dining' },
  { value: 'fine_dining', label: 'Fine Dining' },
  { value: 'cafe', label: 'Café / Coffee Shop' },
  { value: 'bakery', label: 'Bakery & Desserts' },
  { value: 'dhaba', label: 'Dhaba' },
  { value: 'cloud_kitchen', label: 'Cloud Kitchen' },
  { value: 'bar_grill', label: 'Bar & Grill' },
  { value: 'buffet', label: 'Buffet' },
  { value: 'street_food', label: 'Street Food / Quick Bites' },
]

const schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  restaurant_name: z.string().min(2, 'Restaurant name is required'),
  restaurant_type: z.string().min(1, 'Select a restaurant type'),
  location_state: z.string().min(1, 'Select a state'),
  location_city: z.string().min(1, 'Select a city'),
  is_chain: z.boolean(),
})

export default function Step1({ onNext }) {
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)
  const [logo, setLogo] = useState(null)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: user?.full_name || '',
      restaurant_name: '',
      restaurant_type: '',
      location_state: '',
      location_city: '',
      is_chain: false,
    },
  })

  const selectedState = watch('location_state')
  const cities = getCities(selectedState)
  const isChain = watch('is_chain')

  async function onSubmit(data) {
    setError('')
    try {
      await onboardingApi.step1({ ...data, logo })
      updateUser({ full_name: data.full_name })
      onNext()
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-8"
    >
      <h2 className="text-xl font-bold text-white mb-1">Set up your restaurant</h2>
      <p className="text-gray-400 text-sm mb-6">Tell us about your business to personalize your experience.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full name */}
        <Input
          label="Your full name"
          placeholder="Rajesh Kumar"
          error={errors.full_name?.message}
          {...register('full_name')}
        />

        {/* Restaurant name */}
        <Input
          label="Restaurant name"
          placeholder="The Golden Spoon"
          error={errors.restaurant_name?.message}
          {...register('restaurant_name')}
        />

        {/* Restaurant type */}
        <Select
          label="Restaurant type"
          placeholder="Select type..."
          error={errors.restaurant_type?.message}
          {...register('restaurant_type')}
        >
          {RESTAURANT_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-[#0f1117] text-gray-100">
              {t.label}
            </option>
          ))}
        </Select>

        {/* Logo upload */}
        <FileUpload
          label="Restaurant logo (optional)"
          accept="image/jpeg,image/png"
          preview
          hint="JPG or PNG · Max 10 MB"
          onChange={setLogo}
        />

        {/* Location */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="State"
            placeholder="Select state..."
            error={errors.location_state?.message}
            {...register('location_state')}
          >
            {STATES.map((s) => (
              <option key={s} value={s} className="bg-[#0f1117] text-gray-100">
                {s}
              </option>
            ))}
          </Select>

          <Select
            label="City"
            placeholder="Select city..."
            error={errors.location_city?.message}
            disabled={!selectedState}
            {...register('location_city')}
          >
            {cities.map((c) => (
              <option key={c} value={c} className="bg-[#0f1117] text-gray-100">
                {c}
              </option>
            ))}
          </Select>
        </div>

        {/* Chain or standalone toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Restaurant structure</label>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="is_chain"
              control={control}
              render={({ field }) => (
                <>
                  <button
                    type="button"
                    onClick={() => field.onChange(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      !field.value
                        ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                        : 'border-white/10 bg-white/3 text-gray-400 hover:bg-white/6'
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0" />
                    Standalone
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(true)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      field.value
                        ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                        : 'border-white/10 bg-white/3 text-gray-400 hover:bg-white/6'
                    }`}
                  >
                    <Link2 className="w-4 h-4 shrink-0" />
                    Chain / Group
                  </button>
                </>
              )}
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <Button type="submit" loading={isSubmitting} className="w-full mt-1">
          Continue to Menu Upload
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </motion.div>
  )
}
