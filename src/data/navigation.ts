export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Impact', to: '/impact' },
  { label: 'News', to: '/news' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

/** Public, indexable routes (used for pre-rendering and sitemap.xml). */
export const ROUTE_PATHS: readonly string[] = NAV_ITEMS.map((item) => item.to)
