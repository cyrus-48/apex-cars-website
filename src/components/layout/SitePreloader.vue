<script setup lang="ts">
import { onMounted, ref } from 'vue'

const visible = ref(true)

onMounted(() => {
  // Ensure it never stays more than 800ms even if CSS animation gets interrupted
  const timer = setTimeout(() => {
    visible.value = false
  }, 850)
  return () => clearTimeout(timer)
})
</script>

<template>
  <aside
    v-if="visible"
    aria-hidden="true"
    class="preloader pointer-events-none fixed inset-0 z-50 flex flex-col justify-between bg-ink p-8 text-on-ink select-none sm:p-12"
  >
    <div class="flex items-center justify-between text-xs tracking-widest text-muted uppercase">
      <span>Apex Engineering</span>
      <span>Gothenburg, Sweden</span>
    </div>

    <div class="my-auto flex items-baseline gap-2">
      <span class="preloader-count tabular text-6xl font-bold tracking-tighter sm:text-8xl" />
      <span class="text-xl font-semibold text-accent sm:text-3xl">%</span>
    </div>

    <div class="flex items-center justify-between text-xs tracking-widest text-muted uppercase">
      <span>System Check</span>
      <span>Ready</span>
    </div>
  </aside>
</template>
