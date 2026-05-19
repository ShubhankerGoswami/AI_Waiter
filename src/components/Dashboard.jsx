import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, TrendingUp, Users, ShoppingBag, ArrowUpRight, Flame, MessageCircle, Zap, CheckCircle } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

const insights = [
  { icon: Brain, text: 'Customers ordering pizza also add garlic bread 62% of the time.', tag: 'Upsell', tagColor: 'text-purple-400 bg-purple-500/15 border-purple-500/25' },
  { icon: Flame, text: 'Cold coffee sales spike after 6 PM — run a targeted promo now.', tag: 'Trend', tagColor: 'text-orange-400 bg-orange-500/15 border-orange-500/25' },
  { icon: TrendingUp, text: '22% increase in repeat visitors this month vs. last month.', tag: 'Growth', tagColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25' },
  { icon: Users, text: 'Tuesday lunch is your slowest slot — offer a midweek deal.', tag: 'Insight', tagColor: 'text-blue-400 bg-blue-500/15 border-blue-500/25' },
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

/* ── WhatsApp Analytics Queries ────────────────────────────── */
const waQueries = [
  {
    id: 'topskus',
    label: '🏆 Top SKUs',
    question: 'What are my highest selling dishes this week?',
    answer: '📊 *Top 5 Dishes — This Week*\n\n🥇 Paneer Tikka — 340 orders\n🥈 Veg Biryani — 280 orders\n🥉 Cold Coffee — 245 orders\n4. Garlic Naan — 210 orders\n5. Mango Lassi — 178 orders\n\n💡 *Tip:* Paneer Tikka + Naan combo converts 68% of the time — try bundling them!',
    accentColor: 'text-orange-400',
    accentBg: 'bg-orange-500/15',
    accentBorder: 'border-orange-500/30',
  },
  {
    id: 'revenue',
    label: '💰 Revenue',
    question: 'How much revenue did I make today?',
    answer: '💰 *Today\'s Revenue Summary*\n\nTotal: ₹18,400  ↑ +12% vs yesterday\n🕗 Peak hour: 7–9 PM (₹6,200)\n🛒 Total orders: 47 | Avg: ₹391\n\n🔥 You\'re on track to beat this week\'s best day!',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/15',
    accentBorder: 'border-emerald-500/30',
  },
  {
    id: 'occupancy',
    label: '⏰ Busy Hours',
    question: 'When is my restaurant busiest?',
    answer: '⏰ *Peak Hours — This Week*\n\n🔴 Busiest: Sat 7–9 PM (94% full)\n🟠 Second peak: Fri 1–2 PM (78%)\n🟡 Slowest: Tue 3–5 PM (12%)\n\n💡 Tuesday afternoons are nearly empty — want me to schedule a promo for your Tuesday regulars?',
    accentColor: 'text-blue-400',
    accentBg: 'bg-blue-500/15',
    accentBorder: 'border-blue-500/30',
  },
  {
    id: 'loyalty',
    label: '🔄 Loyal Customers',
    question: 'How many repeat customers do I have?',
    answer: '🔄 *Customer Loyalty Report*\n\nRepeat rate: 68%  ↑ +18% this month\n⭐ Top visitor: Priya S. (12 visits)\n⚠️ At-risk customers: 23\n\n💡 Send a win-back offer to those 23 customers? I\'ll draft the WhatsApp message for you!',
    accentColor: 'text-purple-400',
    accentBg: 'bg-purple-500/15',
    accentBorder: 'border-purple-500/30',
  },
]

const waFeatures = [
  'Ask in plain language — no dashboard needed',
  'Instant answers, formatted and easy to read',
  'AI suggests an action after every insight',
  'Get daily/weekly summaries auto-sent to you',
  'Works 24/7 — even at 2 AM before bed',
  'Supports Hindi & English both',
]

/* ── WhatsApp Chat Mockup ───────────────────────────────────── */
function WAPhoneMockup({ query }) {
  const [step, setStep] = useState(0) // 0=empty, 1=question, 2=typing, 3=answer

  useEffect(() => {
    setStep(0)
    const t1 = setTimeout(() => setStep(1), 350)
    const t2 = setTimeout(() => setStep(2), 1100)
    const t3 = setTimeout(() => setStep(3), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [query.id])

  return (
    <div className="w-[280px] mx-auto">
      {/* Phone shell */}
      <div className="relative bg-[#0d1117] rounded-[2rem] border border-white/15 shadow-2xl overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(37,211,102,0.10)' }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[9px] text-gray-400">9:41</span>
          <div className="w-14 h-4 bg-black rounded-full" />
          <div className="w-6 h-2 bg-gray-500 rounded-sm opacity-60" />
        </div>

        {/* WA header */}
        <div className="bg-[#128C7E] px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-[11px] font-bold leading-none">beingCogni Analytics</p>
            <p className="text-green-200 text-[9px] mt-0.5">Business Account ✓</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="bg-[#0b141a] px-3 py-3 min-h-[260px] space-y-2.5">
          <AnimatePresence>
            {/* User question */}
            {step >= 1 && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] bg-[#005c4b] text-white rounded-2xl rounded-tr-sm px-3 py-2 text-[10px] leading-relaxed">
                  {query.question}
                  <p className="text-[8px] text-green-200/60 mt-1 text-right">9:41 ✓✓</p>
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            {step === 2 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-1.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#128C7E]/60 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <div className="bg-[#202c33] rounded-2xl rounded-tl-sm px-2.5 py-2 flex gap-1 items-center">
                  {[0, 1, 2].map((d) => (
                    <motion.div key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} className="w-1 h-1 rounded-full bg-gray-400" />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bot answer */}
            {step >= 3 && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-1.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#128C7E]/60 flex items-center justify-center flex-shrink-0 mb-0.5">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <div className="max-w-[82%] bg-[#202c33] text-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 text-[10px] leading-relaxed whitespace-pre-wrap">
                  {query.answer}
                  <p className="text-[8px] text-gray-500 mt-1 text-right">9:41 ✓✓</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="bg-[#0b141a] px-3 pb-3">
          <div className="bg-[#202c33] rounded-full px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] text-gray-500 flex-1">Ask your restaurant anything…</span>
            <div className="w-6 h-6 rounded-full bg-[#128C7E] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeQuery, setActiveQuery] = useState(0)

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
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

        {/* ── Web Dashboard ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-20"
        >
          {/* Chrome bar */}
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
                <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.07 }} className="bg-white/5 border border-white/8 rounded-2xl p-4">
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
                    <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: 'easeOut' }} className={`flex-1 rounded-t-lg ${i === 11 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-orange-500/25'}`} style={{ minWidth: 0 }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'].map(w => (
                    <span key={w} className="text-[9px] text-gray-600">{w}</span>
                  ))}
                </div>
              </div>

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
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${dish.pct}%` }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400" />
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
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08 }} className="bg-white/4 border border-white/8 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ins.icon className="w-3.5 h-3.5 text-gray-400" />
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${ins.tagColor}`}>{ins.tag}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{ins.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Heatmap */}
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
                        <div key={h} className="h-4 rounded" style={{ backgroundColor: `rgba(249,115,22,${intensity / 100})` }} />
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

        {/* ── WhatsApp Analytics Bot ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

          {/* Divider / transition */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-white/8" />
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
                <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                  <Brain className="w-3 h-3 text-blue-400" />
                </div>
                Web Dashboard
              </div>
              <span className="text-gray-600 text-sm font-bold">+</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
                <div className="w-6 h-6 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-green-400" />
                </div>
                WhatsApp Bot
              </div>
            </div>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Sub-section header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Analytics Bot
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ask Your Data Anything —{' '}
              <span className="text-green-400">Even on WhatsApp</span>
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              No need to open a dashboard. Just message the bot and get instant, actionable answers — in plain language.
            </p>
          </div>

          {/* Query tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {waQueries.map((q, i) => (
              <button
                key={q.id}
                onClick={() => { setActiveQuery(i); track(EVENTS.DASHBOARD_WA_QUERY, { query: q.id }) }}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                  activeQuery === i
                    ? `${q.accentBg} ${q.accentColor} ${q.accentBorder} shadow-lg`
                    : 'glass border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/8'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Phone + Features grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Phone mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-2xl scale-110 opacity-60" />
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={waQueries[activeQuery].id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <WAPhoneMockup query={waQueries[activeQuery]} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right — Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Active query highlight */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuery}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className={`p-4 rounded-2xl ${waQueries[activeQuery].accentBg} border ${waQueries[activeQuery].accentBorder}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest ${waQueries[activeQuery].accentColor} mb-1.5`}>
                    Try asking this
                  </p>
                  <p className="text-sm text-white font-medium">"{waQueries[activeQuery].question}"</p>
                </motion.div>
              </AnimatePresence>

              {/* Feature list */}
              <div className="space-y-3">
                {waFeatures.map((feat, i) => (
                  <motion.div
                    key={feat}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 glass border border-white/8 rounded-xl p-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{feat}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#waitlist"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Get WhatsApp Analytics Access
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
