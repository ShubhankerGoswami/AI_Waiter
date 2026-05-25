import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, Users, Star, ArrowUpRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const metrics = [
  {
    label: "Today's Revenue",
    value: '₹24,350',
    change: '+12.4% from yesterday',
    icon: TrendingUp,
    colorClass: 'from-orange-500/15 to-orange-500/5 border-orange-500/20 text-orange-400',
  },
  {
    label: 'Orders Today',
    value: '142',
    change: '+8 from yesterday',
    icon: ShoppingBag,
    colorClass: 'from-blue-500/15 to-blue-500/5 border-blue-500/20 text-blue-400',
  },
  {
    label: 'Active Customers',
    value: '1,284',
    change: '+23 this week',
    icon: Users,
    colorClass: 'from-purple-500/15 to-purple-500/5 border-purple-500/20 text-purple-400',
  },
  {
    label: 'Avg Rating',
    value: '4.8',
    change: '+0.2 this month',
    icon: Star,
    colorClass: 'from-yellow-500/15 to-yellow-500/5 border-yellow-500/20 text-yellow-400',
  },
]

const recentOrders = [
  { id: 1001, table: 4, items: 3, amount: 1240, status: 'Served' },
  { id: 1002, table: 7, items: 2, amount: 680, status: 'Preparing' },
  { id: 1003, table: 2, items: 5, amount: 2150, status: 'Served' },
  { id: 1004, table: 11, items: 1, amount: 420, status: 'Pending' },
  { id: 1005, table: 6, items: 4, amount: 1890, status: 'Served' },
]

const statusColors = {
  Served: 'bg-green-500/10 text-green-400',
  Preparing: 'bg-orange-500/10 text-orange-400',
  Pending: 'bg-gray-500/10 text-gray-400',
}

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {greeting}, {user?.name?.split(' ')[0] || 'there'}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening at{' '}
          <span className="text-gray-300">{user?.restaurantName || 'your restaurant'}</span> today.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl p-5 bg-gradient-to-br border ${m.colorClass}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium leading-tight">{m.label}</p>
              <m.icon className="w-4 h-4 shrink-0" />
            </div>
            <p className="text-2xl font-bold text-white">{m.value}</p>
            <p className="text-xs mt-1.5 flex items-center gap-1 opacity-80">
              <ArrowUpRight className="w-3 h-3" />
              {m.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-white">Recent Orders</h3>
          <button className="text-xs text-orange-400 hover:text-orange-300 transition-colors font-medium">
            View all
          </button>
        </div>

        <div className="space-y-1">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-white/3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">
                    Table {order.table} · {order.items} item{order.items !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-white">₹{order.amount.toLocaleString('en-IN')}</p>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
