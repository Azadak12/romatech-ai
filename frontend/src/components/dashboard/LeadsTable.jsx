import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { api, getErrorMessage } from '../../lib/api'

export default function LeadsTable() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    let cancelled = false
    async function fetchLeads() {
      try {
        const { data } = await api.get('/leads')
        if (!cancelled) setLeads(data)
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't load leads."))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchLeads()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !search ||
        [lead.name, lead.email, lead.phone, lead.company_name]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(search.toLowerCase()))

      const matchesDate = !dateFilter || lead.created_at.slice(0, 10) === dateFilter

      return matchesSearch && matchesDate
    })
  }, [leads, search, dateFilter])

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">Leads</h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads"
              aria-label="Search leads"
              className="rounded-lg border border-white/15 bg-navy-950 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            aria-label="Filter leads by date"
            className="rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-sm text-white focus:border-ice-500 focus:outline-none focus:ring-1 focus:ring-ice-500"
          />
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-slate-400">Loading leads…</p>
        ) : error ? (
          <p role="alert" className="py-8 text-center text-sm text-red-400">
            {error}
          </p>
        ) : filteredLeads.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No leads match your filters.</p>
        ) : (
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th scope="col" className="py-3 pr-4 font-medium">Name</th>
                <th scope="col" className="py-3 pr-4 font-medium">Email</th>
                <th scope="col" className="py-3 pr-4 font-medium">Phone</th>
                <th scope="col" className="py-3 pr-4 font-medium">Company</th>
                <th scope="col" className="py-3 pr-4 font-medium">Plan Interest</th>
                <th scope="col" className="py-3 pr-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 text-slate-200">
                  <td className="py-3 pr-4">{lead.name}</td>
                  <td className="py-3 pr-4 text-slate-400">{lead.email}</td>
                  <td className="py-3 pr-4 text-slate-400">{lead.phone}</td>
                  <td className="py-3 pr-4 text-slate-400">{lead.company_name || '—'}</td>
                  <td className="py-3 pr-4 text-slate-400">{lead.plan_interest || '—'}</td>
                  <td className="py-3 pr-4 text-slate-400">
                    {new Date(lead.created_at).toLocaleDateString()}
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
