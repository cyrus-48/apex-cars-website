import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { MOTION } from '@/lib/easing'
import { hasFinePointer, prefersReducedMotion } from './useReducedMotion'

/** Clamp-safe tilt angles for a pointer position inside a rect (exported for tests). */
export function tiltFor(
  px: number,
  py: number,
  rect: { width: number; height: number },
  max = MOTION.tiltMaxDeg,
) {
  const nx = Math.min(Math.max(px / rect.width, 0), 1) - 0.5
  const ny = Math.min(Math.max(py / rect.height, 0), 1) - 0.5
  return { rx: -ny * 2 * max, ry: nx * 2 * max }
}

/** Subtle 3D tilt toward the pointer (max 6deg). Off on touch and reduced motion. */
export function useTilt(target: Ref<HTMLElement | null>, max: number = MOTION.tiltMaxDeg) {
  let el: HTMLElement | null = null
  let frame = 0

  const move = (event: PointerEvent) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const { rx, ry } = tiltFor(event.clientX - rect.left, event.clientY - rect.top, rect, max)
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (el) el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
    })
  }

  const enter = () => {
    if (!el) return
    el.style.transition = 'transform var(--dur-micro) var(--ease-out)'
    el.style.willChange = 'transform'
  }

  const leave = () => {
    cancelAnimationFrame(frame)
    if (!el) return
    el.style.transition = 'transform var(--dur-ui) var(--ease-out)'
    el.style.transform = ''
    el.style.willChange = ''
  }

  onMounted(() => {
    el = target.value
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    el?.removeEventListener('pointerenter', enter)
    el?.removeEventListener('pointermove', move)
    el?.removeEventListener('pointerleave', leave)
  })
}
