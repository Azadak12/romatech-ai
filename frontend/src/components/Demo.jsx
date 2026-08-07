import { useRef, useState } from 'react'
import { demo } from '../data/content'
import ChatDemo from './ChatDemo'
import SectionHeading from './SectionHeading'
import VoiceDemo from './VoiceDemo'

const TABS = [
  { id: 'voice', label: demo.tabs.voice.label },
  { id: 'chat', label: demo.tabs.chat.label },
]

export default function Demo() {
  const [activeTab, setActiveTab] = useState('voice')
  const tabRefs = useRef({})

  function onKeyDown(event) {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab)
    let nextIndex = null

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length

    if (nextIndex !== null) {
      event.preventDefault()
      const nextTab = TABS[nextIndex]
      setActiveTab(nextTab.id)
      tabRefs.current[nextTab.id]?.focus()
    }
  }

  return (
    <section id="demo" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={demo.eyebrow} headline={demo.headline} />

        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Demo type"
            className="mx-auto flex w-full max-w-xs gap-1 rounded-full border border-white/10 bg-navy-800/60 p-1"
            onKeyDown={onKeyDown}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-navy-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div
              role="tabpanel"
              id="panel-voice"
              aria-labelledby="tab-voice"
              hidden={activeTab !== 'voice'}
            >
              {activeTab === 'voice' && <VoiceDemo />}
            </div>
            <div
              role="tabpanel"
              id="panel-chat"
              aria-labelledby="tab-chat"
              hidden={activeTab !== 'chat'}
            >
              {activeTab === 'chat' && <ChatDemo />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
