import type { gsap as GsapCore } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

export interface GsapBundle {
  gsap: typeof GsapCore
  ScrollTrigger: typeof ScrollTriggerType
}

let bundle: Promise<GsapBundle> | null = null

/** Lazy, cached GSAP + ScrollTrigger loader. Never part of the initial bundle. */
export function loadGsap(): Promise<GsapBundle> {
  bundle ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
    core.gsap.registerPlugin(st.ScrollTrigger)
    return { gsap: core.gsap, ScrollTrigger: st.ScrollTrigger }
  })
  return bundle
}

/** Run work after first paint when the main thread is idle. */
export function whenIdle(callback: () => void, timeout = 1500): void {
  if (typeof window === 'undefined') return
  if ('requestIdleCallback' in window) window.requestIdleCallback(callback, { timeout })
  else globalThis.setTimeout(callback, 200)
}
