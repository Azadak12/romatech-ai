import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { hero } from '../data/content'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(232,179,74,0.18),transparent)]"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400 sm:flex-row"
        >
          {hero.trustStrip.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check size={16} className="text-gold-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
