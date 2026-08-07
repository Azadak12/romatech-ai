import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
