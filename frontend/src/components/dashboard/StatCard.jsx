export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
      <div className="flex items-center gap-2 text-slate-400">
        {Icon && <Icon size={16} aria-hidden="true" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}
