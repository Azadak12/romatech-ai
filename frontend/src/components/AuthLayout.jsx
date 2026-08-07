import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(232,179,74,0.14),transparent)]"
      />
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 block text-center text-xl font-bold tracking-tighter text-white">
          Roma<span className="text-gold-500">Tech</span>.Ai
        </Link>
        <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-8">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
