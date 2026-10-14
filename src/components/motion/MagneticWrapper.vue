<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useMagnetic } from '@/composables/useMagnetic'

interface Props {
  as?: string
  strength?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  strength: undefined,
  class: undefined,
})

const targetRef = useTemplateRef<HTMLElement>('target')
useMagnetic(targetRef, props.strength)
</script>

<template>
  <component :is="as" ref="target" :class="cn('inline-block will-change-transform', props.class)">
    <slot />
  </component>
</template>
