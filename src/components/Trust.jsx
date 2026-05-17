import { motion } from 'framer-motion'

const metrics = [
  { value: '50K+', label: 'Orders Processed', suffix: '' },
  { value: '120+', label: 'Restaurants Onboarded', suffix: '' },
  { value: '32%', label: 'Faster Ordering', suffix: '' },
  { value: '18%', label: 'Increase in Repeat Customers', suffix: '' },
]

const restaurantBrands = [
  'The Spice Garden',
  'Café Bloom',
  'Biryani House',
  'Urban Grills',
  'CloudKitchen Co.',
  'Masala Twist',
]

export default function Trust() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="glass border border-white/10 rounded-2xl px-6 py-6 card-hover">
                <p className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{metric.value}</p>
                <p className="text-sm text-gray-400 font-medium leading-snug">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-8">
            Trusted by restaurants across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {restaurantBrands.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/8 text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/8 transition-all duration-200 cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
