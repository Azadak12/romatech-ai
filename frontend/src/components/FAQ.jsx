import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faq } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function AccordionItem({ item, index, openIndex, setOpenIndex }) {
  const idPrefix = useId()
  const isOpen = openIndex === index
  const buttonId = `${idPrefix}-button`
  const panelId = `${idPrefix}-panel`

  return (
    <Reveal delay={0.03 * index} className="border-b border-white/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-white transition hover:text-ice-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 rounded"
        >
          {item.question}
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-ice-500' : ''}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-400">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={faq.eyebrow} headline={faq.headline} />

        <div className="mt-12">
          {faq.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
