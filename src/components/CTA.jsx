import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, MapPin, Smartphone, Store, Sparkles, ChevronDown, Mail, Rocket } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

const SEED_COUNT = 63

const restaurantTypes = [
  'QSR / Fast Food',
  'Café / Bakery',
  'Fine Dining',
  'Casual Dining',
  'Cloud Kitchen',
  'Dhaba / Street Food',
  'Bar & Restaurant',
  'Other',
]

const intentOptions = [
  'Yes, definitely — sign me up',
  'Interested in a free demo',
  'Maybe later — tell me more',
  'Need more information first',
]

const initialForm = {
  name: '',
  restaurant: '',
  phone: '',
  email: '',
  city: '',
  type: '',
  intent: '',
}

function SelectField({ label, icon: Icon, value, onChange, options, placeholder, required = true }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-white/6 border border-white/12 text-white text-sm rounded-xl px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all placeholder-gray-600"
        >
          <option value="" disabled className="bg-[#0d0f17] text-gray-500">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#0d0f17] text-white">{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  )
}

function InputField({ label, icon: Icon, type = 'text', value, onChange, placeholder, required = true }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
        {!required && <span className="text-gray-600 normal-case font-normal tracking-normal">(optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-white/6 border border-white/12 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all placeholder-gray-600"
      />
    </div>
  )
}

export default function CTA() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(SEED_COUNT)
  const [loading, setLoading] = useState(false)
  const formStarted = useRef(false)

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && formStarted.current && !submitted) {
        track(EVENTS.WAITLIST_FORM_ABANDONED, { fields_filled: Object.values(form).filter(Boolean).length })
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [form, submitted])

  const set = (field) => (e) => {
    if (!formStarted.current) {
      formStarted.current = true
      track(EVENTS.WAITLIST_FORM_STARTED)
    }
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3reyFM-U5f5jB7DXeavntjued_WaB43PZqL56ZfnOvx8GpqBbP-DUQcVkIhngr8cX/exec'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(form),
      })
    } catch (_) {}

    track(EVENTS.WAITLIST_SUBMITTED, {
      city: form.city,
      restaurant_type: form.type,
      intent: form.intent,
      waitlist_position: count + 1,
    })
    formStarted.current = false
    setCount((c) => c + 1)
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-purple-500/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/12 rounded-full blur-3xl" />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-1 h-1 rounded-full bg-orange-400/40"
            style={{ left: `${10 + i * 8}%`, top: `${15 + (i % 3) * 25}%` }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/12 border border-orange-500/25 text-orange-400 text-xs font-semibold mb-5">
            <Rocket className="w-3.5 h-3.5" />
            Free Pilot Program — Limited Spots
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Launch AIWaiter In Your{' '}
            <span className="text-gradient">Restaurant</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Increase repeat customers, automate ordering, and grow restaurant revenue using AI. Apply for our free pilot — we'll personally reach out within 24 hours.
          </p>
        </motion.div>

        {/* Interest counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/4 border border-white/10">
            <div className="flex -space-x-2.5">
              {['bg-orange-400', 'bg-purple-400', 'bg-emerald-400', 'bg-blue-400', 'bg-pink-400'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#030712] flex items-center justify-center text-[10px] font-bold text-white`}>
                  {['R', 'S', 'A', 'M', 'K'][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                <motion.span key={count} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  {count}
                </motion.span>{' '}
                restaurant owners have applied
              </p>
              <p className="text-[11px] text-gray-500">across India — growing daily</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass border border-orange-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-8 py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Application Received! 🎉</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                  Thanks <span className="text-white font-semibold">{form.name}</span>! Our team will personally reach out to you on{' '}
                  <span className="text-orange-400 font-semibold">{form.phone ? `+91 ${form.phone}` : form.email}</span> within 24 hours to discuss your free pilot.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                  <Users className="w-4 h-4" />
                  You are #{count} on the pilot waitlist
                </div>
                <p className="text-xs text-gray-600 mt-6">
                  Know a fellow restaurant owner? Share this page with them.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="p-8"
              >
                {/* Required fields */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Required Information</p>
                <div className="grid sm:grid-cols-3 gap-5 mb-6">
                  <InputField
                    label="Your Name"
                    icon={Users}
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Rahul Sharma"
                  />
                  <InputField
                    label="Restaurant Name"
                    icon={Store}
                    value={form.restaurant}
                    onChange={set('restaurant')}
                    placeholder="Spice Garden"
                  />
                  <InputField
                    label="Phone Number"
                    icon={Smartphone}
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="98765 43210"
                  />
                </div>

                {/* Optional fields */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Optional Details</p>
                <div className="grid sm:grid-cols-3 gap-5 mb-6">
                  <InputField
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="rahul@spicegarden.com"
                    required={false}
                  />
                  <InputField
                    label="City"
                    icon={MapPin}
                    value={form.city}
                    onChange={set('city')}
                    placeholder="Mumbai"
                    required={false}
                  />
                  <SelectField
                    label="Restaurant Type"
                    icon={Store}
                    value={form.type}
                    onChange={set('type')}
                    options={restaurantTypes}
                    placeholder="Select your type…"
                    required={false}
                  />
                </div>

                {/* Intent question */}
                <div className="mb-6 p-4 rounded-2xl bg-orange-500/6 border border-orange-500/15">
                  <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    Would you be interested in using AIWaiter to increase repeat customers and improve restaurant operations?
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {intentOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          form.intent === opt
                            ? 'bg-orange-500/15 border-orange-500/40 text-white'
                            : 'bg-white/4 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="intent"
                          value={opt}
                          checked={form.intent === opt}
                          onChange={set('intent')}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${form.intent === opt ? 'border-orange-500 bg-orange-500' : 'border-gray-600'}`}>
                          {form.intent === opt && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                        </span>
                        <span className="text-xs font-medium leading-snug">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Apply For Free Pilot
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5">
                  {['No credit card', 'No commitment', 'We respond within 24 hrs'].map((t) => (
                    <span key={t} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
