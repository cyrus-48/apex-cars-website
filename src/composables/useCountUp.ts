import { computed, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import { DURATION, easeOutQuint } from '@/lib/easing'
import { formatNumber } from '@/lib/format'
import { prefersReducedMotion } from './useReducedMotion'
import { useReveal } from './useReveal'

interface CountUpOptions {
  decimals?: number
  duration?: number
}

/** Pure interpolation used by the composable (exported for unit tests). */
export function countAt(target: number, progress: number): number {
  const t = Math.min(Math.max(progress, 0), 1)
  return target * easeOutQuint(t)
}

/**
 * Counts from 0 to `target` once the element is in view. SSR renders the final value,
 * so the number is correct without JS and for reduced-motion users.
 */
export function useCountUp(
  target: Ref<HTMLElement | null>,
  value: number,
  options: CountUpOptions = {},
) {
  const decimals = options.decimals ?? 0
  const duration = options.duration ?? DURATION.count
  const current = ref(value)
  const armed = ref(false)
  let frame = 0

  const { isIn } = useReveal(target, { threshold: 0.4 })

  function run() {
    const start = performance.now()
    const step = (now: number) => {
      const progress = (now - start) / duration
      current.value = countAt(value, progress)
      if (progress < 1) frame = requestAnimationFrame(step)
      else current.value = value
    }
    frame = requestAnimationFrame(step)
  }

  /** Called on mount: reset to 0 (offscreen) so the count can play when revealed. */
  function arm() {
    if (prefersReducedMotion()) return
    armed.value = true
    current.value = 0
  }

  watch(isIn, (inView) => {
    if (inView && armed.value) run()
  })

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  const display = computed(() => formatNumber(current.value, decimals))
  return { display, arm }
}
