import { nextTick } from 'vue'
import type { Router } from 'vue-router'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

/** True while a native View Transition is driving the page change (GSAP fallback stands down). */
export const transitionState = { native: false }

type StartViewTransition = (cb: () => Promise<void>) => { finished: Promise<void> }

function getStarter(): StartViewTransition | null {
  const doc = document as Document & { startViewTransition?: StartViewTransition }
  return typeof doc.startViewTransition === 'function' ? doc.startViewTransition.bind(doc) : null
}

/**
 * Wraps each route change in `document.startViewTransition` when supported.
 * The callback waits until the new page has rendered, so the CSS wipe in motion.css
 * animates old → new snapshots. Unsupported browsers fall back to PageTransition.vue (GSAP).
 */
export function installViewTransitions(router: Router): void {
  let finish: (() => void) | null = null
  let first = true

  router.beforeResolve((to, from) => {
    if (first || to.path === from.path || prefersReducedMotion()) return true
    const start = getStarter()
    if (!start) return true

    return new Promise<boolean>((resolve) => {
      transitionState.native = true
      const vt = start(
        () =>
          new Promise<void>((done) => {
            finish = done
            resolve(true)
          }),
      )
      void vt.finished.finally(() => {
        transitionState.native = false
      })
    })
  })

  router.afterEach(async (_to, _from, failure) => {
    if (first) {
      first = false
      return
    }
    document.documentElement.classList.add('returning')
    await nextTick()
    if (failure) transitionState.native = false
    finish?.()
    finish = null
  })
}
