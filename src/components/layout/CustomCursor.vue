<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useCursor } from '@/composables/useCursor'

const dotRef = useTemplateRef<HTMLElement>('dot')
const { enabled, hasMoved, active, label } = useCursor(dotRef)
</script>

<template>
  <div
    v-if="enabled && hasMoved"
    ref="dot"
    aria-hidden="true"
    class="duration-micro pointer-events-none fixed top-0 left-0 z-50 -mt-1.5 -ml-1.5 hidden items-center justify-center rounded-full transition-[width,height,background-color] ease-out lg:flex"
    :class="[
      active
        ? '-mt-4 -ml-4 h-8 w-8 bg-accent/40 ring-1 ring-accent backdrop-blur-[2px]'
        : 'h-3 w-3 bg-ink',
    ]"
  >
    <span
      v-if="label"
      class="text-[8px] font-bold tracking-widest whitespace-nowrap text-on-accent uppercase"
    >
      {{ label }}
    </span>
  </div>
</template>
