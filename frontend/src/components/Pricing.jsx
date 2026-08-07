import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { pricing } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function isInternalLink(href) {
  return href.startsWith('/')
}

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={pricing.eyebrow} headline={pricing.headline} />

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-base font-medium text-gold-500">{pricing.reframeLine}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {pricing.tiers.map((tier, index) => (
            <Reveal
              key={tier.id}
              delay={0.1 * index}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.mostPopular
                  ? 'border-gold-500/60 bg-navy-800 shadow-2xl shadow-gold-500/10 lg:-translate-y-4'
                  : 'border-white/10 bg-navy-800/40'
              }`}
            >
              {tier.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">${tier.price}</span>
                <span className="text-sm text-slate-400">{tier.cadence}</span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-500/80">
                {tier.limit}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {isInternalLink(tier.cta.href) ? (
                <Link
                  to={tier.cta.href}
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                    tier.mostPopular
                      ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                      : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {tier.cta.label}
                </Link>
              ) : (
                <a
                  href={tier.cta.href}
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                    tier.mostPopular
                      ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                      : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {tier.cta.label}
                </a>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-xl text-center text-sm text-slate-500">
          <p>{pricing.setupNote}</p>
          <p className="mt-1">{pricing.contractNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
