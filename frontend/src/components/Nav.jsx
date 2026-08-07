import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setDrawerOpen(false)
    await logout()
    navigate('/')
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-navy-950/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Primary">
        <a href="#hero" className="text-xl font-bold tracking-tighter text-white">
          Roma<span className="text-ice-500">Tech</span>.Ai
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500 rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500 rounded"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500 rounded"
              >
                Login
              </Link>
              <a
                href="#book-a-call"
                className="rounded-full bg-ice-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-ice-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Book a Call
              </a>
            </>
          )}
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        >
          {drawerOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-950 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block py-2.5 text-base font-medium text-slate-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {isAuthenticated ? (
                <>
                  <li className="mt-2 border-t border-white/10 pt-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setDrawerOpen(false)}
                      className="block py-2.5 text-base font-medium text-slate-300 hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 block w-full rounded-full border border-white/20 px-5 py-3 text-center text-base font-semibold text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mt-2 border-t border-white/10 pt-4">
                    <Link
                      to="/login"
                      onClick={() => setDrawerOpen(false)}
                      className="block py-2.5 text-base font-medium text-slate-300 hover:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#book-a-call"
                      onClick={() => setDrawerOpen(false)}
                      className="mt-2 block rounded-full bg-ice-500 px-5 py-3 text-center text-base font-semibold text-navy-950"
                    >
                      Book a Call
                    </a>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
