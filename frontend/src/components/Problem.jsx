import { problem } from '../data/content'
import { iconMap } from './icons'
import Reveal from './Reveal'
import RevenueCalculator from './RevenueCalculator'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ice-500">
              {problem.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              {problem.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-slate-400">{problem.intro}</p>
          </Reveal>
        </div>

        <RevenueCalculator />

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {problem.cards.map((card, index) => {
            const Icon = iconMap[card.icon]
            return (
              <Reveal
                key={card.headline}
                delay={0.05 * index}
                className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-ice-500/30 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ice-500/10 text-ice-500">
                  {Icon && <Icon size={22} aria-hidden="true" />}
                </div>
                <h3 className="text-lg font-semibold text-white">{card.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
