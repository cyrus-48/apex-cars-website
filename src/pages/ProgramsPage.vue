<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import ProgramsGrid from '@/features/home/ProgramsGrid.vue'
import ParallaxImage from '@/components/motion/ParallaxImage.vue'
import SplitText from '@/components/motion/SplitText.vue'
import CtaBand from '@/features/home/CtaBand.vue'

useSeo({
  title: 'Programs & Platforms — Apex Cars',
  description:
    'Explore the Apex GT-9, R-Spec Track Weapon, and the 900V SiC modular skateboard platform.',
  path: '/programs',
})
</script>

<template>
  <div class="pt-6 pb-10 sm:pt-8">
    <div class="container-site space-y-8 sm:space-y-10">
      <!-- Page Hero -->
      <section class="max-w-3xl space-y-3">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
        >
          Vehicle Lineup & Architecture
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="Platforms engineered for extremes." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          From road grand-tourers with 720 km range to high-downforce circuit prototypes, discover
          how our 900V platform redefines electric propulsion.
        </p>
      </section>

      <!-- Hero Visual Banner -->
      <ParallaxImage
        src="/src/assets/images/track.jpg"
        alt="Apex R-Spec prototype cornering on circuit"
        aspect-ratio="21/9"
      />

      <!-- Main Programs Grid with Category Filtering -->
      <ProgramsGrid />
    </div>

    <CtaBand />
  </div>
</template>
