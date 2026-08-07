import { CalendarCheck, DollarSign, Moon, PhoneCall } from 'lucide-react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import PlanBadge from '../components/dashboard/PlanBadge'
import ProfilePanel from '../components/dashboard/ProfilePanel'
import StatCard from '../components/dashboard/StatCard'
import { useAuth } from '../context/AuthContext'

// Placeholder figures until call/booking data is wired up to a real backend feed.
const PLACEHOLDER_STATS = [
  { icon: PhoneCall, label: 'Calls Answered', value: '128', hint: 'Last 30 days' },
  { icon: CalendarCheck, label: 'Jobs Booked', value: '34', hint: 'Last 30 days' },
  { icon: Moon, label: 'After-Hours Captures', value: '19', hint: 'Calls answered outside 8am–5pm' },
  { icon: DollarSign, label: 'Estimated Revenue Saved', value: '$11,900', hint: 'Based on your average job value' },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user.company_name}</h1>
          <p className="mt-1 text-sm text-slate-400">Here's how RomaTech.Ai has been working for you.</p>
        </div>
        <PlanBadge plan={user.plan} />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-10 max-w-xl">
        <ProfilePanel />
      </div>
    </DashboardLayout>
  )
}
