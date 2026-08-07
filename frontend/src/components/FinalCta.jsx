import { finalCta } from '../data/content'
import LeadForm from './LeadForm'
import Reveal from './Reveal'

export default function FinalCta() {
  return (
    <section id="book-a-call" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-ice-500/20 bg-gradient-to-b from-navy-800 to-navy-900 p-8 sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent)]"
          />
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                {finalCta.headline}
              </h2>
              <p className="mt-4 text-lg text-slate-400">{finalCta.body}</p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-3">
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
