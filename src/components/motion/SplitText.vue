<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

interface Props {
  text: string
  as?: string
  delay?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  delay: undefined,
  class: undefined,
})

const words = computed(() => props.text.split(' '))
</script>

<template>
  <component
    :is="as"
    :class="cn('inline-flex flex-wrap gap-x-[0.25em] overflow-hidden', props.class)"
    :style="delay ? { '--split-delay': delay } : undefined"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      class="split-word inline-block overflow-hidden align-top"
      :style="{ '--i': i }"
    >
      <span class="inline-block will-change-transform">
        {{ word }}
      </span>
    </span>
  </component>
</template>
