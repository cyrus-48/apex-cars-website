import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { installViewTransitions } from '@/lib/view-transition'
import '@/styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ app, router, initialState }) => {
    const pinia = createPinia()
    app.use(pinia)

    if (import.meta.env.SSR) initialState.pinia = pinia.state.value
    else if (initialState.pinia) pinia.state.value = initialState.pinia

    if (!import.meta.env.SSR) installViewTransitions(router)
  },
)
