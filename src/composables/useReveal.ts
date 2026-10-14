import { ref, type Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

/** Flips `isIn` to true the first time the element enters the viewport, then disconnects. */
export function useReveal(target: Ref<HTMLElement | null>, options: RevealOptions = {}) {
  const isIn = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isIn.value = true
        stop()
      }
    },
    { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
  )

  return { isIn }
}
