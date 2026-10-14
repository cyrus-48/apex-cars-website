<script setup lang="ts">
import { cn } from '@/lib/cn'

interface Props {
  title: string
  value: string
  detail?: string
  dotSide?: 'left' | 'right' | 'top' | 'bottom'
  index?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  detail: undefined,
  dotSide: 'left',
  index: 0,
  class: undefined,
})
</script>

<template>
  <div
    :class="
      cn(
        'hero-callout relative max-w-[180px] rounded-lg border border-white/60 p-2.5 shadow-soft glass select-none sm:max-w-[200px] sm:p-3 dark:border-white/10',
        props.class,
      )
    "
    :style="{ '--i': index }"
  >
    <!-- Floating connector dot & pulse -->
    <div
      :class="
        cn(
          'absolute flex items-center justify-center',
          dotSide === 'left' && 'top-1/2 -left-2 -translate-y-1/2',
          dotSide === 'right' && 'top-1/2 -right-2 -translate-y-1/2',
          dotSide === 'top' && '-top-2 left-1/2 -translate-x-1/2',
          dotSide === 'bottom' && '-bottom-2 left-1/2 -translate-x-1/2',
        )
      "
      aria-hidden="true"
    >
      <span
        class="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] ring-2 ring-white/80"
      />
    </div>

    <div class="mb-1 label-caps text-[10px] tracking-widest text-muted uppercase">
      {{ title }}
    </div>
    <div class="text-base leading-tight font-semibold text-ink sm:text-lg">
      {{ value }}
    </div>
    <div v-if="detail" class="mt-1 text-xs leading-snug text-muted">
      {{ detail }}
    </div>
  </div>
</template>
