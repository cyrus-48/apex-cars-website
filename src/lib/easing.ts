/**
 * Motion tokens for JS-driven animation. Mirrors the CSS tokens in styles/tokens.css.
 * GSAP eases are the named equivalents of the CSS cubic-beziers:
 *   cubic-bezier(.22,1,.36,1)  = easeOutQuint   = power4.out
 *   cubic-bezier(.65,0,.35,1)  = easeInOutCubic = power2.inOut
 */
export const EASE = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const

export const GSAP_EASE = {
  out: 'power4.out',
  inOut: 'power2.inOut',
  none: 'none',
} as const

/** Durations in milliseconds. */
export const DURATION = {
  micro: 180,
  ui: 500,
  page: 550,
  hero: 1000,
  count: 1600,
} as const

/** Durations in seconds, for GSAP. */
export const SECONDS = {
  micro: DURATION.micro / 1000,
  ui: DURATION.ui / 1000,
  page: DURATION.page / 1000,
  hero: DURATION.hero / 1000,
} as const

export interface MotionTokens {
  readonly staggerMs: number
  readonly parallaxPercent: number
  readonly tiltMaxDeg: number
  readonly magneticStrength: number
  readonly hoverZoom: number
  readonly dragFriction: number
  readonly cursorLerp: number
}

/** Interaction limits. */
export const MOTION: MotionTokens = {
  staggerMs: 60,
  parallaxPercent: 10,
  tiltMaxDeg: 6,
  magneticStrength: 0.35,
  hoverZoom: 1.05,
  dragFriction: 0.92,
  cursorLerp: 0.3,
}

/** easeOutQuint as a JS function, used by count-up and inertia. */
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5)
}
