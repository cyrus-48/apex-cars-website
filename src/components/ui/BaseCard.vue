<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useTilt } from '@/composables/useTilt'

interface Props {
  as?: string
  variant?: 'surface' | 'dark' | 'glass' | 'accent'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  tilt?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'surface',
  padding: 'md',
  hover: false,
  tilt: false,
  class: undefined,
})

const cardRef = useTemplateRef<HTMLElement>('card')
if (props.tilt) {
  useTilt(cardRef)
}

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'dark':
      return 'bg-ink text-on-ink border-transparent shadow-soft'
    case 'glass':
      return 'glass text-ink border-line/60 shadow-soft'
    case 'accent':
      return 'bg-accent text-on-accent border-accent/20 shadow-soft'
    default:
      return 'bg-surface text-ink border-line shadow-soft'
  }
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0'
    case 'sm':
      return 'p-2.5 sm:p-3.5'
    case 'lg':
      return 'p-5 sm:p-7'
    default:
      return 'p-4 sm:p-5'
  }
})
</script>

<template>
  <component
    :is="as"
    ref="card"
    :class="
      cn(
        'duration-ui relative overflow-hidden rounded-card border transition-all ease-out',
        variantClasses,
        paddingClasses,
        hover && 'can-hover:hover:-translate-y-1 can-hover:hover:shadow-lift',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
