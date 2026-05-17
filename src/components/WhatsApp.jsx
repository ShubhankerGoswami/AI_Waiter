import { motion } from 'framer-motion'
import { MessageCircle, Gift, Star, RotateCcw, Tag } from 'lucide-react'

const campaigns = [
  {
    icon: Gift,
    title: 'Discount Offers',
    description: 'Send time-sensitive discount codes to bring customers back on slow days.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Star,
    title: 'Loyalty Rewards',
    description: 'Automatically reward repeat customers with exclusive perks and points.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: RotateCcw,
    title: 'Win-Back Campaigns',
    description: 'Re-engage lapsed customers who haven\'t visited in 30+ days.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Tag,
    title: 'Comeback Coupons',
    description: 'Auto-send personalised coupons after a customer\'s first visit.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
]

const chatMessages = [
  { from: 'bot', text: '👋 Hi Priya! It\'s been 2 weeks since your last visit.', time: '6:02 PM' },
  { from: 'bot', text: '🎁 We miss you! Here\'s a special 20% OFF for your next visit.\n\nCode: COMEBACK20\nValid till Sunday 🗓', time: '6:02 PM' },
  { from: 'user', text: 'Oh wow, thank you! 😍 Will definitely come this weekend.', time: '6:04 PM' },
  { from: 'bot', text: '🙌 Awesome! Your table will be ready. See you soon, Priya!', time: '6:04 PM' },
  { from: 'bot', text: '⭐ Enjoy your meal! Don\'t forget to share your feedback.', time: '8:45 PM' },
]

const stats = [
  { value: '340+', label: 'Messages Sent' },
  { value: '68%', label: 'Open Rate' },
  { value: '24%', label: 'Conversion' },
]

export default function WhatsApp() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Automation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Turn One-Time Guests Into{' '}
            <span className="text-gradient">Loyal Regulars</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            beingCogni AI Waiter automatically captures customer numbers and sends hyper-personalised WhatsApp campaigns that bring them back — on autopilot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-2xl scale-105" />

              {/* Phone shell */}
              <div className="relative w-72 bg-[#0d1117] rounded-[2.5rem] border border-white/15 shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="bg-[#0d1117] px-6 pt-4 pb-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-600 rounded-sm" />
                  </div>
                </div>

                {/* WA Header */}
                <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">beingCogni AI Waiter</p>
                    <p className="text-green-200 text-[10px] mt-0.5">Business Account ✓</p>
                  </div>
                </div>

                {/* Chat area */}
                <div className="bg-[#0b141a] px-3 py-4 space-y-3 min-h-[360px]">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-wrap ${
                          msg.from === 'user'
                            ? 'bg-[#005c4b] text-white rounded-tr-sm'
                            : 'bg-[#202c33] text-gray-100 rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                        <p className="text-[9px] text-gray-400 mt-1 text-right">{msg.time} ✓✓</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="bg-[#0b141a] px-3 pb-4">
                  <div className="bg-[#202c33] rounded-full px-4 py-2.5 flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 flex-1">Type a message</span>
                    <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Campaigns + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {campaigns.map((camp, i) => (
                <motion.div
                  key={camp.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass border border-white/10 rounded-2xl p-4 card-hover"
                >
                  <div className={`w-9 h-9 rounded-xl ${camp.bg} flex items-center justify-center mb-3`}>
                    <camp.icon className={`w-4.5 h-4.5 ${camp.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{camp.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{camp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="glass border border-green-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs font-medium text-gray-300">Campaign Performance — This Month</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
