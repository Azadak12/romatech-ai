import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-bold tracking-tighter text-white">
            Roma<span className="text-gold-500">Tech</span>.Ai
          </Link>

          <nav className="flex items-center gap-6" aria-label="Portal">
            {user?.role === 'admin' && (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/admin" className="text-sm font-medium text-slate-300 hover:text-white">
                  Admin
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              <LogOut size={15} aria-hidden="true" />
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}
