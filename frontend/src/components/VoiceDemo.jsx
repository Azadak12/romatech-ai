import { useRef, useState } from 'react'
import { Pause, Phone, Play } from 'lucide-react'
import { demo } from '../data/content'

const BAR_COUNT = 40

function useWaveformHeights() {
  const heightsRef = useRef(
    Array.from({ length: BAR_COUNT }, () => 20 + Math.round(Math.random() * 80))
  )
  return heightsRef.current
}

export default function VoiceDemo() {
  const { audioSrc, caption, callCta } = demo.tabs.voice
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const heights = useWaveformHeights()

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-navy-800/60 p-6 sm:p-10">
      <audio
        ref={audioRef}
        src={audioSrc}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={togglePlayback}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-ice-500 text-navy-950 transition hover:bg-ice-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800"
          aria-label={isPlaying ? 'Pause sample call' : 'Play sample call'}
        >
          {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
        </button>

        <div
          className="flex h-24 w-full max-w-lg items-center justify-center gap-1"
          role="img"
          aria-label="Audio waveform"
        >
          {heights.map((h, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full bg-ice-500/70 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{
                height: `${isPlaying ? h : Math.max(12, h * 0.35)}%`,
                animationDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>

        <p className="text-center text-sm text-slate-400">{caption}</p>

        <a
          href={`tel:${callCta.phone.replace(/[^\d+]/g, '')}`}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        >
          <Phone size={16} aria-hidden="true" />
          {callCta.label} — {callCta.phone}
        </a>
      </div>
    </div>
  )
}
