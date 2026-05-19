import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Gift, Star, Sparkles, Flame, ExternalLink } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

const chatScenarios = [
  {
    id: 'discount',
    icon: Gift,
    title: 'Discount Offers',
    description: 'Send time-sensitive discount codes to bring customers back on slow days.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    activeBorder: 'border-green-400',
    activeText: 'text-green-400',
    chat: [
      { from: 'bot', text: '👋 Hi Priya! It\'s been 2 weeks since your last visit.', time: '6:02 PM' },
      { from: 'bot', text: '🎁 We miss you! Here\'s a special 20% OFF for your next visit.\n\nCode: COMEBACK20\nValid till Sunday 🗓', time: '6:02 PM' },
      { from: 'user', text: 'Oh wow, thank you! 😍 Will definitely come this weekend.', time: '6:04 PM' },
      { from: 'bot', text: '🙌 Awesome! Your table will be ready. See you soon, Priya!', time: '6:04 PM' },
      { from: 'bot', text: '⭐ Enjoy your meal! Don\'t forget to share your feedback.', time: '8:45 PM' },
    ],
  },
  {
    id: 'newdish',
    icon: Sparkles,
    title: 'New Dish Launch',
    description: 'Announce new menu additions to your regulars and drive first-try orders.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    activeBorder: 'border-orange-400',
    activeText: 'text-orange-400',
    chat: [
      { from: 'bot', text: '🍽️ Hi Rahul! Chef just added something special to our menu!', time: '12:30 PM' },
      { from: 'bot', text: '🆕 Introducing — Truffle Mushroom Risotto 🍄\n\nCreamy arborio rice, wild mushrooms & truffle oil.\n\n✨ Only ₹349 | Limited qty today!', time: '12:31 PM' },
      { from: 'user', text: 'Looks absolutely delicious! Can I pre-order for tonight? 🤤', time: '12:35 PM' },
      { from: 'bot', text: '🎉 Done! Table confirmed for 7:30 PM. Chef will prepare it fresh just for you!', time: '12:36 PM' },
    ],
  },
  {
    id: 'festive',
    icon: Flame,
    title: 'Festive Offers',
    description: 'Launch Diwali, Christmas & New Year specials that drive group bookings.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    activeBorder: 'border-yellow-400',
    activeText: 'text-yellow-400',
    chat: [
      { from: 'bot', text: '🪔 Hi Meera! Diwali is just 3 days away!', time: '2:00 PM' },
      { from: 'bot', text: '✨ Spice Garden Diwali Special Thali\n\n5-course festive feast — ₹799\n• Paneer Tikka Masala\n• Dal Baati Churma\n• Gulab Jamun & Kheer 🍮\n\nValid 20–24 Oct only 🎁', time: '2:01 PM' },
      { from: 'user', text: 'Perfect for our family gathering! Booking for 8 people 🥰', time: '2:05 PM' },
      { from: 'bot', text: '🙏 Wonderful! Book now and get a complimentary sweet box for the whole family! 🎊', time: '2:06 PM' },
    ],
  },
  {
    id: 'loyalty',
    icon: Star,
    title: 'Loyalty Rewards',
    description: 'Automatically reward repeat customers with exclusive perks and points.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    activeBorder: 'border-purple-400',
    activeText: 'text-purple-400',
    chat: [
      { from: 'bot', text: '🌟 Congrats Arjun! You\'ve reached Gold Member status!', time: '7:15 PM' },
      { from: 'bot', text: '🏆 Your Gold perks are now unlocked:\n\n✓ Free dessert every visit\n✓ Priority table booking\n✓ 10% off on all orders\n\nYour points: 2,450 🎯', time: '7:15 PM' },
      { from: 'user', text: 'This is awesome! Coming this Friday with friends 🎉', time: '7:20 PM' },
      { from: 'bot', text: '🎊 Friday\'s all set for you! Your Gold perks will be waiting 😊', time: '7:21 PM' },
    ],
  },
  {
    id: 'orderlinks',
    icon: ExternalLink,
    title: 'Swiggy & Zomato Links',
    description: 'Auto-send direct order links for trending dishes, new launches, or festive specials — customers tap and order instantly.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    activeBorder: 'border-rose-400',
    activeText: 'text-rose-400',
    chat: [
      { from: 'bot', text: '🔥 Hi Neha! Butter Chicken is our #1 dish this week — 340 orders and counting!', time: '1:00 PM' },
      {
        from: 'bot',
        text: 'Craving it? Order right now from your favourite app 👇',
        time: '1:00 PM',
        orderLinks: {
          emoji: '🍛',
          dish: 'Butter Chicken',
          tag: '#1 This Week',
          price: '₹299',
          swiggyUrl: '#',
          zomatoUrl: '#',
        },
      },
      { from: 'user', text: 'Omg yes! Adding to my Swiggy cart right now 🛒😍', time: '1:04 PM' },
      { from: 'bot', text: '🎉 Enjoy! Use code SPICE10 for 10% off on your order!', time: '1:05 PM' },
    ],
  },
]

const stats = [
  { value: '340+', label: 'Messages Sent' },
  { value: '68%', label: 'Open Rate' },
  { value: '24%', label: 'Conversion' },
]

export default function WhatsApp() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  const scenario = chatScenarios[activeIdx]

  const select = (idx) => {
    setDirection(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
    track(EVENTS.WA_SCENARIO_SWITCHED, { scenario: chatScenarios[idx].id, index: idx })
  }

  return (
    <section id="whatsapp" className="py-24 relative overflow-hidden">
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
            beingCogni AI Waiter automatically captures customer numbers and sends
            hyper-personalised WhatsApp campaigns that bring them back — on autopilot.
          </p>
        </motion.div>

        {/* ── Scenario tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {chatScenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => select(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                activeIdx === i
                  ? `${s.bg} ${s.color} ${s.activeBorder} shadow-lg`
                  : 'glass border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/8'
              }`}
            >
              <s.icon className={`w-4 h-4 flex-shrink-0 ${activeIdx === i ? s.color : 'text-gray-500'}`} />
              <span>{s.title}</span>
              {activeIdx === i && (
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              )}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Phone mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-2xl scale-105" />

              <div className="relative w-72 bg-[#0d1117] rounded-[2.5rem] border border-white/15 shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="bg-[#0d1117] px-6 pt-4 pb-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-600 rounded-sm" />
                  </div>
                </div>

                {/* WA header */}
                <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">beingCogni AI Waiter</p>
                    <p className="text-green-200 text-[10px] mt-0.5">Business Account ✓</p>
                  </div>
                </div>

                {/* Scenario label pill */}
                <div className="bg-[#0b141a] pt-2.5 px-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${scenario.bg} border ${scenario.border}`}
                    >
                      <scenario.icon className={`w-3 h-3 ${scenario.color}`} />
                      <span className={`text-[9px] font-bold ${scenario.color} uppercase tracking-wide`}>{scenario.title}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Chat messages */}
                <div className="bg-[#0b141a] px-3 pt-2 pb-3 min-h-[320px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={scenario.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 48 : -48 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -48 : 48 }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                      className="space-y-3"
                    >
                      {scenario.chat.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[82%] flex flex-col gap-1.5 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`rounded-2xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-wrap w-full ${
                                msg.from === 'user'
                                  ? 'bg-[#005c4b] text-white rounded-tr-sm'
                                  : 'bg-[#202c33] text-gray-100 rounded-tl-sm'
                              }`}
                            >
                              {msg.text}
                              <p className="text-[9px] text-gray-400 mt-1 text-right">{msg.time} ✓✓</p>
                            </div>

                            {/* Swiggy & Zomato order link card */}
                            {msg.orderLinks && (
                              <div className="w-full bg-[#1a2230] border border-white/12 rounded-xl overflow-hidden">
                                {/* Dish info */}
                                <div className="flex items-center gap-2.5 px-3 py-2 border-b border-white/8">
                                  <span className="text-2xl">{msg.orderLinks.emoji}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <p className="text-[11px] font-bold text-white truncate">{msg.orderLinks.dish}</p>
                                      <span className="text-[8px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">{msg.orderLinks.tag}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-orange-400">{msg.orderLinks.price}</p>
                                  </div>
                                </div>
                                {/* Platform buttons */}
                                <div className="flex gap-0 divide-x divide-white/8">
                                  <a
                                    href={msg.orderLinks.swiggyUrl}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
                                    style={{ background: 'linear-gradient(135deg, #fc8019 0%, #e37023 100%)' }}
                                  >
                                    <span>🛵</span> Swiggy
                                  </a>
                                  <a
                                    href={msg.orderLinks.zomatoUrl}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
                                    style={{ background: 'linear-gradient(135deg, #e23744 0%, #cb202d 100%)' }}
                                  >
                                    <span>🍽️</span> Zomato
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
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

          {/* ── Right panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Scenario selector cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {chatScenarios.map((camp, i) => {
                const isLast = i === chatScenarios.length - 1
                return (
                  <motion.button
                    key={camp.id}
                    onClick={() => select(i)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className={`glass rounded-2xl p-4 text-left transition-all duration-300 border ${isLast ? 'col-span-2' : ''} ${
                      activeIdx === i
                        ? `${camp.activeBorder} ${camp.bg} shadow-lg`
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {isLast ? (
                      /* Full-width horizontal layout for the 5th card */
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${camp.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${activeIdx === i ? 'scale-110' : ''}`}>
                          <camp.icon className={`w-5 h-5 ${camp.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h4 className={`text-sm font-bold transition-colors duration-200 ${activeIdx === i ? camp.activeText : 'text-white'}`}>
                              {camp.title}
                            </h4>
                            {/* Brand pills */}
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#fc8019,#e37023)' }}>🛵 Swiggy</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#e23744,#cb202d)' }}>🍽️ Zomato</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{camp.description}</p>
                        </div>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`flex items-center gap-1 text-[10px] font-semibold ${camp.color} flex-shrink-0`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            Showing preview
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      /* Normal vertical layout for first 4 cards */
                      <>
                        <div className={`w-9 h-9 rounded-xl ${camp.bg} flex items-center justify-center mb-3 transition-transform duration-300 ${activeIdx === i ? 'scale-110' : ''}`}>
                          <camp.icon className={`w-[18px] h-[18px] ${camp.color}`} />
                        </div>
                        <h4 className={`text-sm font-bold mb-1 transition-colors duration-200 ${activeIdx === i ? camp.activeText : 'text-white'}`}>
                          {camp.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{camp.description}</p>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`mt-2 flex items-center gap-1 text-[10px] font-semibold ${camp.color}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            Showing preview
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.button>
                )
              })}
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
