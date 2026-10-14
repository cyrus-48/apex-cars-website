<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useMarquee } from '@/composables/useMarquee'

interface Props {
  speed?: number
  pauseOnHover?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  speed: 60,
  pauseOnHover: true,
  class: undefined,
})

const trackRef = useTemplateRef<HTMLElement>('track')
const { style } = useMarquee(trackRef, props.speed)
</script>

<template>
  <div
    :class="
      cn(
        'marquee overflow-hidden select-none',
        pauseOnHover && 'hover:[&_.marquee-track]:[animation-play-state:paused]',
        props.class,
      )
    "
    :style="style"
  >
    <div ref="track" class="marquee-track flex items-center will-change-transform">
      <!-- Original items -->
      <div class="flex shrink-0 items-center">
        <slot />
      </div>

      <!-- Duplicated items for seamless continuous looping -->
      <div class="flex shrink-0 items-center" aria-hidden="true">
        <slot />
      </div>
    </div>
  </div>
</template>
