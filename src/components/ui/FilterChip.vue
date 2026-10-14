<script setup lang="ts">
import { cn } from '@/lib/cn'

interface Props {
  label: string
  active?: boolean
  count?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  count: undefined,
  color: undefined,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    :class="
      cn(
        'group duration-micro inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-all ease-out select-none',
        active
          ? 'border-ink bg-ink text-on-ink shadow-sm'
          : 'border-line bg-surface text-ink hover:border-ink/40',
      )
    "
    @click="emit('click')"
  >
    <span
      v-if="color"
      class="duration-micro h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
      :style="{ backgroundColor: color }"
      aria-hidden="true"
    />
    <span>{{ label }}</span>
    <span
      v-if="typeof count === 'number'"
      :class="
        cn(
          'rounded-md px-1.5 py-0.5 text-[10px] transition-colors',
          active ? 'bg-white/20 text-white' : 'bg-black/5 text-muted dark:bg-white/10',
        )
      "
    >
      {{ count }}
    </span>
  </button>
</template>
