import { motion } from 'framer-motion'
import { Check, Zap, Building2, Rocket } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

const plans = [
  {
    icon: Rocket,
    name: 'Starter',
    price: '₹1,999',
    period: '/month',
    description: 'Perfect for small cafes and single-outlet restaurants just getting started.',
    cta: 'Start Free Pilot',
    ctaStyle: 'bg-white/8 border border-white/15 text-white hover:bg-white/15',
    featured: false,
    features: [
      'QR Ordering for up to 20 tables',
      'Digital menu (up to 50 dishes)',
      'Basic order analytics',
      'Customer phone number capture',
      'WhatsApp — 200 messages/month',
      'Email support',
    ],
    unavailable: [
      'AI analytics dashboard',
      'AI-generated insights',
      'Win-back campaigns',
    ],
  },
  {
    icon: Zap,
    name: 'Growth',
    price: '₹4,999',
    period: '/month',
    description: 'The complete AI-powered engine for growing restaurants and QSRs.',
    cta: 'Start Free Pilot',
    ctaStyle: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50',
    featured: true,
    badge: 'Most Popular',
    features: [
      'QR Ordering — unlimited tables',
      'Unlimited digital menu items',
      'Full AI analytics dashboard',
      'AI-generated business insights',
      'WhatsApp — 2,000 messages/month',
      'Win-back & loyalty campaigns',
      'Voice AI Waiter (beta)',
      'Priority support',
    ],
    unavailable: [],
  },
  {
    icon: Building2,
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For restaurant chains, food courts, and cloud kitchen networks.',
    cta: 'Contact Sales',
    ctaStyle: 'bg-white/8 border border-white/15 text-white hover:bg-white/15',
    featured: false,
    features: [
      'Everything in Growth',
      'Multi-outlet management',
      'Unlimited WhatsApp messages',
      'Custom AI model training',
      'Dedicated account manager',
      'SLA-backed uptime guarantee',
      'Custom integrations & API',
      'On-site onboarding & training',
    ],
    unavailable: [],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-orange-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            Planned Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Simple, Transparent{' '}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-4">
            These are our planned tiers — subject to change based on your feedback. Early waitlist members lock in the best rates.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Join the waitlist now to lock in early-adopter pricing
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? 'glass border-2 border-orange-500/50 shadow-2xl shadow-orange-500/15 scale-[1.02]'
                  : 'glass border border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.featured ? 'bg-orange-500/20' : 'bg-white/8'}`}>
                <plan.icon className={`w-5.5 h-5.5 ${plan.featured ? 'text-orange-400' : 'text-gray-400'}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-sm ml-1">{plan.period}</span>}
              </div>

              <a
                href="#waitlist"
                onClick={() => track(EVENTS.PRICING_PLAN_CTA_CLICKED, { plan: plan.name.toLowerCase(), price: plan.price })}
                className={`w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-7 block ${plan.ctaStyle}`}
              >
                Reserve This Plan
              </a>

              <div className="space-y-3">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? 'bg-orange-500/20' : 'bg-white/8'}`}>
                      <Check className={`w-2.5 h-2.5 ${plan.featured ? 'text-orange-400' : 'text-gray-400'}`} />
                    </div>
                    <span className="text-sm text-gray-300">{feat}</span>
                  </div>
                ))}
                {plan.unavailable.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 opacity-40">
                    <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-px bg-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500 line-through">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          Pricing is indicative and will be finalised based on early feedback.{' '}
          <a href="#waitlist" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">Join the waitlist</a> to influence the final pricing.
        </motion.p>
      </div>
    </section>
  )
}
