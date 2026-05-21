import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Problem from './components/Problem'
import BusinessOutcomes from './components/BusinessOutcomes'
import AIChatbot from './components/AIChatbot'
import AIMenuUpload from './components/AIMenuUpload'
import Features from './components/Features'
import Dashboard from './components/Dashboard'
import HowItWorks from './components/HowItWorks'
import WhatsApp from './components/WhatsApp'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { track, EVENTS } from './lib/analytics'

// Sections to observe — must match the id="" on each <section> element
const SECTION_IDS = ['hero', 'trust', 'problem', 'outcomes', 'demo', 'whatsapp', 'features', 'dashboard', 'how-it-works', 'testimonials', 'pricing', 'waitlist']
const SCROLL_MILESTONES = [25, 50, 75, 90]

function useAnalytics() {
  const firedSections = useRef(new Set())
  const firedScrolls = useRef(new Set())

  useEffect(() => {
    // Section view tracking via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting && id && !firedSections.current.has(id)) {
            firedSections.current.add(id)
            track(EVENTS.SECTION_VIEWED, { section: id })
          }
        })
      },
      { threshold: 0.3 }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Scroll depth tracking
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)
      SCROLL_MILESTONES.forEach((milestone) => {
        if (pct >= milestone && !firedScrolls.current.has(milestone)) {
          firedScrolls.current.add(milestone)
          track(EVENTS.SCROLL_DEPTH, { percent: milestone })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/918527534288?text=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20for%20AIWaiter"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => track(EVENTS.CTA_CLICKED, { location: 'floating_whatsapp', label: 'book_demo_whatsapp' })}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl shadow-green-500/30 transition-all duration-200 group"
      style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
      aria-label="Book Demo on WhatsApp"
    >
      {/* WhatsApp icon */}
      <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="text-white text-xs font-bold leading-tight hidden sm:block">Book Demo on WhatsApp</span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: '#25D366' }} />
    </motion.a>
  )
}

function App() {
  useAnalytics()

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trust />
      <Problem />
      <BusinessOutcomes />
      <AIChatbot />
      <WhatsApp />
      <AIMenuUpload />
      <Features />
      <Dashboard />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
