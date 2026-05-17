import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Owner',
    restaurant: 'Spice Garden, Mumbai',
    avatar: 'RM',
    avatarColor: 'from-orange-400 to-red-500',
    quote:
      'beingCogni AI Waiter completely transformed our weekend operations. Our waiters used to get overwhelmed, but now tables order themselves. We\'ve cut peak-hour chaos by 60% and repeat customers are up by 21% in just one month.',
    metric: '+21% Repeat Customers',
    metricColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    stars: 5,
  },
  {
    name: 'Ananya Sharma',
    role: 'Co-Founder',
    restaurant: 'Café Bloom, Bangalore',
    avatar: 'AS',
    avatarColor: 'from-purple-400 to-pink-500',
    quote:
      'The AI dashboard alone is worth it. I used to guess which dishes to promote — now beingCogni AI Waiter tells me exactly what to push and when. Our cold coffee campaign ran automatically and added ₹80,000 in a single week.',
    metric: '₹80K Extra Revenue',
    metricColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    stars: 5,
  },
  {
    name: 'Vikram Patel',
    role: 'Director',
    restaurant: 'Urban Grills, Delhi NCR',
    avatar: 'VP',
    avatarColor: 'from-blue-400 to-cyan-500',
    quote:
      'We run 3 outlets and managing customer retention across all of them was impossible. beingCogni AI Waiter\'s WhatsApp automation handles it for all three. The ROI was visible in the very first week of the pilot.',
    metric: '3 Outlets Automated',
    metricColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-yellow-400 uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Restaurant Owners{' '}
            <span className="text-gradient">Love beingCogni AI Waiter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real results from real restaurants. Here's what our early partners say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass border border-white/10 rounded-2xl p-6 card-hover flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              {/* Metric badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border mb-5 self-start ${t.metricColor}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                {t.metric}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.restaurant}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 glass border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex -space-x-2">
              {['RM','AS','VP','MK','SK'].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#030712] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `hsl(${i * 60 + 20}, 70%, 45%)` }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">120+ restaurants growing with beingCogni AI Waiter</p>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-xs text-gray-400 ml-1">4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
