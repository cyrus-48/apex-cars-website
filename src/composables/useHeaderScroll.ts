import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const SHRINK_AT = 24
const HIDE_AFTER = 320
const DELTA = 6

/** Header state: `scrolled` (shrink + blur) and `hidden` (scrolling down past the hero). */
export function useHeaderScroll() {
  const scrolled = ref(false)
  const hidden = ref(false)
  let lastY = 0
  let ticking = false

  const update = () => {
    const y = window.scrollY
    scrolled.value = y > SHRINK_AT
    if (Math.abs(y - lastY) > DELTA) {
      hidden.value = y > lastY && y > HIDE_AFTER
      lastY = y
    }
    ticking = false
  }

  useEventListener(
    typeof window === 'undefined' ? undefined : window,
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    },
    { passive: true },
  )

  /** Force-show the header (e.g. when keyboard focus enters it). */
  function reveal() {
    hidden.value = false
  }

  return { scrolled, hidden, reveal }
}
