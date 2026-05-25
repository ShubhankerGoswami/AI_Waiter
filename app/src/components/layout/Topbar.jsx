import { Bell, Search } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function Topbar({ title }) {
  const user = useAuthStore((s) => s.user)
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U'

  return (
    <header className="h-16 glass-dark border-b border-white/6 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-base font-semibold text-white">{title || 'Dashboard'}</h1>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500/40 w-44 transition-all"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.restaurantName || ''}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
