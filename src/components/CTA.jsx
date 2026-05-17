import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        {/* Animated sparkle dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            className="absolute w-1 h-1 rounded-full bg-orange-400/60"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass border border-orange-500/20 rounded-3xl px-8 py-16 shadow-2xl shadow-orange-500/10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch in Minutes
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
          >
            Start Your{' '}
            <span className="text-gradient">AI-Powered</span>{' '}
            Restaurant Pilot
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Launch beingCogni AI Waiter in your restaurant within minutes. No technical knowledge needed. No credit card required. Just plug in and grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-white/15 text-white font-semibold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Pilot
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            {[
              '✓ 30-day free pilot',
              '✓ No credit card needed',
              '✓ Setup in under 10 minutes',
              '✓ Cancel anytime',
            ].map((point) => (
              <span key={point} className="flex items-center gap-1">{point}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
