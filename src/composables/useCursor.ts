import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { MOTION } from '@/lib/easing'
import { hasFinePointer, prefersReducedMotion } from './useReducedMotion'

const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, label, [data-cursor]'

/**
 * Desktop-only custom cursor: a dot that trails the pointer (lerp) and grows over
 * interactive elements. Writes transforms directly to the element; no per-frame reactivity.
 */
export function useCursor(dot: Ref<HTMLElement | null>) {
  const enabled = ref(false)
  const hasMoved = ref(false)
  const active = ref(false)
  const label = ref('')
  let frame = 0
  const target = { x: -100, y: -100 }
  const pos = { x: -100, y: -100 }

  const loop = () => {
    pos.x += (target.x - pos.x) * MOTION.cursorLerp
    pos.y += (target.y - pos.y) * MOTION.cursorLerp
    if (dot.value) dot.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    frame = requestAnimationFrame(loop)
  }

  const move = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    hasMoved.value = true
    target.x = event.clientX
    target.y = event.clientY
  }

  const over = (event: PointerEvent) => {
    const el = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null
    active.value = Boolean(el)
    label.value = el?.getAttribute('data-cursor') ?? ''
  }

  const hide = () => {
    target.x = -100
    target.y = -100
  }

  onMounted(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    enabled.value = true
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    frame = requestAnimationFrame(loop)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', move)
    document.removeEventListener('pointerover', over)
    document.documentElement.removeEventListener('pointerleave', hide)
  })

  return { enabled, hasMoved, active, label }
}
