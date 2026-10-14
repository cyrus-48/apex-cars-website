export interface PartnerItem {
  name: string
  category: string
  symbol: string
}

export const PARTNERS_DATA: PartnerItem[] = [
  { name: 'Northvolt', category: 'Cell Chemistry', symbol: 'NV' },
  { name: 'Öhlins Racing', category: 'Suspension & Damper Dynamics', symbol: 'ÖH' },
  { name: 'Brembo Carbon', category: 'Silicon-Braking Systems', symbol: 'BM' },
  { name: 'Pirelli Trofeo', category: 'Bespoke EV Compound Tires', symbol: 'PI' },
  { name: 'ABB E-mobility', category: 'High-Power Megawatt Inverters', symbol: 'AB' },
  { name: 'Polestar Carbon', category: 'Composite Chassis Architecture', symbol: 'PS' },
  { name: 'SSAB Fossil-Free', category: 'Zero-Emission Steel', symbol: 'SS' },
]
