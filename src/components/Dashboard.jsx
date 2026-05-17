import { motion } from 'framer-motion'
import { Brain, TrendingUp, Users, ShoppingBag, ArrowUpRight, Flame } from 'lucide-react'

const insights = [
  {
    icon: Brain,
    text: 'Customers ordering pizza also add garlic bread 62% of the time.',
    tag: 'Upsell',
    tagColor: 'text-purple-400 bg-purple-500/15 border-purple-500/25',
  },
  {
    icon: Flame,
    text: 'Cold coffee sales spike after 6 PM — run a targeted promo now.',
    tag: 'Trend',
    tagColor: 'text-orange-400 bg-orange-500/15 border-orange-500/25',
  },
  {
    icon: TrendingUp,
    text: '22% increase in repeat visitors this month vs. last month.',
    tag: 'Growth',
    tagColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
  },
  {
    icon: Users,
    text: 'Tuesday lunch is your slowest slot — offer a midweek deal.',
    tag: 'Insight',
    tagColor: 'text-blue-400 bg-blue-500/15 border-blue-500/25',
  },
]

const kpiCards = [
  { label: 'Monthly Revenue', value: '₹4.2L', change: '+14%', up: true },
  { label: 'Total Orders', value: '1,840', change: '+9%', up: true },
  { label: 'Repeat Rate', value: '68%', change: '+18%', up: true },
  { label: 'Avg Order Value', value: '₹348', change: '+6%', up: true },
]

const topDishes = [
  { name: 'Paneer Tikka', orders: 340, pct: 90 },
  { name: 'Veg Biryani', orders: 280, pct: 74 },
  { name: 'Cold Coffee', orders: 245, pct: 65 },
  { name: 'Garlic Naan', orders: 210, pct: 55 },
  { name: 'Mango Lassi', orders: 178, pct: 47 },
]

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            AI Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Your Restaurant's Brain —{' '}
            <span className="text-gradient-cool">Always On</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A real-time command center that tracks every order, customer, and rupee — and tells you exactly what to do next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Dashboard chrome bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live — beingCogni AI Waiter Analytics
            </div>
            <div className="text-xs text-gray-600 hidden sm:block">May 2026</div>
          </div>

          <div className="p-6 space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="bg-white/5 border border-white/8 rounded-2xl p-4"
                >
                  <p className="text-xs text-gray-400 mb-2">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">{kpi.change} this month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts + Top Dishes */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white/5 border border-white/8 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Revenue Trend</p>
                    <p className="text-xs text-gray-400">Last 12 weeks</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">↑ 14%</span>
                </div>
                <div className="flex items-end gap-2 h-28">
                  {[45,55,48,70,65,80,72,88,75,92,85,100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: 'easeOut' }}
                      className={`flex-1 rounded-t-lg ${i === 11 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-orange-500/25'}`}
                      style={{ minWidth: 0 }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'].map(w => (
                    <span key={w} className="text-[9px] text-gray-600">{w}</span>
                  ))}
                </div>
              </div>

              {/* Top Dishes */}
              <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                <p className="text-sm font-semibold text-white mb-4">Top Dishes</p>
                <div className="space-y-3">
                  {topDishes.map((dish, i) => (
                    <div key={dish.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-300">{dish.name}</span>
                        <span className="text-xs text-gray-500">{dish.orders}</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${dish.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insight Cards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-purple-400" />
                <p className="text-sm font-semibold text-white">AI-Generated Insights</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">Live</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {insights.map((ins, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="bg-white/4 border border-white/8 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ins.icon className="w-3.5 h-3.5 text-gray-400" />
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${ins.tagColor}`}>{ins.tag}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{ins.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Heatmap Row */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">Order Heatmap</p>
                <p className="text-xs text-gray-400">Darker = busier</p>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day) => (
                  <div key={day} className="flex-1 min-w-[36px]">
                    <p className="text-[9px] text-gray-500 text-center mb-1">{day}</p>
                    <div className="space-y-1">
                      {[10,20,60,80,50,90,70,40,20,10].map((intensity, h) => (
                        <div
                          key={h}
                          className="h-4 rounded"
                          style={{ backgroundColor: `rgba(249,115,22,${intensity / 100})` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-gray-600 mt-2">
                <span>10 AM</span><span>1 PM</span><span>4 PM</span><span>7 PM</span><span>10 PM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
