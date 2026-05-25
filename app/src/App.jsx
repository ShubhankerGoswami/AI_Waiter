import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from './store/authStore'
import Login from './routes/auth/Login'
import Register from './routes/auth/Register'
import Onboarding from './routes/onboarding'
import Dashboard from './routes/dashboard'
import AppShell from './components/layout/AppShell'

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

// Redirects to onboarding if the user hasn't completed it yet
function OnboardedRoute({ children }) {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user?.is_onboarded) return <Navigate to="/onboarding" replace />
  return children
}

// Prevents already-onboarded users from revisiting /onboarding
function OnboardingGate({ children }) {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.is_onboarded) return <Navigate to="/dashboard" replace />
  return children
}

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <GuestRoute><Login /></GuestRoute> },
  { path: '/register', element: <GuestRoute><Register /></GuestRoute> },
  {
    path: '/onboarding',
    element: <OnboardingGate><Onboarding /></OnboardingGate>,
  },
  {
    path: '/',
    element: <OnboardedRoute><AppShell /></OnboardedRoute>,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
])

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}
