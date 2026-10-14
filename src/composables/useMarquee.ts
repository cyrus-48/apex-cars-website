import { computed, ref, type Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

/**
 * Keeps marquee speed constant regardless of content width by deriving
 * the CSS animation duration from the measured track width (px per second).
 */
export function useMarquee(track: Ref<HTMLElement | null>, pxPerSecond = 60) {
  const width = ref(0)

  useResizeObserver(track, (entries) => {
    const entry = entries[0]
    if (entry) width.value = entry.contentRect.width
  })

  const style = computed(() => {
    if (!width.value) return {}
    const seconds = Math.max(width.value / 2 / pxPerSecond, 10)
    return { '--marquee-duration': `${seconds.toFixed(1)}s` }
  })

  return { style }
}
