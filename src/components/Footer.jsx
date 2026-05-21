import { motion } from 'framer-motion'
import { Globe, AtSign, Hash, ExternalLink } from 'lucide-react'
import beingCogniLogo from '../assets/being_cogni_dark_logo.png'

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'QR Ordering', href: '#features' },
      { label: 'AI Analytics', href: '#dashboard' },
      { label: 'WhatsApp Engine', href: '#whatsapp' },
      { label: 'Voice AI', href: '#features' },
      { label: 'Menu Onboarding', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partners', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book a Demo', href: '#demo' },
      { label: 'Support', href: '#' },
      { label: 'hello@aiwaiter.beingcogni.com', href: 'mailto:hello@aiwaiter.beingcogni.com', small: true },
      { label: '+91 98765 43210', href: 'tel:+919876543210', small: true },
    ],
  },
]

const socials = [
  { icon: AtSign, href: '#', label: 'Twitter / X' },
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: Hash, href: '#', label: 'Instagram' },
  { icon: ExternalLink, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 pt-16 pb-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4">
              <img src="/ai-waiter-logo.svg" alt="AI Waiter" style={{ height: 48 }} />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-2 max-w-xs">
              AI-powered restaurant ordering, analytics, and customer retention platform by beingCogni.
            </p>
            <p className="text-xs text-gray-600 mb-5 max-w-xs">Built for modern restaurants, cafes, QSRs, and cloud kitchens.</p>

            {/* beingCogni brand attribution */}
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">A product of</span>
              <img src={beingCogniLogo} alt="beingCogni" className="w-44 h-auto object-contain -ml-3" />
            </div>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-gray-500 hover:text-gray-200 transition-colors duration-200 ${link.small ? 'text-xs' : 'text-sm'}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <p className="text-xs text-gray-600">© 2026 AI Waiter. A product of</p>
            <img src={beingCogniLogo} alt="beingCogni" className="w-24 h-auto object-contain -my-3" />
            <p className="text-xs text-gray-600">All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
