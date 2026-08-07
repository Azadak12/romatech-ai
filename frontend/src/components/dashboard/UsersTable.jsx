import { useEffect, useState } from 'react'
import { api, getErrorMessage } from '../../lib/api'
import PlanBadge from './PlanBadge'

export default function UsersTable() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function fetchUsers() {
      try {
        const { data } = await api.get('/admin/users')
        if (!cancelled) setUsers(data)
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't load users."))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchUsers()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
      <h2 className="text-lg font-semibold text-white">Registered Users</h2>

      <div className="mt-5 overflow-x-auto">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-slate-400">Loading users…</p>
        ) : error ? (
          <p role="alert" className="py-8 text-center text-sm text-red-400">
            {error}
          </p>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No registered users yet.</p>
        ) : (
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th scope="col" className="py-3 pr-4 font-medium">Name</th>
                <th scope="col" className="py-3 pr-4 font-medium">Company</th>
                <th scope="col" className="py-3 pr-4 font-medium">Email</th>
                <th scope="col" className="py-3 pr-4 font-medium">Role</th>
                <th scope="col" className="py-3 pr-4 font-medium">Plan</th>
                <th scope="col" className="py-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 text-slate-200">
                  <td className="py-3 pr-4">{u.full_name}</td>
                  <td className="py-3 pr-4 text-slate-400">{u.company_name}</td>
                  <td className="py-3 pr-4 text-slate-400">{u.email}</td>
                  <td className="py-3 pr-4 text-slate-400 capitalize">{u.role}</td>
                  <td className="py-3 pr-4">
                    <PlanBadge plan={u.plan} />
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {u.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
