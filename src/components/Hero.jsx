import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Brain, Sparkles, MessageSquare, Zap } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

const floatingCards = [
  {
    icon: TrendingUp,
    label: '+22% Avg Order Value',
    sub: 'AI upselling active',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    position: 'top-4 -left-4 lg:-left-16',
    delay: 0,
  },
  {
    icon: Brain,
    label: 'AI Upsell Success',
    sub: 'Garlic bread added ×34',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    position: 'top-36 -right-4 lg:-right-12',
    delay: 0.3,
  },
  {
    icon: Sparkles,
    label: 'Repeat Customer ID\'d',
    sub: 'Priya — 4th visit 🎉',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    position: 'bottom-28 -left-4 lg:-left-14',
    delay: 0.6,
  },
  {
    icon: MessageSquare,
    label: 'AI Waiter Active',
    sub: '14 tables ordering now',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    position: 'bottom-6 -right-4 lg:-right-12',
    delay: 0.9,
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
        className={`glass ${border} border rounded-2xl px-3 py-2.5 shadow-2xl min-w-[170px] backdrop-blur-xl`}
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

const chatMessages = [
  { from: 'ai', text: '👋 Hi! I\'m your AI Waiter. What would you like today?', delay: 1.0 },
  { from: 'user', text: 'I want a burger please', delay: 1.6 },
  { from: 'ai', text: '🍔 Great choice! Most customers add fries + cold coffee — it\'s 15% off as a combo. Want me to add it?', delay: 2.2 },
  { from: 'user', text: 'Yes, add the combo!', delay: 2.9 },
  { from: 'ai', text: '✅ Added! Also — last time you loved Garlic Bread. Want it again?', delay: 3.5 },
]

function HeroChatMockup() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Waiter — Table 07
        </div>
        <div className="text-[10px] text-gray-600">beingCogni</div>
      </div>

      <div className="p-4 space-y-4">
        {/* QR scan indicator */}
        <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-3 py-2.5">
          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">QR Scanned — Table 07</p>
            <p className="text-[10px] text-gray-400">AI Waiter ready to take your order</p>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-2.5">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: msg.delay, duration: 0.4 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <Brain className="w-3 h-3 text-white" />
                </div>
              )}
              <div
                className={`text-[11px] leading-relaxed rounded-2xl px-3 py-2 max-w-[78%] ${
                  msg.from === 'user'
                    ? 'bg-orange-500/25 border border-orange-500/20 text-orange-100 rounded-tr-sm'
                    : 'bg-white/8 border border-white/10 text-gray-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center">
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-gray-400"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI suggestion chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
          className="flex flex-wrap gap-1.5"
        >
          {['🌿 Veg options', '🌶️ Spicy dishes', '🍰 Desserts', '♻️ Reorder usual'].map((chip) => (
            <span key={chip} className="text-[10px] px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-gray-300 hover:bg-white/12 cursor-pointer transition-colors">
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/8">
          {[
            { label: "Today's Orders", value: '412', color: 'text-orange-400' },
            { label: 'AI Upsells', value: '87', color: 'text-purple-400' },
            { label: 'Revenue', value: '₹18.4K', color: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
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
              Concept Preview — We're Validating With Real Restaurants
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6"
            >
              Turn Every Restaurant Table Into an{' '}
              <span className="text-gradient">AI-Powered</span>{' '}
              Revenue Engine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              AI-powered ordering, smart recommendations, customer retention, and automated restaurant growth — all through a simple QR scan.
            </motion.p>

            {/* Key differentiators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col gap-2 mb-8"
            >
              {[
                { icon: MessageSquare, text: 'Customers chat with an AI waiter — not just browse a menu', color: 'text-purple-400' },
                { icon: Brain, text: 'AI upsells, recommends, and remembers every customer', color: 'text-orange-400' },
                { icon: Sparkles, text: 'Upload menu once — AI builds your entire digital experience', color: 'text-emerald-400' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                  <p className="text-sm text-gray-300">{text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a
                href="#waitlist"
                onClick={() => track(EVENTS.CTA_CLICKED, { location: 'hero', label: 'join_waitlist' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Join Waitlist — It's Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#demo"
                onClick={() => track(EVENTS.CTA_CLICKED, { location: 'hero', label: 'see_how_it_works' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                See How It Works
              </a>
            </motion.div>

            {/* Interest counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-orange-500/8 border border-orange-500/15"
            >
              <div className="flex -space-x-2">
                {['bg-orange-400', 'bg-purple-400', 'bg-emerald-400', 'bg-blue-400'].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-[#030712] flex items-center justify-center text-[9px] font-bold text-white`}>
                    {['R', 'S', 'A', 'M'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                <span className="text-orange-400 font-bold">63 restaurant owners</span> have already shown interest
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              {[
                { value: 'Free', label: 'To Join Waitlist' },
                { value: '+22%', label: 'Higher Order Value' },
                { value: '10 min', label: 'Setup Time' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — AI Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:pl-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className="relative">
              <HeroChatMockup />
            </div>
            {floatingCards.map((card) => (
              <FloatingCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
