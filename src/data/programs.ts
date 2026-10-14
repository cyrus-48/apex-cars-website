export interface ProgramItem {
  id: string
  title: string
  subtitle: string
  category: 'vehicles' | 'technology' | 'charging'
  stats: { label: string; value: string }[]
  image: string
  description: string
  badge?: string
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'gt9-hyper',
    title: 'Apex GT-9 Aerodyne',
    subtitle: '1,150 HP Dual-Motor Electric Grand Tourer',
    category: 'vehicles',
    stats: [
      { label: '0-100 km/h', value: '1.9s' },
      { label: 'Top Speed', value: '340 km/h' },
      { label: 'Range', value: '720 km' },
    ],
    image: '/src/assets/images/hero-car.jpg',
    description:
      'Sculpted from forged carbon and equipped with active aero flaps for zero-compromise GT cruising and track capability.',
    badge: 'Flagship',
  },
  {
    id: 'track-r',
    title: 'Apex R-Spec Prototype',
    subtitle: 'Nürburgring-honed lightweight track weapon',
    category: 'vehicles',
    stats: [
      { label: 'Downforce', value: '820 kg' },
      { label: 'Weight', value: '1,590 kg' },
      { label: 'Lateral Grip', value: '1.65 G' },
    ],
    image: '/src/assets/images/track.jpg',
    description:
      'Built for apex predation on circuits worldwide with torque vectoring and race-tuned Multimatic DSSV dampers.',
    badge: 'Motorsport',
  },
  {
    id: 'skateboard-sic',
    title: '900V SiC Powertrain Platform',
    subtitle: 'Solid-state prepared skateboard architecture',
    category: 'technology',
    stats: [
      { label: 'Efficiency', value: '98.4%' },
      { label: 'Charging', value: '10-80% in 12m' },
      { label: 'Pack Density', value: '290 Wh/kg' },
    ],
    image: '/src/assets/images/battery.jpg',
    description:
      'Silicon-carbide inverters paired with submerged direct-cooled cylindrical cells delivering continuous unthrottled output.',
  },
  {
    id: 'smart-grid',
    title: 'HyperGrid 400kW Network',
    subtitle: 'Liquid-cooled megawatt-ready stations',
    category: 'charging',
    stats: [
      { label: 'Peak Power', value: '420 kW' },
      { label: 'Renewable', value: '100% Solar/Wind' },
      { label: 'Locations', value: '850+ Hubs' },
    ],
    image: '/src/assets/images/charging.jpg',
    description:
      'Zero-downtime micro-canopies integrated into European and North American scenic routes and testing circuits.',
  },
]
