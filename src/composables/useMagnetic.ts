import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { MOTION } from '@/lib/easing'
import { hasFinePointer, prefersReducedMotion } from './useReducedMotion'

/**
 * Element drifts toward the pointer while hovered, springs back on leave.
 * transform-only; disabled on touch devices and for reduced motion.
 */
export function useMagnetic(target: Ref<HTMLElement | null>, strength = MOTION.magneticStrength) {
  let frame = 0
  let el: HTMLElement | null = null

  const move = (event: PointerEvent) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * strength
    const y = (event.clientY - rect.top - rect.height / 2) * strength
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
  }

  const enter = () => {
    if (el) el.style.transition = 'transform var(--dur-micro) var(--ease-out)'
  }

  const leave = () => {
    cancelAnimationFrame(frame)
    if (!el) return
    el.style.transition = 'transform var(--dur-hero) var(--ease-out)'
    el.style.transform = ''
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
