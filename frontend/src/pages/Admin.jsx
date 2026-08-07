import DashboardLayout from '../components/dashboard/DashboardLayout'
import LeadsTable from '../components/dashboard/LeadsTable'
import UsersTable from '../components/dashboard/UsersTable'

export default function Admin() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white">Admin</h1>
      <p className="mt-1 text-sm text-slate-400">Leads and registered accounts across RomaTech.Ai.</p>

      <div className="mt-8 flex flex-col gap-8">
        <LeadsTable />
        <UsersTable />
      </div>
    </DashboardLayout>
  )
}
