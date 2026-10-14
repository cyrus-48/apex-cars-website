<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import { IMPACT_STATS } from '@/data/impact'
import StatTile from '@/components/ui/StatTile.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import ParallaxImage from '@/components/motion/ParallaxImage.vue'
import SplitText from '@/components/motion/SplitText.vue'
import CtaBand from '@/features/home/CtaBand.vue'

useSeo({
  title: 'Environmental & Technical Impact — Apex Cars',
  description:
    'Verified lifecycle metrics, closed-loop battery recycling, and 100% renewable Swedish manufacturing.',
  path: '/impact',
})
</script>

<template>
  <div class="pt-6 pb-10 sm:pt-8">
    <div class="container-site space-y-10 sm:space-y-12">
      <!-- Page Hero -->
      <section class="max-w-3xl space-y-3">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
        >
          Accountability
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="Velocity with responsibility." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          True performance must outlast its lap times. We publish transparent lifecycle emissions
          and raw material recovery audits every quarter.
        </p>
      </section>

      <!-- Key Stat Grid -->
      <section class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <StatTile
          v-for="stat in IMPACT_STATS"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :unit="stat.unit"
          :prefix="stat.prefix"
          :decimals="stat.decimals"
          :description="stat.description"
        />
      </section>

      <!-- Battery Circularity Feature -->
      <section class="grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-2">
        <ParallaxImage
          src="/src/assets/images/battery.jpg"
          alt="Exposed high-voltage battery pack skateboard chassis"
          aspect-ratio="4/3"
        />
        <div class="space-y-4">
          <span class="label-caps text-[10px] text-muted">Circular Chemistry</span>
          <h2 class="text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
            94.8% material recovery with closed-loop hydrometallurgy.
          </h2>
          <p class="text-xs leading-relaxed text-muted sm:text-sm">
            In partnership with Northvolt, decommissioned battery packs from test fleets are
            recycled directly into cathode active material for subsequent production runs.
          </p>
          <div class="grid grid-cols-2 gap-3 pt-2">
            <BaseCard padding="sm" class="space-y-1">
              <div class="text-xl font-bold text-accent sm:text-2xl">0 kg</div>
              <div class="text-[11px] text-muted">Black mass sent to landfill</div>
            </BaseCard>
            <BaseCard padding="sm" class="space-y-1">
              <div class="text-xl font-bold text-accent sm:text-2xl">-68%</div>
              <div class="text-[11px] text-muted">CO₂ vs primary raw lithium</div>
            </BaseCard>
          </div>
        </div>
      </section>
    </div>

    <CtaBand />
  </div>
</template>
