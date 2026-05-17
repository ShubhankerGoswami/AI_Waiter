import { motion } from 'framer-motion'
import { QrCode, BarChart3, MessageSquare, FileText, Mic, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: QrCode,
    title: 'QR Ordering',
    description: 'Customers scan, browse the full menu, and place orders instantly. No app download needed.',
    color: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    border: 'border-orange-500/20',
    glow: 'hover:shadow-orange-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-sm ${[0,2,6,8].includes(i) ? 'bg-black' : i===4 ? 'bg-orange-500' : 'bg-gray-700'}`} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium text-white">Table 05</p>
            <p className="text-[9px] text-gray-400">Scan to order</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {['Paneer Tikka — ₹280', 'Veg Biryani — ₹220'].map((item) => (
            <div key={item} className="flex items-center justify-between text-[10px]">
              <span className="text-gray-300">{item}</span>
              <div className="w-4 h-4 rounded bg-orange-500/30 border border-orange-500/40 flex items-center justify-center">
                <span className="text-orange-400 text-[8px]">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: 'AI Analytics Dashboard',
    description: 'Real-time insights on revenue, orders, peak hours, and customer behavior — all AI-generated.',
    color: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-blue-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5">
        <div className="flex items-end gap-1 h-12 mb-2">
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-blue-500/40" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-gray-500">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
        <p className="text-[10px] text-blue-400 mt-2 font-medium">↑ Revenue up 12% this week</p>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Retention Engine',
    description: 'Send automated loyalty rewards, discount offers, and comeback campaigns via WhatsApp.',
    color: 'text-green-400',
    iconBg: 'bg-green-500/15',
    border: 'border-green-500/20',
    glow: 'hover:shadow-green-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5 space-y-2">
        {[
          { msg: '🎉 Get 20% off your next visit!', type: 'sent' },
          { msg: "Can't wait to visit again!", type: 'recv' },
        ].map((m, i) => (
          <div key={i} className={`flex ${m.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`text-[10px] px-2.5 py-1.5 rounded-xl max-w-[80%] ${m.type === 'sent' ? 'bg-green-600/40 text-green-100' : 'bg-white/10 text-gray-300'}`}>
              {m.msg}
            </div>
          </div>
        ))}
        <p className="text-[9px] text-gray-500 text-center">Delivered to 340 customers</p>
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'AI Menu Onboarding',
    description: 'Upload your PDF or image menu and AI extracts every dish, price, and category automatically.',
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-purple-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-10 bg-purple-500/20 border border-purple-500/30 rounded flex items-center justify-center">
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <p className="text-[10px] text-white font-medium">menu.pdf</p>
            <p className="text-[9px] text-gray-400">Uploading…</p>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
          <div className="bg-purple-500 h-1.5 rounded-full w-3/4" />
        </div>
        <p className="text-[9px] text-purple-400">✓ 48 dishes extracted automatically</p>
      </div>
    ),
  },
  {
    icon: Mic,
    title: 'Voice AI Waiter',
    description: 'Customers speak their order naturally. AI understands, confirms, and sends it to the kitchen.',
    color: 'text-pink-400',
    iconBg: 'bg-pink-500/15',
    border: 'border-pink-500/20',
    glow: 'hover:shadow-pink-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5 text-center">
        <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mx-auto mb-2 relative">
          <Mic className="w-5 h-5 text-pink-400" />
          <div className="absolute inset-0 rounded-full border border-pink-400/40 animate-ping" />
        </div>
        <p className="text-[10px] text-gray-300 italic">"I'll have a cold coffee and garlic naan"</p>
        <p className="text-[9px] text-pink-400 mt-1">→ Order confirmed ✓</p>
      </div>
    ),
  },
  {
    icon: TrendingUp,
    title: 'Restaurant Growth Insights',
    description: 'AI identifies top dishes, customer trends, and revenue gaps to help you make smarter decisions.',
    color: 'text-yellow-400',
    iconBg: 'bg-yellow-500/15',
    border: 'border-yellow-500/20',
    glow: 'hover:shadow-yellow-500/10',
    preview: (
      <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5 space-y-2">
        {[
          { insight: 'Promote Cold Coffee after 6 PM', tag: 'Revenue' },
          { insight: 'Paneer Tikka drives 34% of orders', tag: 'Trend' },
        ].map((item) => (
          <div key={item.insight} className="flex items-start gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-medium mt-0.5 flex-shrink-0">{item.tag}</span>
            <p className="text-[10px] text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Everything Your Restaurant{' '}
            <span className="text-gradient">Needs to Grow</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One AI platform that replaces fragmented tools, drives orders, retains customers, and generates insights automatically.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`glass border ${feature.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${feature.glow} group`}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              {feature.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
