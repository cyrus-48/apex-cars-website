<script setup lang="ts">
import { cn } from '@/lib/cn'

interface Props {
  variant?: 'full' | 'mark'
  class?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'full',
  class: undefined,
})
</script>

<template>
  <div :class="cn('inline-flex items-center gap-3 select-none', $props.class)">
    <!-- Monogram symbol -->
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 shrink-0"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" class="fill-ink" />
      <path d="M16 6L24 24H19.5L16 16L12.5 24H8L16 6Z" fill="currentColor" class="text-surface" />
      <circle cx="16" cy="18" r="2" class="fill-accent" />
    </svg>

    <!-- Wordmark -->
    <span
      v-if="variant === 'full'"
      class="font-sans text-xl leading-none font-semibold tracking-[-0.05em] text-ink uppercase"
    >
      Apex
    </span>
  </div>
</template>
