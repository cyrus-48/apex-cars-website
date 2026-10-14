<script setup lang="ts">
import { PARTNERS_DATA } from '@/data/partners'
import MarqueeBand from '@/components/motion/MarqueeBand.vue'
</script>

<template>
  <section
    class="overflow-hidden border-y border-line bg-surface/50 py-6 select-none sm:py-8"
    aria-label="Technical and Motorsport Partners"
  >
    <div class="container-site mb-3 text-center">
      <span class="label-caps text-[10px] tracking-widest text-muted uppercase">
        Collaborative Technical Architecture
      </span>
    </div>

    <!-- Infinite Continuous Marquee -->
    <MarqueeBand :speed="50" class="py-1">
      <div class="flex items-center gap-8 px-4 sm:gap-12">
        <div
          v-for="partner in PARTNERS_DATA"
          :key="partner.name"
          class="flex shrink-0 items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink text-[10px] font-bold text-on-ink"
          >
            {{ partner.symbol }}
          </span>
          <div>
            <div class="text-xs font-semibold whitespace-nowrap text-ink">{{ partner.name }}</div>
            <div class="text-[9px] tracking-wider whitespace-nowrap text-muted uppercase">
              {{ partner.category }}
            </div>
          </div>
        </div>
      </div>
    </MarqueeBand>
  </section>
</template>
