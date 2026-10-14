<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { NAV_ITEMS } from '@/data/navigation'
import { usePillIndicator } from '@/composables/usePillIndicator'
import { usePrefetch } from '@/composables/usePrefetch'

const route = useRoute()
const { prefetch } = usePrefetch()

const hoveredIndex = ref<number | null>(null)

const activeIndex = computed(() => {
  const index = NAV_ITEMS.findIndex((item) => {
    if (item.to === '/') return route.path === '/'
    return route.path.startsWith(item.to)
  })
  return index === -1 ? 0 : index
})

const displayIndex = computed(() => {
  return hoveredIndex.value !== null ? hoveredIndex.value : activeIndex.value
})

const containerRef = useTemplateRef<HTMLElement>('container')
const { clip, ready } = usePillIndicator(containerRef, displayIndex)
</script>

<template>
  <nav
    ref="container"
    aria-label="Primary"
    class="relative inline-flex items-center rounded-lg border border-line bg-surface/80 p-1 shadow-xs backdrop-blur-md"
    @mouseleave="hoveredIndex = null"
  >
    <!-- Base links layer -->
    <ul class="relative m-0 flex list-none items-center gap-0.5 p-0">
      <li v-for="(item, idx) in NAV_ITEMS" :key="item.to">
        <RouterLink
          :to="item.to"
          data-pill
          class="duration-micro relative z-10 block rounded-md px-3 py-1.5 text-[11px] font-medium tracking-wider text-muted uppercase transition-colors select-none hover:text-ink"
          @mouseenter="
            hoveredIndex = idx
            prefetch(item.to)
          "
          @focus="
            hoveredIndex = idx
            prefetch(item.to)
          "
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>

    <!-- Sliding active/hover indicator overlay -->
    <div
      class="pointer-events-none absolute inset-0 rounded-lg p-1"
      :style="{
        clipPath: clip,
        transition: ready ? 'clip-path var(--dur-ui) var(--ease-out)' : 'none',
      }"
      aria-hidden="true"
    >
      <div class="flex h-full w-full items-center rounded-md bg-ink">
        <ul class="m-0 flex list-none items-center gap-0.5 p-0">
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <span
              class="block rounded-md px-3 py-1.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-on-ink uppercase select-none"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
