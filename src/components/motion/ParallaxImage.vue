<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useGsap } from '@/composables/useGsap'
import { MOTION } from '@/lib/easing'

interface Props {
  src: string
  alt: string
  aspectRatio?: string
  percent?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '16/9',
  percent: MOTION.parallaxPercent,
  class: undefined,
})

const containerRef = useTemplateRef<HTMLElement>('container')
const imageRef = useTemplateRef<HTMLImageElement>('img')

useGsap(containerRef, ({ gsap }, el) => {
  if (!imageRef.value) return
  gsap.fromTo(
    imageRef.value,
    { yPercent: -props.percent },
    {
      yPercent: props.percent,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
})
</script>

<template>
  <div
    ref="container"
    :class="cn('relative overflow-hidden rounded-card', props.class)"
    :style="{ aspectRatio }"
  >
    <img
      ref="img"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover will-change-transform select-none"
    />
  </div>
</template>
