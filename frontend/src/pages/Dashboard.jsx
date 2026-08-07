import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import PlanBadge from '../components/dashboard/PlanBadge'
import { pricing } from '../data/content'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const activeTier = pricing.tiers.find((tier) => tier.id === user.plan)

  return (
    <DashboardLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user.company_name}</h1>
          <p className="mt-1 text-sm text-slate-400">Here's your RomaTech.Ai plan.</p>
        </div>
        <PlanBadge plan={user.plan} />
      </div>

      <div className="mt-8 max-w-xl">
        {activeTier ? (
          <div className="rounded-2xl border border-ice-500/30 bg-navy-800/60 p-6 sm:p-8">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-white">{activeTier.name}</h2>
              <p className="text-lg font-bold text-ice-500">
                ${activeTier.price}
                <span className="text-sm font-normal text-slate-400">{activeTier.cadence}</span>
              </p>
            </div>
            <p className="mt-1 text-sm text-slate-400">{activeTier.description}</p>

            <ul className="mt-6 flex flex-col gap-3">
              {activeTier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-ice-500" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 text-center sm:p-8">
            <h2 className="text-xl font-bold text-white">No active plan yet</h2>
            <p className="mt-2 text-sm text-slate-400">
              Choose a plan to get your AI agent answering calls and chats for your business.
            </p>
            <Link
              to="/#pricing"
              className="mt-6 inline-block rounded-full bg-ice-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-ice-400"
            >
              View Plans
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
