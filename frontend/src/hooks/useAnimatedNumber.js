import { useEffect, useRef, useState } from 'react'

export function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(target)
  const frameRef = useRef(null)
  const fromRef = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    const delta = target - from
    if (delta === 0) return undefined

    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + delta * eased))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      fromRef.current = target
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return value
}
