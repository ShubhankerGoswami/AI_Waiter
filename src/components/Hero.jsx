import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, ShoppingBag, Brain, Clock, Star } from 'lucide-react'

const floatingCards = [
  {
    icon: TrendingUp,
    label: '+18% Repeat Customers',
    sub: 'vs last month',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    position: 'top-4 -left-4 lg:-left-16',
    delay: 0,
  },
  {
    icon: ShoppingBag,
    label: '412 Orders This Week',
    sub: 'Real-time tracking',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    position: 'top-32 -right-4 lg:-right-10',
    delay: 0.3,
  },
  {
    icon: Brain,
    label: 'AI Insight Generated',
    sub: 'Peak Hour: 7 PM',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    position: 'bottom-28 -left-4 lg:-left-14',
    delay: 0.6,
  },
  {
    icon: Star,
    label: 'Top Dish: Paneer Tikka',
    sub: '89 orders today',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    position: 'bottom-8 -right-4 lg:-right-12',
    delay: 0.9,
  },
  {
    icon: Clock,
    label: 'Avg. Wait: 4 min',
    sub: '↓ 62% faster',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    position: 'top-1/2 -right-4 lg:-right-16 -translate-y-1/2',
    delay: 1.2,
  },
]

function FloatingCard({ icon: Icon, label, sub, color, bg, border, position, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.8, duration: 0.5 }}
      className={`absolute ${position} z-20`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        className={`glass ${border} border rounded-2xl px-3 py-2.5 shadow-2xl min-w-[160px] backdrop-blur-xl`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-white leading-tight">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Dashboard
        </div>
        <div className="text-xs text-gray-500">beingCogni AI Waiter</div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 space-y-3">
        {/* Top stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Today's Revenue", value: '₹18,420', change: '+12%', color: 'text-emerald-400' },
            { label: 'Active Tables', value: '14/20', change: '70%', color: 'text-orange-400' },
            { label: 'Repeat Customers', value: '68%', change: '+18%', color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
              <p className="text-[10px] text-gray-400 mb-1">{stat.label}</p>
              <p className="text-base font-bold text-white">{stat.value}</p>
              <p className={`text-[10px] font-medium ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-300">Orders Today</p>
            <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Live</span>
          </div>
          {/* Bar chart mock */}
          <div className="flex items-end gap-1.5 h-16">
            {[30, 55, 40, 80, 65, 90, 75, 85, 95, 70, 88, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
                className={`flex-1 rounded-t-sm ${i === 9 ? 'bg-orange-500' : 'bg-orange-500/30'}`}
                style={{ minWidth: 0 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['9AM','11AM','1PM','3PM','5PM','7PM'].map(t => (
              <span key={t} className="text-[9px] text-gray-500">{t}</span>
            ))}
          </div>
        </div>

        {/* AI Insights row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Brain className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] text-purple-400 font-medium">AI Insight</span>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed">
              Pizza orders spike with garlic bread <strong className="text-white">62%</strong> of the time
            </p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 mb-1">Popular Right Now</p>
            {['Paneer Tikka', 'Cold Coffee', 'Veg Biryani'].map((dish, i) => (
              <div key={dish} className="flex items-center justify-between py-0.5">
                <span className="text-[10px] text-gray-300">{dish}</span>
                <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${[90, 70, 55][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-[10px] font-medium text-gray-300 mb-2">Recent Orders</p>
          <div className="space-y-1.5">
            {[
              { table: 'T-04', item: 'Paneer Tikka × 2', status: 'Preparing', color: 'text-yellow-400' },
              { table: 'T-07', item: 'Cold Coffee × 1', status: 'Ready', color: 'text-emerald-400' },
              { table: 'T-11', item: 'Veg Biryani × 3', status: 'Ordered', color: 'text-blue-400' },
            ].map((order) => (
              <div key={order.table} className="flex items-center justify-between">
                <span className="text-[10px] text-orange-400 font-medium">{order.table}</span>
                <span className="text-[10px] text-gray-300">{order.item}</span>
                <span className={`text-[9px] font-medium ${order.color}`}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-orange-500/30 text-orange-400 text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              AI-Powered Restaurant Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6"
            >
              Turn Every Table Into an{' '}
              <span className="text-gradient">AI-Powered</span>{' '}
              Revenue Engine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              QR ordering, AI analytics, customer retention, and automated WhatsApp campaigns — all in one platform built for modern restaurants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Free Pilot
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                Watch Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              {[
                { value: '120+', label: 'Restaurants' },
                { value: '50K+', label: 'Orders' },
                { value: '18%', label: 'Repeat Uplift' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:pl-8"
          >
            {/* Glow behind dashboard */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className="relative">
              <DashboardMockup />
            </div>
            {/* Floating cards */}
            {floatingCards.map((card) => (
              <FloatingCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
