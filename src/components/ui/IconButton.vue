<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/cn'
import { useMagnetic } from '@/composables/useMagnetic'

interface Props {
  as?: 'button' | 'a' | typeof RouterLink
  to?: string
  href?: string
  variant?: 'outline' | 'solid' | 'ghost' | 'accent' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  ariaLabel?: string
  magnetic?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  to: undefined,
  href: undefined,
  variant: 'outline',
  size: 'md',
  ariaLabel: undefined,
  magnetic: false,
  disabled: false,
  type: 'button',
})

const buttonRef = useTemplateRef<HTMLElement>('btn')
if (props.magnetic) {
  useMagnetic(buttonRef)
}

const componentTag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return props.as
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-7.5 h-7.5 text-xs'
    case 'lg':
      return 'w-11 h-11 text-lg'
    default:
      return 'w-9 h-9 text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'solid':
      return 'bg-ink text-on-ink border-ink hover:opacity-90'
    case 'accent':
      return 'bg-accent text-on-accent border-accent hover:brightness-105'
    case 'glass':
      return 'glass text-ink border-line/60 hover:bg-surface'
    case 'ghost':
      return 'bg-transparent text-ink border-transparent hover:bg-black/5 dark:hover:bg-white/10'
    default:
      return 'bg-surface text-ink border-line hover:border-ink/50'
  }
})
</script>

<template>
  <component
    :is="componentTag"
    ref="btn"
    :to="to"
    :href="href"
    :type="componentTag === 'button' ? type : undefined"
    :disabled="componentTag === 'button' ? disabled : undefined"
    :aria-label="ariaLabel"
    :class="
      cn(
        'group duration-micro relative inline-flex shrink-0 items-center justify-center rounded-lg border transition-all ease-out select-none',
        sizeClasses,
        variantClasses,
        disabled && 'pointer-events-none opacity-40',
      )
    "
  >
    <span
      class="duration-micro relative z-10 flex items-center justify-center transition-transform ease-out group-hover:scale-105"
    >
      <slot />
    </span>
  </component>
</template>
