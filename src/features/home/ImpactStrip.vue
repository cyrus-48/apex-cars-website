<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { IMPACT_STATS } from '@/data/impact'
import { useDragScroll } from '@/composables/useDragScroll'
import StatTile from '@/components/ui/StatTile.vue'
import IconButton from '@/components/ui/IconButton.vue'
import IconArrowLeft from '~icons/ph/arrow-left'
import IconArrowRight from '~icons/ph/arrow-right'

const trackRef = useTemplateRef<HTMLElement>('track')
const { progressStyle, atStart, atEnd, page } = useDragScroll(trackRef)
</script>

<template>
  <section class="py-8 cv-auto sm:py-10" aria-labelledby="impact-heading">
    <div class="container-site space-y-4">
      <!-- Section Header with Arrows -->
      <div class="flex items-end justify-between gap-4">
        <div class="space-y-1">
          <span
            class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
          >
            Sustainability & Scale
          </span>
          <h2 id="impact-heading" class="text-h2 font-semibold tracking-tight text-ink">
            Measurable impact, verified.
          </h2>
        </div>

        <div class="flex items-center gap-1.5">
          <IconButton
            aria-label="Scroll impact tiles left"
            size="sm"
            :disabled="atStart"
            @click="page(-1)"
          >
            <IconArrowLeft class="h-4 w-4" />
          </IconButton>
          <IconButton
            aria-label="Scroll impact tiles right"
            size="sm"
            :disabled="atEnd"
            @click="page(1)"
          >
            <IconArrowRight class="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <!-- Drag & Scroll Horizontal Track -->
      <div
        ref="track"
        class="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto py-1 select-none active:cursor-grabbing sm:gap-4"
        role="region"
        aria-label="Impact statistics carousel"
      >
        <div
          v-for="stat in IMPACT_STATS"
          :key="stat.label"
          class="w-[240px] shrink-0 snap-start sm:w-[280px]"
        >
          <StatTile
            :label="stat.label"
            :value="stat.value"
            :unit="stat.unit"
            :prefix="stat.prefix"
            :decimals="stat.decimals"
            :description="stat.description"
            class="h-full"
          />
        </div>
      </div>

      <!-- Drag Progress Bar -->
      <div class="h-1 w-full overflow-hidden rounded-full bg-line">
        <div
          class="duration-micro h-full origin-left rounded-full bg-ink transition-transform"
          :style="progressStyle"
        />
      </div>
    </div>
  </section>
</template>
