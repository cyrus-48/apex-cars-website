import { computed, type ComputedRef } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

/** Synchronous check for non-component code (event handlers, loaders). SSR-safe. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCE_QUERY).matches
  )
}

/** Synchronous check: true on mouse/trackpad devices, false on touch. SSR-safe. */
export function hasFinePointer(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(FINE_POINTER_QUERY).matches
  )
}

/** Reactive reduced-motion preference. */
export function useReducedMotion(): ComputedRef<boolean> {
  const reduce = useMediaQuery(REDUCE_QUERY)
  return computed(() => reduce.value)
}

/** Reactive: pointer effects (cursor, tilt, magnetic) allowed? Off on touch and reduced motion. */
export function usePointerEffects(): ComputedRef<boolean> {
  const fine = useMediaQuery(FINE_POINTER_QUERY)
  const reduce = useReducedMotion()
  return computed(() => fine.value && !reduce.value)
}
