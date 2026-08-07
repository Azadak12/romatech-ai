import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, headline, body, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">{headline}</h2>
      {body && <p className="text-lg text-slate-400">{body}</p>}
    </Reveal>
  )
}
