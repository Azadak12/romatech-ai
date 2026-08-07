import { solution } from '../data/content'
import Reveal from './Reveal'

export default function HowItWorks() {
  const { headline, steps } = solution.howItWorks

  return (
    <div className="mt-24">
      <Reveal className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{headline}</h3>
      </Reveal>

      <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
        />
        {steps.map((step, index) => (
          <Reveal key={step.headline} delay={0.1 * index} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ice-500/40 bg-navy-900 text-lg font-bold text-ice-500">
              {index + 1}
            </div>
            <h4 className="mt-4 text-base font-semibold text-white">{step.headline}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
