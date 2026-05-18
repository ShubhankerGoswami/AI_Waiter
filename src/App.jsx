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

function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trust />
      <Problem />
      <AIChatbot />
      <AIMenuUpload />
      <Features />
      <Dashboard />
      <HowItWorks />
      <WhatsApp />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
