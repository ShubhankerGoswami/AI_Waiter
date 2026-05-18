import { motion } from 'framer-motion'
import { Upload, Smartphone, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Menu & Generate QR',
    description:
      'Upload your menu PDF or image. Our AI instantly extracts all dishes and builds a beautiful digital menu. Then generate a QR code for each table in seconds.',
    detail: 'Takes less than 5 minutes to go live.',
    color: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Customers Order Digitally',
    description:
      'Guests scan the QR code, browse the menu, add items, and place their order — all from their phone. No app, no friction, no waiting for a waiter.',
    detail: 'Orders go directly to kitchen display.',
    color: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'AI Grows Your Restaurant',
    description:
      'beingCogni AI Waiter captures customer data, sends WhatsApp campaigns, generates insights, and identifies growth opportunities — all running automatically in the background.',
    detail: 'Avg. 18% increase in repeat customers.',
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            AI-Powered Restaurant in{' '}
            <span className="text-gradient">3 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No complex setup. No technical knowledge needed. Go from sign-up to running a fully AI-powered restaurant in under 10 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-orange-500/40 via-blue-500/40 to-purple-500/40" />
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 opacity-60"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative flex flex-col items-center text-center lg:text-left lg:items-start"
              >
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${step.iconBg} border ${step.border} flex items-center justify-center shadow-2xl ${step.glow} relative z-10`}>
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#030712] border border-white/15 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.description}</p>

                <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${step.color} bg-white/5 rounded-full px-3 py-1.5 border border-white/8`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {step.detail}
                </div>

                {/* Mobile connector arrow */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center w-full mt-8">
                    <div className="flex flex-col items-center gap-1">
                      {[0,1,2].map((dot) => (
                        <div key={dot} className="w-1 h-1 rounded-full bg-gray-600" />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass border border-white/10 rounded-2xl px-8 py-6 inline-block">
            <p className="text-gray-300 text-sm mb-4">
              Ready to transform your restaurant?
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Pilot — No Credit Card
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
