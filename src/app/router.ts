import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    noindex?: boolean
  }
}

/** Every page is a lazy chunk; `prefetchRoute` warms them on hover/idle. */
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/programs', name: 'programs', component: () => import('@/pages/ProgramsPage.vue') },
  { path: '/impact', name: 'impact', component: () => import('@/pages/ImpactPage.vue') },
  { path: '/news', name: 'news', component: () => import('@/pages/NewsPage.vue') },
  { path: '/team', name: 'team', component: () => import('@/pages/TeamPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
  {
    path: '/kit',
    name: 'kit',
    component: () => import('@/pages/KitPage.vue'),
    meta: { noindex: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { noindex: true },
  },
]

export const scrollBehavior: RouterScrollBehavior = (to, _from, saved) => {
  if (saved) return saved
  if (to.hash) return { el: to.hash, top: 96 }
  return { top: 0, left: 0 }
}
