<script setup lang="ts">
import { ref, computed, watch, nextTick, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui'
import { NAV_ITEMS } from '@/data/navigation'
import IconButton from '@/components/ui/IconButton.vue'
import IconMagnifyingGlass from '~icons/ph/magnifying-glass'
import IconX from '~icons/ph/x'
import IconArrowRight from '~icons/ph/arrow-right'

const ui = useUiStore()
const router = useRouter()
const query = ref('')
const inputRef = useTemplateRef<HTMLInputElement>('searchInput')

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return NAV_ITEMS
  return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q))
})

function close() {
  ui.searchOpen = false
  query.value = ''
}

function selectRoute(path: string) {
  void router.push(path)
  close()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => ui.searchOpen,
  async (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
      inputRef.value?.focus()
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)
</script>

<template>
  <Transition name="swap">
    <div
      v-if="ui.searchOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
      class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur-md sm:p-12"
      @click.self="close"
    >
      <div
        class="w-full max-w-xl space-y-6 rounded-card border border-line bg-surface p-6 shadow-lift"
      >
        <div class="flex items-center gap-3 border-b border-line pb-4">
          <IconMagnifyingGlass class="h-6 w-6 shrink-0 text-muted" />
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            placeholder="Search pages, models, services..."
            class="w-full bg-transparent text-lg text-ink placeholder:text-muted focus:outline-none"
          />
          <IconButton aria-label="Close search" size="sm" @click="close">
            <IconX class="h-4 w-4" />
          </IconButton>
        </div>

        <div class="no-scrollbar max-h-80 space-y-2 overflow-y-auto">
          <div class="mb-2 px-2 label-caps text-xs text-muted">Jump To</div>
          <button
            v-for="item in results"
            :key="item.to"
            type="button"
            class="flex w-full items-center justify-between rounded-2xl p-3 text-left text-ink transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            @click="selectRoute(item.to)"
          >
            <span class="font-medium">{{ item.label }}</span>
            <IconArrowRight class="h-4 w-4 text-muted" />
          </button>
          <div v-if="results.length === 0" class="p-4 text-center text-sm text-muted">
            No matching sections found.
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
