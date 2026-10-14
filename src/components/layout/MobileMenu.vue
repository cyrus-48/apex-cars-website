<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/app/stores/ui'
import { NAV_ITEMS } from '@/data/navigation'
import { SITE } from '@/data/site'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import IconButton from '@/components/ui/IconButton.vue'
import BasePill from '@/components/ui/BasePill.vue'
import IconX from '~icons/ph/x'
import IconArrowUpRight from '~icons/ph/arrow-up-right'

const ui = useUiStore()

function close() {
  ui.menuOpen = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => ui.menuOpen,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)
</script>

<template>
  <Transition name="swap">
    <div
      v-if="ui.menuOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      class="fixed inset-0 z-50 flex flex-col justify-between bg-bg/95 p-6 backdrop-blur-2xl sm:p-10"
    >
      <!-- Top header bar -->
      <div class="flex items-center justify-between">
        <BrandLogo />
        <IconButton aria-label="Close navigation menu" variant="solid" @click="close">
          <IconX class="h-5 w-5" />
        </IconButton>
      </div>

      <!-- Links list -->
      <nav class="my-auto py-8">
        <ul class="m-0 list-none space-y-4 p-0">
          <li v-for="(item, idx) in NAV_ITEMS" :key="item.to" class="overflow-hidden">
            <RouterLink
              :to="item.to"
              class="duration-micro inline-block text-4xl font-semibold tracking-tight text-ink transition-colors hover:text-accent sm:text-5xl"
              :style="{
                animation: 'fade-up 400ms var(--ease-out) both',
                animationDelay: `${idx * 50}ms`,
              }"
              @click="close"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Bottom meta -->
      <div
        class="flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center"
      >
        <div>
          <div class="mb-1 label-caps text-muted">{{ SITE.sector }}</div>
          <p class="text-sm font-medium text-ink">{{ SITE.tagline }}</p>
        </div>

        <div class="flex items-center gap-3">
          <BasePill to="/contact" variant="accent" size="sm" @click="close">
            <span>Configure</span>
            <IconArrowUpRight class="h-4 w-4" />
          </BasePill>
        </div>
      </div>
    </div>
  </Transition>
</template>
