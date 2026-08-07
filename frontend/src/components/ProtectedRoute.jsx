import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
