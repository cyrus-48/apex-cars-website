import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { MOTION } from '@/lib/easing'
import { prefersReducedMotion } from './useReducedMotion'

const MIN_VELOCITY = 0.5

/**
 * Horizontal strip controller: mouse drag with inertia, CSS scroll-snap re-engaged on
 * release, arrow paging and a progress value (0..1). Touch uses native scrolling.
 */
export function useDragScroll(track: Ref<HTMLElement | null>) {
  const progress = ref(0)
  const atStart = ref(true)
  const atEnd = ref(false)
  const dragging = ref(false)
  let startX = 0
  let startScroll = 0
  let lastX = 0
  let velocity = 0
  let frame = 0
  let moved = false

  function sync() {
    const el = track.value
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    progress.value = max > 0 ? el.scrollLeft / max : 0
    atStart.value = el.scrollLeft <= 2
    atEnd.value = el.scrollLeft >= max - 2
  }

  function setSnap(on: boolean) {
    if (track.value) track.value.style.scrollSnapType = on ? '' : 'none'
  }

  function glide() {
    const el = track.value
    if (!el || Math.abs(velocity) < MIN_VELOCITY || prefersReducedMotion()) {
      setSnap(true)
      return
    }
    el.scrollLeft -= velocity
    velocity *= MOTION.dragFriction
    frame = requestAnimationFrame(glide)
  }

  function down(event: PointerEvent) {
    const el = track.value
    if (!el || event.pointerType !== 'mouse' || event.button !== 0) return
    cancelAnimationFrame(frame)
    dragging.value = true
    moved = false
    startX = lastX = event.clientX
    startScroll = el.scrollLeft
    velocity = 0
    setSnap(false)
  }

  function move(event: PointerEvent) {
    const el = track.value
    if (!dragging.value || !el) return
    if (Math.abs(event.clientX - startX) > 4) moved = true
    velocity = event.clientX - lastX
    lastX = event.clientX
    el.scrollLeft = startScroll - (event.clientX - startX)
  }

  function up() {
    if (!dragging.value) return
    dragging.value = false
    frame = requestAnimationFrame(glide)
  }

  /** Swallow the click that ends a drag so cards don't navigate accidentally. */
  function click(event: MouseEvent) {
    if (moved) {
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }
  }

  function page(direction: 1 | -1) {
    const el = track.value
    if (!el) return
    const behavior = prefersReducedMotion() ? 'instant' : 'smooth'
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior })
  }

  onMounted(() => {
    const el = track.value
    if (!el) return
    el.addEventListener('pointerdown', down)
    el.addEventListener('click', click, true)
    sync()
  })

  useEventListener(track, 'scroll', sync, { passive: true })
  useEventListener(typeof window === 'undefined' ? undefined : window, 'pointermove', move)
  useEventListener(typeof window === 'undefined' ? undefined : window, 'pointerup', up)
  useResizeObserver(track, sync)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    track.value?.removeEventListener('pointerdown', down)
    track.value?.removeEventListener('click', click, true)
  })

  const progressStyle = computed(() => ({ transform: `scaleX(${Math.max(progress.value, 0.04)})` }))

  return { progress, progressStyle, atStart, atEnd, dragging, page }
}
