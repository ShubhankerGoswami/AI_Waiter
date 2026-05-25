import { Outlet, useLocation } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/menu': 'Menu Management',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/campaigns': 'Campaigns',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export default function AppShell() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={PAGE_TITLES[pathname] || 'AIWaiter'} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
