import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, TrendingUp, ChevronLeft, ChevronRight, Zap, RotateCcw, Star, Globe } from 'lucide-react'

/* ── Use-case data ─────────────────────────────────────────── */
const useCases = [
  {
    id: 'upsell',
    number: '1',
    label: 'Searching for Burger',
    subtitle: 'AI shows best options & upsells',
    accent: { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' },
    tabs: ['Recommended', 'Burgers', 'Pizzas', 'Combos'],
    activeTab: 1,
    menuItems: [
      { emoji: '🍔', name: 'Classic Cheese Burger', desc: 'Juicy grilled patty with cheese & special sauce', price: '₹249' },
      { emoji: '🌶️🍔', name: 'Spicy Chicken Burger', desc: 'Spicy chicken patty with lettuce & mayo', price: '₹269' },
      { emoji: '🥓🍔', name: 'BBQ Bacon Burger', desc: 'Bacon, bbq sauce, cheese & veggies', price: '₹289' },
    ],
    chat: [
      { from: 'user', text: 'I want a burger', delay: 0.3 },
      { from: 'ai', text: 'Here are our most popular burgers 🍔', delay: 1.1 },
      { from: 'ai', text: 'Most customers add fries and coke with this combo.', delay: 1.9, card: { label: 'Burger Combo', desc: 'Burger + Fries + Coke', price: '₹349', action: '+ Add' } },
    ],
    badge: { text: '+22% Higher\nOrder Value', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    sideTag: { text: 'AI Upselling', color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30' },
  },
  {
    id: 'memory',
    number: '2',
    label: 'Last Order Memory',
    subtitle: 'AI remembers & personalizes',
    accent: { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
    tabs: ['Recommended', 'Bestsellers', 'Mains', 'Beverage'],
    activeTab: 1,
    menuItems: [
      { emoji: '🍛', name: 'Butter Chicken', desc: 'Rich & creamy butter chicken gravy', price: '₹299', badge: 'Bestseller' },
      { emoji: '🧀', name: 'Paneer Tikka', desc: 'Cottage cheese marinated & grilled', price: '₹249' },
      { emoji: '🍚', name: 'Veg Biryani', desc: 'Aromatic basmati rice with veggies', price: '₹220' },
    ],
    chat: [
      { from: 'user', text: 'What did I order last time?', delay: 0.3 },
      { from: 'ai', text: 'You ordered Butter Chicken + Garlic Naan on your last visit.', delay: 1.1, reorder: { label: 'Butter Chicken + Garlic Naan', meta: '₹348  •  15 May, 7:30 PM' } },
      { from: 'ai', text: 'You also loved Gulab Jamun last time 🍮', delay: 2.8 },
    ],
    badge: { text: 'Repeat Customer\nIdentified', icon: RotateCcw, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    sideTag: null,
  },
  {
    id: 'dietary',
    number: '3',
    label: 'Vegetarian Recommendations',
    subtitle: 'AI suggests best veg options',
    accent: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
    tabs: ['Veg', 'Bestsellers', 'Mains', 'Beverages'],
    activeTab: 0,
    menuItems: [
      { emoji: '🧀', name: 'Paneer Tikka', desc: 'Cottage cheese cubes grilled with spices', price: '₹249', badge: 'Bestseller', veg: true },
      { emoji: '🍚', name: 'Veg Biryani', desc: 'Fragrant basmati rice with mix vegetables', price: '₹239', veg: true },
      { emoji: '🫘', name: 'Dal Makhani', desc: 'Slow cooked black lentils in rich gravy', price: '₹199', veg: true },
    ],
    chat: [
      { from: 'user', text: 'Show vegetarian dishes', delay: 0.3 },
      { from: 'ai', text: 'Here are our top-rated vegetarian dishes 🌿', delay: 1.1 },
      { from: 'ai', text: 'Paneer Tikka is our most ordered veg dish today! 🔥', delay: 1.9 },
    ],
    badge: { text: 'AI\nRecommendations', icon: Star, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    sideTag: null,
  },
  {
    id: 'questions',
    number: '4',
    label: 'Food Questions',
    subtitle: 'AI answers & guides instantly',
    accent: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    tabs: ['Recommended', 'Mains', 'Starters', 'Breads'],
    activeTab: 0,
    menuItems: [
      { emoji: '🌶️', name: 'Chicken Chettinad', desc: 'Spicy chettinad chicken in aromatic masala', price: '₹299', spicy: 3 },
      { emoji: '🍞', name: 'Butter Naan', desc: 'Soft & fluffy naan with butter', price: '₹59' },
      { emoji: '🧄', name: 'Garlic Naan', desc: 'Naan with garlic & coriander', price: '₹69' },
    ],
    chat: [
      { from: 'user', text: "What's spicy?", delay: 0.3 },
      { from: 'ai', text: 'Chicken Chettinad is our spiciest dish 🌶️🌶️🌶️', delay: 1.1, spicyCard: { label: 'Chicken Chettinad', price: '₹299', tag: 'Very Spicy' } },
      { from: 'ai', text: 'Customers who ordered this also liked Butter Naan.', delay: 2.6 },
    ],
    badge: { text: 'Smart\nSuggestions', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    sideTag: { text: 'AI Assistance', color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30' },
  },
]

const topStats = [
  { value: '+22%', label: 'Higher Order Value', icon: TrendingUp, color: 'text-orange-400' },
  { value: 'AI', label: 'Personalized For Every Customer', icon: Brain, color: 'text-purple-400' },
  { value: '↑', label: 'AI Upselling — Smart Recommendations', icon: Zap, color: 'text-yellow-400' },
  { value: '↩', label: 'Repeat Customers — Higher Retention', icon: RotateCcw, color: 'text-emerald-400' },
  { value: '⚡', label: 'Less Waiter Load — More Efficiency', icon: Globe, color: 'text-blue-400' },
]

/* ── Chat message component ────────────────────────────────── */
function ChatMsg({ msg, ucAccent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1.5`}
    >
      {msg.from === 'ai' && (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center flex-shrink-0 mb-0.5">
          <Brain className="w-2.5 h-2.5 text-white" />
        </div>
      )}
      <div className={`max-w-[82%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`text-[10px] leading-relaxed rounded-2xl px-2.5 py-1.5 ${
            msg.from === 'user'
              ? 'bg-orange-500 text-white rounded-tr-sm font-medium'
              : 'bg-white/10 text-gray-100 rounded-tl-sm border border-white/8'
          }`}
        >
          {msg.text}
        </div>
        {/* Reorder card */}
        {msg.reorder && (
          <div className="bg-white/8 border border-white/12 rounded-xl p-2 w-full">
            <p className="text-[9px] text-gray-400 mb-0.5">Your Last Order</p>
            <p className="text-[10px] font-semibold text-white">{msg.reorder.label}</p>
            <p className="text-[9px] text-gray-400 mb-1.5">{msg.reorder.meta}</p>
            <button className="w-full text-[9px] font-bold py-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center gap-1">
              <RotateCcw className="w-2.5 h-2.5" /> Reorder Now
            </button>
          </div>
        )}
        {/* Combo card */}
        {msg.card && (
          <div className="bg-white/8 border border-white/12 rounded-xl p-2 flex items-center justify-between w-full gap-2">
            <div>
              <p className="text-[10px] font-semibold text-white">{msg.card.label}</p>
              <p className="text-[9px] text-gray-400">{msg.card.desc}</p>
              <p className="text-[10px] font-bold text-orange-400">{msg.card.price}</p>
            </div>
            <button className="flex-shrink-0 text-[9px] font-bold px-2 py-1 rounded-lg bg-orange-500 text-white">
              {msg.card.action}
            </button>
          </div>
        )}
        {/* Spicy card */}
        {msg.spicyCard && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2 w-full">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-white">{msg.spicyCard.label}</p>
              <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-medium">{msg.spicyCard.tag}</span>
            </div>
            <p className="text-[10px] font-bold text-orange-400 mt-0.5">{msg.spicyCard.price}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Typing indicator ──────────────────────────────────────── */
function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-1.5">
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Brain className="w-2.5 h-2.5 text-white" />
      </div>
      <div className="bg-white/10 border border-white/8 rounded-2xl rounded-tl-sm px-2.5 py-2 flex gap-1 items-center">
        {[0, 1, 2].map((d) => (
          <motion.div key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Phone mockup ──────────────────────────────────────────── */
function PhoneMockup({ uc, direction }) {
  const [visibleMsgs, setVisibleMsgs] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setVisibleMsgs([])
    setIsTyping(false)
    const timers = []
    uc.chat.forEach((msg, i) => {
      if (msg.from === 'ai' && i > 0) {
        timers.push(setTimeout(() => setIsTyping(true), msg.delay * 1000 - 500))
      }
      timers.push(setTimeout(() => {
        setIsTyping(false)
        setVisibleMsgs((prev) => [...prev, msg])
      }, msg.delay * 1000))
    })
    return () => timers.forEach(clearTimeout)
  }, [uc.id])

  return (
    <motion.div
      key={uc.id}
      initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.97 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="w-[260px] flex-shrink-0"
    >
      {/* Phone shell */}
      <div className={`relative bg-[#0d0f17] rounded-[2.4rem] border-2 border-white/15 shadow-2xl ${uc.accent.glow} overflow-hidden`} style={{ boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 30px ${uc.id === 'upsell' ? 'rgba(249,115,22,0.12)' : uc.id === 'memory' ? 'rgba(168,85,247,0.12)' : uc.id === 'dietary' ? 'rgba(52,211,153,0.12)' : 'rgba(96,165,250,0.12)'}` }}>

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[9px] text-gray-400 font-medium">9:41</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 bg-gray-400 rounded-sm opacity-70" />
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">SG</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-none">Spice Garden</p>
              <p className="text-[9px] text-gray-400">Table 07</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-white/8 border border-white/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-[7px] text-white font-bold">2</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-3 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {uc.tabs.map((tab, i) => (
            <span
              key={tab}
              className={`flex-shrink-0 text-[9px] font-medium px-2.5 py-1 rounded-full transition-all ${
                i === uc.activeTab
                  ? `${uc.accent.bg} ${uc.accent.text} border ${uc.accent.border}`
                  : 'bg-white/6 text-gray-400 border border-white/8'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Menu items */}
        <div className="px-3 space-y-1.5 pb-1">
          {uc.menuItems.map((item, i) => (
            <div key={item.name} className="flex items-center gap-2.5 bg-white/4 border border-white/6 rounded-xl p-2">
              <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <p className="text-[10px] font-semibold text-white truncate">{item.name}</p>
                  {item.badge && <span className="text-[8px] bg-yellow-500/20 text-yellow-400 px-1 py-0.5 rounded flex-shrink-0">{item.badge}</span>}
                  {item.veg && <span className="w-3 h-3 rounded-sm border border-emerald-500 flex items-center justify-center flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" /></span>}
                  {item.spicy && <span className="text-[8px]">{'🌶️'.repeat(item.spicy)}</span>}
                </div>
                <p className="text-[8px] text-gray-500 truncate">{item.desc}</p>
                <p className="text-[10px] font-bold text-orange-400">{item.price}</p>
              </div>
              <button className="flex-shrink-0 w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">+</span>
              </button>
            </div>
          ))}
        </div>

        {/* AI Chat popup */}
        <div className="mx-2 mb-2 mt-2 bg-[#16181f] border border-white/12 rounded-2xl overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/8">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-white">AI Waiter</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] text-gray-500">online</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-white/8 flex items-center justify-center">
              <span className="text-[8px] text-gray-400">×</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="px-2.5 py-2 space-y-2 min-h-[100px]">
            <AnimatePresence mode="popLayout">
              {visibleMsgs.map((msg, i) => (
                <ChatMsg key={`${uc.id}-${i}`} msg={msg} ucAccent={uc.accent} />
              ))}
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="px-2.5 pb-2">
            <div className="flex items-center gap-1.5 bg-white/6 border border-white/10 rounded-xl px-2.5 py-1.5">
              <span className="text-[9px] text-gray-500 flex-1">Ask anything…</span>
              <div className="w-5 h-5 rounded-lg bg-orange-500 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main section ──────────────────────────────────────────── */
export default function AIChatbot() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef(null)

  const go = (idx) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const prev = () => go((active - 1 + useCases.length) % useCases.length)
  const next = () => go((active + 1) % useCases.length)

  // Auto-cycle every 7 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % useCases.length)
    }, 7000)
    return () => clearInterval(timerRef.current)
  }, [])

  const uc = useCases[active]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Brain className="w-3.5 h-3.5" /> AI POWERED ORDERING EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Meet Your{' '}
            <span className="text-gradient">AI Waiter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Customers scan a QR and interact naturally with AI Waiter to discover dishes,
            get recommendations, reorder favorites, and enjoy a{' '}
            <span className="text-orange-400 font-medium">personalized</span> dining experience.
          </p>
        </motion.div>

        {/* Top stats bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {topStats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 glass border border-white/10 rounded-xl px-4 py-2.5">
              <s.icon className={`w-4 h-4 ${s.color} flex-shrink-0`} />
              <span className="text-xs text-gray-300 font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Use case selector tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {useCases.map((u, i) => (
            <button
              key={u.id}
              onClick={() => { clearInterval(timerRef.current); go(i) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                active === i
                  ? `${u.accent.bg} ${u.accent.text} ${u.accent.border} shadow-lg`
                  : 'glass border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/8'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${active === i ? 'bg-white/20' : 'bg-white/8'}`}>
                {u.number}
              </span>
              <span className="hidden sm:block">{u.label}</span>
              <span className="sm:hidden text-xs">{u.number}</span>
            </button>
          ))}
        </div>

        {/* Main showcase */}
        <div className="flex items-center gap-8 lg:gap-12 justify-center">
          {/* Prev arrow */}
          <button onClick={() => { clearInterval(timerRef.current); prev() }} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Phone + context layout */}
          <div className="flex items-center gap-8 lg:gap-14 flex-1 justify-center">

            {/* Left — use case info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex flex-col gap-4 max-w-[220px]"
              >
                {/* Active badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl ${uc.accent.bg} border ${uc.accent.border}`}>
                  <uc.badge.icon className={`w-4 h-4 ${uc.badge.color}`} />
                  <span className={`text-xs font-bold ${uc.badge.color} whitespace-pre-line leading-tight`}>{uc.badge.text}</span>
                </div>

                {/* Subtitle */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Use case {uc.number}</p>
                  <p className="text-lg font-bold text-white leading-tight">{uc.label}</p>
                  <p className="text-sm text-gray-400 mt-1">{uc.subtitle}</p>
                </div>

                {/* Step bullets */}
                <div className="space-y-2">
                  {uc.chat.map((msg, i) => (
                    <div key={i} className={`flex gap-2 items-start ${visibleMsgs_ref(uc.chat, i) ? '' : 'opacity-40'}`}>
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[8px] font-bold ${msg.from === 'user' ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-gray-300'}`}>
                        {msg.from === 'user' ? 'U' : 'A'}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {uc.sideTag && (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${uc.sideTag.bg} border ${uc.sideTag.border} ${uc.sideTag.color} text-xs font-semibold self-start`}>
                    <Zap className="w-3 h-3" />
                    {uc.sideTag.text}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Phone mockup */}
            <div className="relative flex justify-center">
              {/* Glow */}
              <div className={`absolute inset-0 rounded-[3rem] blur-3xl opacity-30 ${uc.id === 'upsell' ? 'bg-orange-500/40' : uc.id === 'memory' ? 'bg-purple-500/40' : uc.id === 'dietary' ? 'bg-emerald-500/40' : 'bg-blue-500/40'}`} />
              <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <PhoneMockup key={uc.id} uc={uc} direction={direction} />
                </AnimatePresence>
              </div>
            </div>

            {/* Right — benefits */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`benefits-${active}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex flex-col gap-3 max-w-[220px]"
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest">Why it matters</p>
                {[
                  uc.id === 'upsell' && { icon: TrendingUp, text: 'Average order value increases by 22% with smart combos', color: 'text-orange-400' },
                  uc.id === 'memory' && { icon: RotateCcw, text: 'Personalised greetings increase repeat visit rate by 34%', color: 'text-purple-400' },
                  uc.id === 'dietary' && { icon: Brain, text: 'Filtered menus reduce decision time and increase satisfaction', color: 'text-emerald-400' },
                  uc.id === 'questions' && { icon: Zap, text: 'AI answers food questions instantly — no waiter needed', color: 'text-blue-400' },
                  { icon: Brain, text: 'AI learns and improves with every order placed', color: 'text-purple-400' },
                  { icon: Globe, text: 'Works in 10+ languages including Hindi & Tamil', color: 'text-blue-400' },
                ].filter(Boolean).slice(0, 3).map((b, i) => (
                  <div key={i} className="flex gap-2.5 items-start glass border border-white/8 rounded-xl p-3">
                    <b.icon className={`w-4 h-4 ${b.color} flex-shrink-0 mt-0.5`} />
                    <p className="text-xs text-gray-300 leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button onClick={() => { clearInterval(timerRef.current); next() }} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {useCases.map((u, i) => (
            <button
              key={u.id}
              onClick={() => { clearInterval(timerRef.current); go(i) }}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: active === i ? 32 : 8, background: 'rgba(255,255,255,0.15)' }}
            >
              {active === i && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                  className={`absolute inset-y-0 left-0 ${u.accent.bg.replace('/15', '')} rounded-full`}
                  style={{ background: u.id === 'upsell' ? '#f97316' : u.id === 'memory' ? '#a855f7' : u.id === 'dietary' ? '#10b981' : '#60a5fa' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bottom strip — Scan. Chat. Order. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass border border-white/10 rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
            <div className="text-center md:text-left md:w-48 flex-shrink-0">
              <p className="text-xl font-bold text-white">Scan. Chat. Order.</p>
              <p className="text-xs text-gray-400 mt-1">A smarter way to dine.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '📲', step: 'Scan QR', desc: 'at your table' },
                { icon: '🤖', step: 'Chat with your', desc: 'AI Waiter' },
                { icon: '🛒', step: 'Order your favorites', desc: 'instantly' },
                { icon: '😊', step: 'Enjoy your meal', desc: 'like never before' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div className="hidden md:block w-px h-8 bg-white/10" />}
                  <div className="flex flex-col items-center text-center gap-1">
                    <span className="text-2xl">{s.icon}</span>
                    <p className="text-xs font-semibold text-white leading-tight">{s.step}</p>
                    <p className="text-[10px] text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Helper to check visible messages (not used in render — just for the info panel opacity logic)
function visibleMsgs_ref(chat, index) { return true }
