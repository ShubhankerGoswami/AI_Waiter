import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Problem from './components/Problem'
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
const SECTION_IDS = ['hero', 'trust', 'problem', 'demo', 'whatsapp', 'features', 'dashboard', 'how-it-works', 'testimonials', 'pricing', 'waitlist']
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

function App() {
  useAnalytics()

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trust />
      <Problem />
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
    </div>
  )
}

export default App
