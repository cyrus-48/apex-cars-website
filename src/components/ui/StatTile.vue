<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/composables/useCountUp'

interface Props {
  label: string
  value: number
  unit?: string
  prefix?: string
  decimals?: number
  description?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  prefix: '',
  decimals: 0,
  description: undefined,
  class: undefined,
})

const rootRef = useTemplateRef<HTMLElement>('tile')
const { display, arm } = useCountUp(rootRef, props.value, { decimals: props.decimals })

onMounted(() => {
  arm()
})
</script>

<template>
  <div
    ref="tile"
    :class="
      cn(
        'flex min-w-[200px] flex-col justify-between rounded-card border border-line bg-surface p-4 text-ink shadow-soft select-none sm:p-5',
        props.class,
      )
    "
  >
    <div class="mb-4 flex items-center justify-between">
      <span class="label-caps text-muted">{{ label }}</span>
      <slot name="icon" />
    </div>

    <div>
      <div
        class="flex items-baseline gap-1 tabular text-stat font-semibold tracking-tight text-ink"
      >
        <span v-if="prefix" class="text-3xl font-normal text-muted">{{ prefix }}</span>
        <span>{{ display }}</span>
        <span v-if="unit" class="ms-1 text-lg font-normal text-muted sm:text-2xl">{{ unit }}</span>
      </div>

      <p v-if="description" class="mt-2 text-sm text-muted">
        {{ description }}
      </p>
    </div>
  </div>
</template>
