import { nextTick, onMounted, ref, watch, type Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

/** Pure clip-path builder (exported for tests): reveals only the target item's box. */
export function clipFor(
  item: { left: number; top: number; width: number; height: number },
  box: { width: number; height: number },
): string {
  const right = Math.max(box.width - item.left - item.width, 0)
  const bottom = Math.max(box.height - item.top - item.height, 0)
  return `inset(${item.top}px ${right}px ${bottom}px ${item.left}px round 999px)`
}

/**
 * Sliding pill indicator. An overlay copy of the pills (ink background, inverted text)
 * is clipped to the active item's box. Animating clip-path keeps the corners round and
 * the text colour perfectly inverted, without animating width/left.
 */
export function usePillIndicator(container: Ref<HTMLElement | null>, index: Ref<number>) {
  const clip = ref('inset(0 100% 0 0 round 999px)')
  const ready = ref(false)

  function measure() {
    const box = container.value
    const items = box?.querySelectorAll<HTMLElement>('[data-pill]')
    const item = items?.[index.value]
    if (!box || !item) {
      clip.value = 'inset(50% 50% 50% 50% round 999px)'
      return
    }
    clip.value = clipFor(
      {
        left: item.offsetLeft,
        top: item.offsetTop,
        width: item.offsetWidth,
        height: item.offsetHeight,
      },
      { width: box.offsetWidth, height: box.offsetHeight },
    )
  }

  onMounted(async () => {
    measure()
    await nextTick()
    requestAnimationFrame(() => (ready.value = true))
  })

  watch(index, measure)
  useResizeObserver(container, measure)

  return { clip, ready, measure }
}
