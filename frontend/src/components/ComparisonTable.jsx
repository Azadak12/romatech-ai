import { Check, X } from 'lucide-react'
import { solution } from '../data/content'
import Reveal from './Reveal'

export default function ComparisonTable() {
  const { headline, rows } = solution.comparison

  return (
    <Reveal className="mt-24">
      <h3 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">{headline}</h3>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">Comparison of manual call handling versus RomaTech.Ai</caption>
          <thead>
            <tr className="bg-navy-800/80 text-sm text-slate-300">
              <th scope="col" className="px-6 py-4 font-semibold">
                &nbsp;
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Doing It Manually
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-ice-500">
                RomaTech.Ai
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={index % 2 === 0 ? 'bg-navy-900/40' : 'bg-navy-900/10'}
              >
                <th scope="row" className="px-6 py-4 text-sm font-medium text-white">
                  {row.label}
                </th>
                <td className="px-6 py-4 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <X size={16} className="shrink-0 text-red-400/80" aria-hidden="true" />
                    {row.manual}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <Check size={16} className="shrink-0 text-ice-500" aria-hidden="true" />
                    {row.ai}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}
