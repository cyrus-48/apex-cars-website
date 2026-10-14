import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { loadGsap, type GsapBundle } from '@/lib/gsap'
import { prefersReducedMotion } from './useReducedMotion'

type Cleanup = () => void

/**
 * Scoped GSAP setup: lazy-loads GSAP, runs `setup` inside a gsap.context bound to `scope`,
 * and reverts everything (tweens + ScrollTriggers) on unmount. Skipped for reduced motion.
 */
export function useGsap(
  scope: Ref<HTMLElement | null>,
  setup: (bundle: GsapBundle, el: HTMLElement) => Cleanup | undefined,
): void {
  let revert: Cleanup | null = null
  let disposed = false

  onMounted(async () => {
    if (prefersReducedMotion()) return
    const bundle = await loadGsap()
    const el = scope.value
    if (disposed || !el) return

    let cleanup: Cleanup | undefined
    const ctx = bundle.gsap.context(() => {
      cleanup = setup(bundle, el)
    }, el)
    revert = () => {
      if (cleanup) cleanup()
      ctx.revert()
    }
  })

  onBeforeUnmount(() => {
    disposed = true
    revert?.()
  })
}
