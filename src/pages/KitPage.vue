<script setup lang="ts">
import { ref } from 'vue'
import { useSeo } from '@/lib/seo'
import BasePill from '@/components/ui/BasePill.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconButton from '@/components/ui/IconButton.vue'
import StatTile from '@/components/ui/StatTile.vue'
import FilterChip from '@/components/ui/FilterChip.vue'
import CalloutCard from '@/components/ui/CalloutCard.vue'
import IconMagnifyingGlass from '~icons/ph/magnifying-glass'
import IconArrowRight from '~icons/ph/arrow-right'
import IconArrowUpRight from '~icons/ph/arrow-up-right'
import IconLightning from '~icons/ph/lightning'

useSeo({
  title: 'UI Kit — Apex Design System',
  description: 'Design system primitives and component showcase for Apex Cars.',
  path: '/kit',
  noindex: true,
})

const activeFilter = ref('performance')
const pillActive = ref(true)
</script>

<template>
  <main class="min-h-screen bg-bg pt-6 pb-12 text-ink sm:pt-8">
    <div class="container-site space-y-8 sm:space-y-10">
      <div class="max-w-2xl space-y-2">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
          >Design System</span
        >
        <h1 class="text-h2 font-semibold">Apex Component Kit</h1>
        <p class="text-body text-xs text-muted sm:text-sm">
          Design primitives adhering to the Apex motion and editorial styling guidelines.
        </p>
      </div>

      <!-- Pills -->
      <section class="space-y-3">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">Pill Buttons (BasePill)</h2>
        <div class="flex flex-wrap items-center gap-4">
          <BasePill :active="pillActive" @click="pillActive = !pillActive">Active Pill</BasePill>
          <BasePill variant="outline">Outline</BasePill>
          <BasePill variant="solid">Solid Black</BasePill>
          <BasePill variant="accent">Accent Lime</BasePill>
          <BasePill variant="ghost">Ghost</BasePill>
          <BasePill size="sm">Small</BasePill>
          <BasePill size="lg">
            <span>Large Button</span>
            <IconArrowRight class="h-4 w-4" />
          </BasePill>
          <BasePill disabled>Disabled</BasePill>
        </div>
      </section>

      <!-- Icon Buttons -->
      <section class="space-y-6">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">
          Circular Icon Buttons (IconButton)
        </h2>
        <div class="flex items-center gap-4">
          <IconButton aria-label="Search" magnetic>
            <IconMagnifyingGlass class="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Explore" variant="solid" magnetic>
            <IconArrowUpRight class="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Power" variant="accent" magnetic>
            <IconLightning class="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Glass" variant="glass">
            <IconArrowRight class="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Small" size="sm">
            <IconArrowRight class="h-4 w-4" />
          </IconButton>
          <IconButton aria-label="Large" size="lg">
            <IconArrowRight class="h-6 w-6" />
          </IconButton>
        </div>
      </section>

      <!-- Filter Chips -->
      <section class="space-y-6">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">Filter Chips (FilterChip)</h2>
        <div class="flex flex-wrap gap-3">
          <FilterChip
            label="All Models"
            :active="activeFilter === 'all'"
            :count="14"
            @click="activeFilter = 'all'"
          />
          <FilterChip
            label="Performance"
            color="#C6F432"
            :active="activeFilter === 'performance'"
            :count="6"
            @click="activeFilter = 'performance'"
          />
          <FilterChip
            label="Grand Touring"
            color="#4A90E2"
            :active="activeFilter === 'touring'"
            :count="4"
            @click="activeFilter = 'touring'"
          />
          <FilterChip
            label="Track Spec"
            color="#FF4338"
            :active="activeFilter === 'track'"
            :count="4"
            @click="activeFilter = 'track'"
          />
        </div>
      </section>

      <!-- Stat Tiles -->
      <section class="space-y-6">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">Stat Tiles (StatTile)</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatTile
            label="0-100 km/h"
            :value="1.9"
            unit="sec"
            :decimals="1"
            description="Sub-two second launch"
          />
          <StatTile
            label="WLTP Range"
            :value="720"
            unit="km"
            description="Aerodynamic long-range battery pack"
          />
          <StatTile
            label="Peak Output"
            :value="1150"
            unit="hp"
            description="Dual permanent-magnet motors"
          />
        </div>
      </section>

      <!-- Cards & Tilt -->
      <section class="space-y-6">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">Cards & 3D Tilt (BaseCard)</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <BaseCard hover tilt class="space-y-3">
            <div class="label-caps text-muted">Surface Card</div>
            <h3 class="text-xl font-semibold">Interactive 3D Tilt</h3>
            <p class="text-sm text-muted">Hover to feel the subtle 6-degree perspective tilt.</p>
          </BaseCard>

          <BaseCard variant="dark" hover tilt class="space-y-3">
            <div class="label-caps text-accent">Dark Card</div>
            <h3 class="text-xl font-semibold">Inverted Contrast</h3>
            <p class="text-sm text-muted">Solid dark slate with high-contrast copy.</p>
          </BaseCard>

          <BaseCard variant="glass" hover class="space-y-3">
            <div class="label-caps text-muted">Glass Card</div>
            <h3 class="text-xl font-semibold">Frosted Backdrop</h3>
            <p class="text-sm text-muted">12px background blur with translucent tint.</p>
          </BaseCard>
        </div>
      </section>

      <!-- Floating Callouts -->
      <section class="space-y-6">
        <h2 class="border-b border-line pb-2 text-xl font-semibold">
          Glass Callouts (CalloutCard)
        </h2>
        <div
          class="flex flex-wrap items-center justify-around gap-4 rounded-lg bg-neutral-900 p-6 sm:p-8"
        >
          <CalloutCard
            title="Top Speed"
            value="340 km/h"
            detail="Electronically limited"
            dot-side="left"
          />
          <CalloutCard
            title="Architecture"
            value="900V SiC"
            detail="Ultra-fast charging"
            dot-side="bottom"
          />
          <CalloutCard
            title="Drag Coeff"
            value="0.198 Cd"
            detail="Active aero wing"
            dot-side="right"
          />
        </div>
      </section>
    </div>
  </main>
</template>
