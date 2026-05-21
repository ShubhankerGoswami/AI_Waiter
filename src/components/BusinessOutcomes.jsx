import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock, RotateCcw, Megaphone } from 'lucide-react'

const outcomes = [
  {
    icon: TrendingUp,
    metric: '+22%',
    label: 'Higher Average Order Value',
    description: 'AI recommends combos and upsells automatically every time a customer orders.',
    color: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    border: 'border-orange-500/20',
    glow: 'shadow-orange-500/10',
    gradientFrom: 'from-orange-500/10',
    gradientTo: 'to-transparent',
    barColor: 'bg-gradient-to-r from-orange-500 to-orange-400',
    barWidth: '78%',
    tag: 'Revenue',
    tagColor: 'text-orange-400',
    tagBg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: Clock,
    metric: '2×',
    label: 'Faster Table Turnover',
    description: 'Customers order instantly from their phone without waiting for a waiter.',
    color: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10',
    gradientFrom: 'from-blue-500/10',
    gradientTo: 'to-transparent',
    barColor: 'bg-gradient-to-r from-blue-500 to-blue-400',
    barWidth: '65%',
    tag: 'Efficiency',
    tagColor: 'text-blue-400',
    tagBg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: RotateCcw,
    metric: '3×',
    label: 'More Repeat Customers',
    description: 'AI remembers every customer\'s preferences and past orders to personalize their next visit.',
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    glow: 'shadow-purple-500/10',
    gradientFrom: 'from-purple-500/10',
    gradientTo: 'to-transparent',
    barColor: 'bg-gradient-to-r from-purple-500 to-purple-400',
    barWidth: '85%',
    tag: 'Retention',
    tagColor: 'text-purple-400',
    tagBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Megaphone,
    metric: 'Auto',
    label: 'Automated Promotions',
    description: 'Send AI-powered WhatsApp campaigns that bring customers back — on complete autopilot.',
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/10',
    gradientFrom: 'from-emerald-500/10',
    gradientTo: 'to-transparent',
    barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    barWidth: '92%',
    tag: 'Growth',
    tagColor: 'text-emerald-400',
    tagBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
]

function AnimatedBar({ barColor, barWidth, inView }) {
  return (
    <div className="w-full bg-white/6 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${barColor}`}
        initial={{ width: '0%' }}
        animate={{ width: inView ? barWidth : '0%' }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  )
}

function MetricCounter({ metric, inView, color }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200, delay: 0.2 }}
      className={`text-4xl lg:text-5xl font-bold ${color}`}
    >
      {metric}
    </motion.span>
  )
}

export default function BusinessOutcomes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="outcomes" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/6 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            Business Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            How AIWaiter Helps{' '}
            <span className="text-gradient">Restaurants Grow</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Not just a digital menu. A full AI growth engine that increases revenue, drives repeat customers, and automates operations.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative glass border ${outcome.border} rounded-3xl p-6 overflow-hidden hover:shadow-2xl ${outcome.glow} transition-all duration-300 group`}
            >
              {/* Gradient background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${outcome.gradientFrom} ${outcome.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Tag */}
              <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 ${outcome.tagColor} ${outcome.tagBg}`}>
                {outcome.tag}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${outcome.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <outcome.icon className={`w-6 h-6 ${outcome.color}`} />
              </div>

              {/* Metric */}
              <div className="mb-1">
                <MetricCounter metric={outcome.metric} inView={inView} color={outcome.color} />
              </div>

              {/* Label */}
              <h3 className="text-base font-bold text-white mb-2 leading-tight">{outcome.label}</h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{outcome.description}</p>

              {/* Animated progress bar */}
              <AnimatedBar barColor={outcome.barColor} barWidth={outcome.barWidth} inView={inView} />
              <p className={`text-[10px] ${outcome.color} mt-1.5 font-medium`}>AI performance metric</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass border border-orange-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-bold text-lg">This is not just a QR menu.</p>
            <p className="text-gray-400 text-sm">It's an AI copilot that works 24/7 to grow your restaurant revenue.</p>
          </div>
          <a
            href="#waitlist"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Apply For Free Pilot
          </a>
        </motion.div>
      </div>
    </section>
  )
}
