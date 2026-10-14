export interface ImpactStat {
  label: string
  value: number
  unit: string
  prefix?: string
  decimals?: number
  description: string
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    label: 'Zero Tailpipe CO₂',
    value: 100,
    unit: '%',
    description: 'Entire fleet powered by zero-combustion pure electric powertrains',
  },
  {
    label: 'Cell Circularity',
    value: 94.8,
    unit: '%',
    decimals: 1,
    description: 'Raw lithium, nickel and cobalt recovered via hydrometallurgical recycling',
  },
  {
    label: 'Clean Kilometers Driven',
    value: 48,
    unit: 'M km',
    prefix: '+',
    description: 'Logged by customer vehicles across 28 global countries to date',
  },
  {
    label: 'Renewable Production',
    value: 100,
    unit: '%',
    description: 'Gothenburg R&D and assembly hubs powered by wind and solar arrays',
  },
]
