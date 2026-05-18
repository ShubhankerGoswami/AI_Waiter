import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Brain, CheckCircle, Sparkles, Zap, Tag, List } from 'lucide-react'

const badges = [
  { icon: Brain, label: 'AI OCR Enabled', color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/25' },
  { icon: List, label: 'Auto Categorization', color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/25' },
  { icon: Zap, label: 'Instant Menu Setup', color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/25' },
  { icon: Tag, label: 'Price Extraction', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25' },
]

const extractedDishes = [
  { name: 'Paneer Tikka', price: '₹280', category: 'Starters', desc: 'Grilled cottage cheese with spices' },
  { name: 'Veg Biryani', price: '₹220', category: 'Mains', desc: 'Aromatic basmati rice with vegetables' },
  { name: 'Garlic Naan', price: '₹60', category: 'Breads', desc: 'Freshly baked with garlic butter' },
  { name: 'Cold Coffee', price: '₹120', category: 'Beverages', desc: 'Chilled coffee with cream' },
  { name: 'Gulab Jamun', price: '₹80', category: 'Desserts', desc: 'Soft dumplings in sugar syrup' },
]

const steps = [
  {
    id: 1,
    icon: Upload,
    title: 'Upload',
    desc: 'PDF or image menu',
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
  },
  {
    id: 2,
    icon: Brain,
    title: 'AI Scans',
    desc: 'OCR + extraction',
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/30',
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Menu Ready',
    desc: 'Live in seconds',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
  },
]

function ScanningDocument({ isScanning }) {
  return (
    <div className="relative w-full bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
      {/* Document header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
        <FileText className="w-4 h-4 text-orange-400" />
        <span className="text-xs text-gray-300 font-medium">restaurant_menu.pdf</span>
        <span className="ml-auto text-[10px] text-gray-500">2.4 MB</span>
      </div>

      {/* Document content mock */}
      <div className="p-4 space-y-3 relative">
        {/* Scanning beam */}
        {isScanning && (
          <motion.div
            initial={{ top: '10%' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-0.5 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(251,146,60,0.8), transparent)',
              boxShadow: '0 0 12px rgba(168,85,247,0.5)',
            }}
          />
        )}
        {isScanning && (
          <motion.div
            initial={{ top: '10%' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-16 z-10 pointer-events-none opacity-10"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.3), transparent)',
            }}
          />
        )}

        {/* Menu text lines mock */}
        <div className="space-y-2">
          {[
            { w: 'w-32', text: 'STARTERS', bold: true },
            { w: 'w-full', text: 'Paneer Tikka ..... ₹280' },
            { w: 'w-5/6', text: 'Chicken Seekh ..... ₹320' },
            { w: 'w-4/6', text: 'Veg Samosa ..... ₹80' },
            { w: 'w-28', text: 'MAIN COURSE', bold: true },
            { w: 'w-full', text: 'Veg Biryani ..... ₹220' },
            { w: 'w-5/6', text: 'Dal Makhani ..... ₹180' },
            { w: 'w-4/6', text: 'Shahi Paneer ..... ₹260' },
            { w: 'w-24', text: 'BREADS', bold: true },
            { w: 'w-3/4', text: 'Garlic Naan ..... ₹60' },
            { w: 'w-2/3', text: 'Tandoori Roti ..... ₹40' },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={isScanning ? { opacity: [0.3, 0.9, 0.3] } : { opacity: 0.5 }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: isScanning ? Infinity : 0 }}
              className={`h-2.5 rounded-sm ${line.bold ? 'bg-white/40' : 'bg-white/15'} ${line.w}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ExtractedMenu() {
  return (
    <div className="w-full bg-[#0d1117] border border-emerald-500/20 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-emerald-500/5">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-400 font-medium">Digital Menu Generated</span>
        <span className="ml-auto text-[10px] text-gray-500">48 dishes extracted</span>
      </div>
      <div className="p-3 space-y-2">
        {extractedDishes.map((dish, i) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center justify-between bg-white/4 border border-white/6 rounded-lg px-3 py-2"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-white truncate">{dish.name}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20 flex-shrink-0">{dish.category}</span>
              </div>
              <p className="text-[10px] text-gray-500 truncate">{dish.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="text-xs font-bold text-emerald-400">{dish.price}</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </motion.div>
        ))}
        <div className="text-center py-1">
          <span className="text-[10px] text-gray-500">+ 43 more dishes extracted</span>
        </div>
      </div>
    </div>
  )
}

export default function AIMenuUpload() {
  const [phase, setPhase] = useState('upload') // upload | scanning | done
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scanning'), 1800)
    const t2 = setTimeout(() => setPhase('done'), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase !== 'scanning') return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [phase])

  // Loop the animation
  useEffect(() => {
    if (phase !== 'done') return
    const t = setTimeout(() => {
      setPhase('upload')
      setProgress(0)
      setTimeout(() => setPhase('scanning'), 1800)
      setTimeout(() => setPhase('done'), 5000)
    }, 4000)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Animated Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-orange-500/10 rounded-3xl blur-2xl" />

            <div className="relative space-y-4">
              {/* Step indicators */}
              <div className="flex items-center gap-2">
                {steps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-2 flex-1">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                      (phase === 'upload' && step.id === 1) ||
                      (phase === 'scanning' && step.id === 2) ||
                      (phase === 'done' && step.id === 3)
                        ? `${step.bg} ${step.border}`
                        : 'bg-white/4 border-white/8'
                    } transition-all duration-500`}>
                      <step.icon className={`w-3.5 h-3.5 ${
                        (phase === 'upload' && step.id === 1) ||
                        (phase === 'scanning' && step.id === 2) ||
                        (phase === 'done' && step.id === 3) ? step.color : 'text-gray-600'
                      } transition-colors duration-500`} />
                      <span className="text-[10px] font-medium text-gray-300">{step.title}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-px bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-purple-500"
                          animate={{ width: phase !== 'upload' && i === 0 ? '100%' : phase === 'done' && i === 1 ? '100%' : '0%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main visual area */}
              <AnimatePresence mode="wait">
                {phase === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="glass border border-white/10 rounded-2xl p-6"
                  >
                    <div className="border-2 border-dashed border-orange-500/30 rounded-xl p-8 text-center bg-orange-500/5 hover:bg-orange-500/8 transition-colors">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center mx-auto mb-4"
                      >
                        <Upload className="w-8 h-8 text-orange-400" />
                      </motion.div>
                      <p className="text-white font-semibold mb-1">Drop your menu here</p>
                      <p className="text-gray-400 text-sm">PDF, JPG, PNG — any format works</p>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium">
                        <FileText className="w-3.5 h-3.5" />
                        restaurant_menu.pdf
                      </div>
                    </div>
                  </motion.div>
                )}

                {phase === 'scanning' && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass border border-purple-500/20 rounded-2xl p-4 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">AI scanning your menu…</p>
                        <p className="text-xs text-gray-400">Extracting dishes, prices & categories</p>
                      </div>
                      <span className="text-xs font-bold text-purple-400">{progress}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/6 rounded-full h-1.5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-orange-500"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>

                    <ScanningDocument isScanning />

                    {/* Live extraction feed */}
                    <div className="space-y-1.5">
                      {['✓ Starters (8 dishes)', '✓ Main Course (14 dishes)', '⟳ Scanning Desserts…'].map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.4 }}
                          className="flex items-center gap-2"
                        >
                          <span className={`text-[11px] font-medium ${item.startsWith('✓') ? 'text-emerald-400' : 'text-yellow-400'}`}>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass border border-emerald-500/20 rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Menu live in 8 seconds!</p>
                        <p className="text-xs text-gray-400">48 dishes extracted and structured</p>
                      </div>
                      <Sparkles className="w-4 h-4 text-yellow-400 ml-auto" />
                    </div>
                    <ExtractedMenu />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating badges */}
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.bg} border ${badge.border} text-xs font-medium ${badge.color}`}
                  >
                    <badge.icon className="w-3 h-3" />
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              AI Menu Onboarding
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Upload Your Menu.{' '}
              <span className="text-gradient">AI Does The Rest.</span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Simply upload your restaurant menu as a PDF or image. beingCogni AI Waiter automatically extracts dishes, prices, categories, and creates your complete digital ordering experience in seconds.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  step: '01',
                  title: 'Upload any format',
                  desc: 'PDF, JPG, PNG, even a photo of your printed menu — our AI handles it all.',
                  color: 'text-orange-400',
                  bg: 'bg-orange-500/10',
                },
                {
                  step: '02',
                  title: 'AI extracts everything',
                  desc: 'Dish names, prices, descriptions, and categories are pulled out automatically using OCR + AI.',
                  color: 'text-purple-400',
                  bg: 'bg-purple-500/10',
                },
                {
                  step: '03',
                  title: 'Digital menu goes live',
                  desc: 'Your QR ordering experience is ready. Customers can order within seconds of scanning.',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/10',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`text-xs font-bold ${item.color}`}>{item.step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Setup time: under 2 minutes</p>
                <p className="text-xs text-gray-400">vs. 4–8 hours of manual menu entry on other platforms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
