import { motion } from 'framer-motion'
import { UserX, RefreshCw, BarChart2 } from 'lucide-react'

const problems = [
  {
    icon: UserX,
    title: 'Waiters Slowing You Down',
    description:
      'Peak-hour chaos means missed orders, long wait times, and frustrated customers who leave before they even order. Every minute lost is revenue gone.',
    pain: 'Avg. 12 min wait at peak hours',
    color: 'from-red-500/20 to-orange-500/10',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400',
    visual: (
      <div className="mt-4 space-y-2">
        {['Table 3 — waiting 18 min', 'Table 7 — no waiter seen', 'Table 11 — order wrong'].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
            <span className="text-gray-400">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: 'Customers Never Return',
    description:
      'You serve great food but have no way to bring customers back. No phone numbers, no loyalty system, no re-engagement — one-time visits are all you get.',
    pain: 'Only 22% of customers return',
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'border-yellow-500/20',
    iconBg: 'bg-yellow-500/15',
    iconColor: 'text-yellow-400',
    visual: (
      <div className="mt-4">
        <div className="flex items-end gap-1.5 h-12">
          {[80, 35, 20, 12, 8, 5].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-yellow-500/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-gray-500 mt-1">Visit 1 → Visit 2 → Visit 3… drop-off</p>
      </div>
    ),
  },
  {
    icon: BarChart2,
    title: 'Zero Business Insights',
    description:
      'You run your restaurant on gut feel. No data on best-selling dishes, peak hours, slow days, or customer preferences. You can\'t grow what you can\'t measure.',
    pain: '78% of owners lack actionable data',
    color: 'from-purple-500/20 to-blue-500/10',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    visual: (
      <div className="mt-4 space-y-2">
        {['Best selling dish?', 'Peak revenue hours?', 'Which items to promote?'].map((q, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{q}</span>
            <span className="text-gray-600 italic">Unknown</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function Problem() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-red-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Restaurants Are Leaving{' '}
            <span className="text-gradient">Money on the Table</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Traditional restaurant operations are stuck in the past. Here's what's silently killing your growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${problem.color} border ${problem.border} card-hover overflow-hidden`}
            >
              <div className={`w-12 h-12 rounded-xl ${problem.iconBg} flex items-center justify-center mb-5`}>
                <problem.icon className={`w-6 h-6 ${problem.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{problem.description}</p>

              {problem.visual}

              <div className={`mt-5 inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-black/20 ${problem.iconColor}`}>
                ⚠ {problem.pain}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-base">
            beingCogni AI Waiter solves all three — automatically.{' '}
            <a href="#features" className="text-orange-400 hover:text-orange-300 font-medium underline underline-offset-4">
              See how →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
