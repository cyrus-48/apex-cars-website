<script setup lang="ts">
import { ref } from 'vue'
import { SITE } from '@/data/site'
import BasePill from '@/components/ui/BasePill.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import SplitText from '@/components/motion/SplitText.vue'
import MagneticWrapper from '@/components/motion/MagneticWrapper.vue'
import HeroCallouts from './HeroCallouts.vue'
import IconArrowUpRight from '~icons/ph/arrow-up-right'
import IconSparkle from '~icons/ph/sparkle'

type HeroTab = 'mission' | 'programs' | 'impact' | 'community'

const activeTab = ref<HeroTab>('mission')

const TABS: { id: HeroTab; label: string }[] = [
  { id: 'mission', label: 'Mission' },
  { id: 'programs', label: 'Programs' },
  { id: 'impact', label: 'Impact' },
  { id: 'community', label: 'Community' },
]
</script>

<template>
  <section class="relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-12">
    <div class="container-site space-y-5 sm:space-y-6">
      <!-- Top Headline Row -->
      <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div class="max-w-2xl space-y-2.5">
          <div
            class="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold tracking-wider text-muted uppercase"
          >
            <IconSparkle class="h-3 w-3 text-accent" />
            <span>Next-Generation Electric Performance</span>
          </div>

          <h1 class="text-display leading-[0.96] font-semibold tracking-[-0.04em] text-ink">
            <SplitText text="Electric performance," />
            <br />
            <span class="text-muted/60">
              <SplitText text="engineered for the edge." delay="240ms" />
            </span>
          </h1>
        </div>

        <p class="enter-up max-w-sm text-body text-xs text-muted sm:text-sm lg:text-right">
          {{ SITE.mission }}
        </p>
      </div>

      <!-- Main Interactive Stage -->
      <div class="relative grid grid-cols-1 items-center gap-3.5 sm:gap-4 lg:grid-cols-12">
        <!-- Left Vertical Pill Tabs (Desktop) -->
        <div class="z-20 flex flex-wrap gap-1.5 lg:col-span-2 lg:flex-col">
          <BasePill
            v-for="t in TABS"
            :key="t.id"
            :active="activeTab === t.id"
            size="sm"
            class="w-full justify-start text-left"
            @click="activeTab = t.id"
          >
            {{ t.label }}
          </BasePill>
        </div>

        <!-- Center Hero Visual & Pinned Callouts -->
        <div
          class="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-lift sm:min-h-[400px] lg:col-span-7"
        >
          <img
            src="@/assets/images/hero-car.jpg"
            alt="Apex GT-9 electric performance grand tourer in matte black"
            width="1280"
            height="720"
            class="hero-image pointer-events-none h-full w-full scale-100 object-cover select-none"
          />

          <!-- Floating Callout Cards Layer -->
          <HeroCallouts :tab="activeTab" />
        </div>

        <!-- Right Dark Promise Card & CTA -->
        <div class="lg:col-span-3">
          <BaseCard variant="dark" padding="md" class="space-y-4">
            <div class="label-caps text-[10px] tracking-widest text-accent">Engineered Promise</div>

            <p class="text-lg leading-tight font-semibold tracking-tight text-on-ink sm:text-xl">
              Instant torque. Zero compromises. Complete sustainability.
            </p>

            <p class="text-xs leading-relaxed text-muted">
              Experience the dual-motor 900V SiC architecture delivering 1,150 HP with 720 km of
              real-world endurance.
            </p>

            <div class="pt-1">
              <MagneticWrapper>
                <BasePill to="/programs" variant="accent" size="md" class="w-full">
                  <span>Explore Programs</span>
                  <IconArrowUpRight class="h-3.5 w-3.5" />
                </BasePill>
              </MagneticWrapper>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </section>
</template>
