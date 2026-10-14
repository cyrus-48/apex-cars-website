<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/cn'

interface Props {
  as?: 'button' | 'a' | typeof RouterLink
  to?: string
  href?: string
  active?: boolean
  variant?: 'solid' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  to: undefined,
  href: undefined,
  active: false,
  variant: 'outline',
  size: 'md',
  disabled: false,
  type: 'button',
})

const componentTag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return props.as
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-7 px-2.5 text-[11px] tracking-wider uppercase'
    case 'lg':
      return 'h-10 px-5 text-sm font-medium'
    default:
      return 'h-8.5 px-3.5 text-xs font-medium'
  }
})

const variantClasses = computed(() => {
  if (props.active) {
    return 'bg-ink text-on-ink border-ink shadow-sm'
  }

  switch (props.variant) {
    case 'solid':
      return 'bg-ink text-on-ink border-ink hover:opacity-90'
    case 'accent':
      return 'bg-accent text-on-accent border-accent font-semibold hover:brightness-105'
    case 'ghost':
      return 'bg-transparent text-ink border-transparent hover:bg-black/5 dark:hover:bg-white/10'
    default:
      return 'bg-surface text-ink border-line hover:border-ink/40 hover:bg-black/2 dark:hover:bg-white/5'
  }
})
</script>

<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :type="componentTag === 'button' ? type : undefined"
    :disabled="componentTag === 'button' ? disabled : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="
      cn(
        'duration-micro inline-flex items-center justify-center gap-1.5 rounded-lg border whitespace-nowrap transition-all ease-out select-none',
        sizeClasses,
        variantClasses,
        disabled && 'pointer-events-none opacity-40',
      )
    "
  >
    <slot />
  </component>
</template>
