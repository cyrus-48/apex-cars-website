import { useHead, useSeoMeta } from '@unhead/vue'
import { SITE } from '@/data/site'

export interface SeoOptions {
  title: string
  description: string
  path?: string
  image?: string
  noindex?: boolean
}

export function useSeo(options: SeoOptions) {
  const fullTitle =
    options.title === SITE.name
      ? `${SITE.name} — ${SITE.tagline}`
      : `${options.title} | ${SITE.name}`
  const canonical = options.path
    ? `${SITE.url}${options.path === '/' ? '/' : `${options.path}/`}`
    : SITE.url
  const ogImage = options.image || `${SITE.url}/og-image.jpg`

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: canonical }],
    meta: options.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AutomotiveBusiness',
          name: SITE.name,
          description: SITE.mission,
          url: SITE.url,
          email: SITE.email,
          telephone: SITE.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lindholmspiren 9',
            postalCode: '417 56',
            addressLocality: 'Gothenburg',
            addressCountry: 'SE',
          },
        }),
      },
    ],
  })

  useSeoMeta({
    title: fullTitle,
    description: options.description,
    ogTitle: fullTitle,
    ogDescription: options.description,
    ogUrl: canonical,
    ogType: 'website',
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: ogImage,
  })
}
