const PLAN_LABELS = {
  none: 'No Plan',
  starter: 'Starter',
  growth: 'Growth',
  premium: 'Premium',
}

export default function PlanBadge({ plan }) {
  const isActive = plan && plan !== 'none'
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isActive ? 'bg-ice-500/15 text-ice-500' : 'bg-white/10 text-slate-400'
      }`}
    >
      {PLAN_LABELS[plan] || plan}
    </span>
  )
}
