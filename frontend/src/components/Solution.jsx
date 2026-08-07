import { solution } from '../data/content'
import ComparisonTable from './ComparisonTable'
import HowItWorks from './HowItWorks'
import { iconMap } from './icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={solution.eyebrow} headline={solution.headline} />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {solution.columns.map((column, index) => {
            const Icon = iconMap[column.icon]
            return (
              <Reveal
                key={column.headline}
                delay={0.1 * index}
                className="rounded-2xl border border-white/10 bg-navy-800/60 p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-gold-500/30"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500">
                  {Icon && <Icon size={24} aria-hidden="true" />}
                </div>
                <h3 className="text-xl font-semibold text-white">{column.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{column.body}</p>
              </Reveal>
            )
          })}
        </div>

        <HowItWorks />
        <ComparisonTable />
      </div>
    </section>
  )
}
