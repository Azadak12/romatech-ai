import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, PhoneCall } from 'lucide-react'

const ORBIT_BADGES = [
  { icon: PhoneCall, className: '-top-2 -left-6 sm:-left-10', delay: '0s', duration: '5s' },
  { icon: MessageCircle, className: 'top-1/3 -right-6 sm:-right-10', delay: '0.6s', duration: '6s' },
  { icon: CalendarCheck, className: '-bottom-4 left-1/4', delay: '1.2s', duration: '5.5s' },
]

export default function HeroRobot() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
      aria-hidden="true"
    >
      {/* pulsing signal rings */}
      <span className="absolute h-full w-full rounded-full border border-ice-500/40 animate-pulse-ring" />
      <span
        className="absolute h-full w-full rounded-full border border-ice-500/40 animate-pulse-ring"
        style={{ animationDelay: '0.8s' }}
      />
      <span
        className="absolute h-full w-full rounded-full border border-ice-500/40 animate-pulse-ring"
        style={{ animationDelay: '1.6s' }}
      />

      {/* central orb */}
      <div
        className="relative flex h-40 w-40 animate-float items-center justify-center rounded-full border border-ice-400/40 bg-gradient-to-br from-ice-400/25 via-ice-600/10 to-transparent shadow-[0_0_70px_rgba(56,189,248,0.35)] backdrop-blur sm:h-48 sm:w-48"
      >
        <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24" fill="none">
          <rect x="24" y="30" width="52" height="42" rx="16" stroke="#7dd3fc" strokeWidth="3" />
          <line x1="50" y1="30" x2="50" y2="18" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="13" r="4" fill="#38bdf8" className="animate-pulse" />

          <g style={{ transformOrigin: '38px 49px' }} className="animate-blink">
            <rect x="33" y="43" width="10" height="12" rx="5" fill="#38bdf8" />
          </g>
          <g style={{ transformOrigin: '62px 49px' }} className="animate-blink">
            <rect x="57" y="43" width="10" height="12" rx="5" fill="#38bdf8" />
          </g>

          <path d="M38 62 Q50 70 62 62" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {ORBIT_BADGES.map(({ icon: Icon, className, delay, duration }, i) => (
        <div
          key={i}
          className={`absolute flex h-11 w-11 items-center justify-center rounded-full border border-ice-500/30 bg-navy-900/90 text-ice-400 shadow-lg shadow-black/30 animate-float ${className}`}
          style={{ animationDelay: delay, animationDuration: duration }}
        >
          <Icon size={18} aria-hidden="true" />
        </div>
      ))}
    </motion.div>
  )
}
