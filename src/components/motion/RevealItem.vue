<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useReveal } from '@/composables/useReveal'

interface Props {
  as?: string
  index?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  index: 0,
  class: undefined,
})

const elRef = useTemplateRef<HTMLElement>('revealEl')
const { isIn } = useReveal(elRef)
</script>

<template>
  <component
    :is="as"
    ref="revealEl"
    :class="cn('reveal', isIn && 'is-in', props.class)"
    :style="{ '--i': index }"
  >
    <slot />
  </component>
</template>
