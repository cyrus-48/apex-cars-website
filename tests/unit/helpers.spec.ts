import { describe, it, expect } from 'vitest'
import { formatNumber, formatDate } from '@/lib/format'
import { countAt } from '@/composables/useCountUp'
import { tiltFor } from '@/composables/useTilt'
import { clipFor } from '@/composables/usePillIndicator'

describe('format helpers', () => {
  it('formats numbers with specified decimals', () => {
    expect(formatNumber(1250, 0)).toBe('1,250')
    expect(formatNumber(1.9, 1)).toBe('1.9')
    expect(formatNumber(94.8, 1)).toBe('94.8')
  })

  it('formats ISO dates correctly', () => {
    expect(formatDate('2026-09-18')).toContain('2026')
    expect(formatDate('2026-09-18')).toContain('Sep')
  })
})

describe('motion math', () => {
  it('interpolates countAt using quintic curve', () => {
    expect(countAt(100, 0)).toBe(0)
    expect(countAt(100, 1)).toBe(100)
    expect(countAt(100, 0.5)).toBeGreaterThan(50) // easeOut starts fast
  })

  it('calculates 3d tilt within bounds', () => {
    const rect = { width: 200, height: 100 }
    const center = tiltFor(100, 50, rect, 6)
    expect(center.rx).toBeCloseTo(0)
    expect(center.ry).toBeCloseTo(0)

    const corner = tiltFor(0, 0, rect, 6)
    expect(corner.rx).toBe(6)
    expect(corner.ry).toBe(-6)
  })

  it('computes rounded clip-path inset for pill indicator', () => {
    const clip = clipFor({ left: 10, top: 4, width: 80, height: 32 }, { width: 200, height: 40 })
    expect(clip).toBe('inset(4px 110px 4px 10px round 999px)')
  })
})
