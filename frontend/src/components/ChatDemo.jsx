import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { demo } from '../data/content'

const GAP_MS = 350

function TypingBubble({ align }) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-center gap-1 rounded-2xl bg-navy-700 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatDemo() {
  const { caption, script } = demo.tabs.chat
  const [visibleCount, setVisibleCount] = useState(0)
  const [typingSender, setTypingSender] = useState(null)
  const [runId, setRunId] = useState(0)
  const scrollRef = useRef(null)
  const timeoutsRef = useRef([])

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setVisibleCount(0)
    setTypingSender(null)

    let elapsed = 0
    script.forEach((message, index) => {
      const typingTimeout = setTimeout(() => setTypingSender(message.sender), elapsed)
      timeoutsRef.current.push(typingTimeout)
      elapsed += message.typingMs

      const revealTimeout = setTimeout(() => {
        setTypingSender(null)
        setVisibleCount(index + 1)
      }, elapsed)
      timeoutsRef.current.push(revealTimeout)
      elapsed += GAP_MS
    })

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [runId, script])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount, typingSender])

  const isComplete = visibleCount >= script.length

  return (
    <div className="rounded-3xl border border-white/10 bg-navy-800/60 p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{caption}</p>
        <button
          type="button"
          onClick={() => setRunId((v) => v + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Replay
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[420px] flex-col gap-3 overflow-y-auto rounded-2xl bg-navy-950/60 p-4"
        role="log"
        aria-live="polite"
        aria-label="Sample chat conversation with the AI agent"
      >
        {script.slice(0, visibleCount).map((message) => {
          const isAgent = message.sender === 'agent'
          return (
            <div key={message.id} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isAgent
                    ? 'bg-navy-700 text-slate-100'
                    : 'bg-ice-500 text-navy-950'
                }`}
              >
                {message.text}
              </div>
            </div>
          )
        })}

        {typingSender && <TypingBubble align={typingSender === 'agent' ? 'left' : 'right'} />}

        {isComplete && (
          <p className="pt-2 text-center text-xs font-medium uppercase tracking-wider text-ice-500/80">
            Job booked
          </p>
        )}
      </div>
    </div>
  )
}
