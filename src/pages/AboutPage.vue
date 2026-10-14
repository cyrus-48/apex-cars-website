<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import { SITE } from '@/data/site'
import BaseCard from '@/components/ui/BaseCard.vue'
import BasePill from '@/components/ui/BasePill.vue'
import ParallaxImage from '@/components/motion/ParallaxImage.vue'
import SplitText from '@/components/motion/SplitText.vue'
import CtaBand from '@/features/home/CtaBand.vue'
import IconArrowUpRight from '~icons/ph/arrow-up-right'

useSeo({
  title: 'About Apex — Swedish Electric Performance',
  description:
    'Founded in Gothenburg in 2014, Apex synthesizes sustainable engineering with pure track performance.',
  path: '/about',
})

const MILESTONES = [
  {
    year: '2014',
    title: 'Founded in Gothenburg',
    desc: 'Began development of high-density electric skateboard platforms.',
  },
  {
    year: '2019',
    title: 'First 900V SiC Prototype',
    desc: 'Breakthrough in dielectric submerged inverter cooling achieved.',
  },
  {
    year: '2023',
    title: 'GT-9 Unveiled',
    desc: 'Flagship grand tourer wins international aerodynamic design accolades.',
  },
  {
    year: '2026',
    title: 'Net-Negative Production',
    desc: 'Gothenburg facility achieves zero-fossil closed loop assembly.',
  },
]
</script>

<template>
  <div class="pt-6 pb-10 sm:pt-8">
    <div class="container-site space-y-10 sm:space-y-12">
      <!-- Page Hero -->
      <section class="max-w-3xl space-y-3">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
        >
          Heritage & Ethos
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="Born on Scandinavian tarmac." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          {{ SITE.mission }} Driven by Nordic minimalism and motorsport tenacity, we believe
          sustainable speed should require no apologies.
        </p>
      </section>

      <!-- Visual Showcase -->
      <section class="grid grid-cols-1 items-center gap-5 sm:gap-6 md:grid-cols-2">
        <ParallaxImage
          src="/src/assets/images/studio.jpg"
          alt="Apex design studio sculpting clay concept car"
          aspect-ratio="4/3"
        />
        <div class="space-y-4">
          <span class="label-caps text-[10px] text-muted">The Gothenburg Standard</span>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            Form follows aerodynamic airflow.
          </h2>
          <p class="text-xs leading-relaxed text-muted sm:text-sm">
            Unlike traditional luxury manufacturers who add ornamentation, our studio in Gothenburg
            strips every extraneous line until only pure aerodynamic function remains.
          </p>
          <div class="pt-1">
            <BasePill to="/team" variant="outline" size="sm">
              <span>Meet the Studio Team</span>
              <IconArrowUpRight class="h-3.5 w-3.5" />
            </BasePill>
          </div>
        </div>
      </section>

      <!-- Milestones Timeline -->
      <section class="space-y-4">
        <div class="space-y-1">
          <span class="label-caps text-[10px] text-muted">Evolution</span>
          <h2 class="text-h2 font-semibold">Key Milestones</h2>
        </div>

        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <BaseCard v-for="m in MILESTONES" :key="m.year" padding="sm" hover class="space-y-2">
            <div class="text-stat leading-none font-semibold text-accent">{{ m.year }}</div>
            <h3 class="text-sm font-semibold text-ink">{{ m.title }}</h3>
            <p class="text-xs leading-relaxed text-muted">{{ m.desc }}</p>
          </BaseCard>
        </div>
      </section>
    </div>

    <CtaBand />
  </div>
</template>
