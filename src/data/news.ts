export interface NewsArticle {
  id: string
  title: string
  slug: string
  summary: string
  date: string
  category: string
  readTime: string
  image: string
}

export const NEWS_DATA: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Apex GT-9 sets sub-6:40 electric production lap record at the Nordschleife',
    slug: 'gt-9-nordschleife-record',
    summary:
      'Telemetry shows sustained 320 km/h down Döttinger Höhe with zero thermal throttling across 20.8 kilometers.',
    date: '2026-09-18',
    category: 'Engineering',
    readTime: '4 min read',
    image: '/src/assets/images/track.jpg',
  },
  {
    id: 'news-2',
    title: 'Gothenburg R&D facility achieves net-negative carbon manufacturing milestone',
    slug: 'gothenburg-net-negative',
    summary:
      '100% on-site geothermal heating combined with closed-loop aluminum recycling eliminates factory emissions.',
    date: '2026-08-30',
    category: 'Sustainability',
    readTime: '3 min read',
    image: '/src/assets/images/factory.jpg',
  },
  {
    id: 'news-3',
    title: 'Inside Studio Alpha: Human-first aerodynamics and sustainable leather alternatives',
    slug: 'inside-studio-alpha',
    summary:
      'Chief Design Officer Elena Vance discusses why true luxury is defined by tactile restraint and aerodynamic harmony.',
    date: '2026-07-14',
    category: 'Design',
    readTime: '5 min read',
    image: '/src/assets/images/studio.jpg',
  },
]
