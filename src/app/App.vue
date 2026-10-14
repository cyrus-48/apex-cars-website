<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/app/stores/ui'
import { useLenis } from '@/composables/useLenis'
import { usePrefetch } from '@/composables/usePrefetch'
import { ROUTE_PATHS } from '@/data/navigation'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PageTransition from '@/components/layout/PageTransition.vue'
import SitePreloader from '@/components/layout/SitePreloader.vue'
import CustomCursor from '@/components/layout/CustomCursor.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import SearchDialog from '@/components/layout/SearchDialog.vue'

const ui = useUiStore()
const route = useRoute()
const { prefetchAllWhenIdle } = usePrefetch()

// Global Lenis smooth scrolling instance
useLenis()

// Screen-reader announcement for route navigation
const announcement = ref('')
watch(
  () => route.path,
  () => {
    announcement.value = `Navigated to ${String(route.meta.title || route.name || 'page')}`
  },
)

onMounted(() => {
  ui.syncThemeFromDocument()
  prefetchAllWhenIdle(ROUTE_PATHS)
})
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col bg-bg text-ink selection:bg-accent selection:text-on-accent"
  >
    <!-- Accessible Skip Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-on-ink focus:shadow-lift"
    >
      Skip to main content
    </a>

    <!-- ARIA Live region for route announcements -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announcement }}
    </div>

    <!-- Preloader & Cursor -->
    <SitePreloader />
    <CustomCursor />

    <!-- Site Header -->
    <AppHeader />

    <!-- Main router view with page transitions -->
    <main id="main-content" class="flex flex-1 flex-col">
      <PageTransition />
    </main>

    <!-- Site Footer -->
    <AppFooter />

    <!-- Overlays -->
    <MobileMenu />
    <SearchDialog />
  </div>
</template>
