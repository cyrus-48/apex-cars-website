import { onBeforeUnmount, onMounted } from 'vue'
import type Lenis from 'lenis'
import { loadGsap, whenIdle } from '@/lib/gsap'
import { prefersReducedMotion } from './useReducedMotion'

let instance: Lenis | null = null
let detach: (() => void) | null = null

export function getLenis(): Lenis | null {
  return instance
}

/** Jump to top without animation (used by page transitions). */
export function resetScroll(): void {
  if (instance) instance.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

/** Creates the single Lenis instance and drives it (and ScrollTrigger) from GSAP's ticker. */
async function init(): Promise<void> {
  if (instance || prefersReducedMotion()) return
  const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([
    import('lenis'),
    loadGsap(),
  ])

  const lenis = new LenisCtor({ duration: 1.1, autoRaf: false, anchors: { offset: -96 } })
  const tick = (time: number) => lenis.raf(time * 1000)
  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  instance = lenis

  detach = () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}

function destroy(): void {
  detach?.()
  detach = null
  instance = null
}

/** Mount once in App.vue. Loads after first paint; destroyed on unmount. */
export function useLenis(): void {
  onMounted(() => whenIdle(() => void init()))
  onBeforeUnmount(destroy)
}
