<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import { TEAM_DATA } from '@/data/team'
import BaseCard from '@/components/ui/BaseCard.vue'
import SplitText from '@/components/motion/SplitText.vue'
import CtaBand from '@/features/home/CtaBand.vue'

useSeo({
  title: 'Engineering & Design Team — Apex Cars',
  description:
    'Meet the aerodynamicists, powertrain engineers, and designers crafting Apex vehicles in Gothenburg.',
  path: '/team',
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
          Leadership & R&D
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="The minds behind the velocity." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          From Formula 1 aerodynamicists to battery chemistry doctorates, our multidisciplinary
          collective builds cars with singular focus.
        </p>
      </section>

      <!-- Team Members Grid -->
      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <BaseCard
          v-for="member in TEAM_DATA"
          :key="member.id"
          padding="none"
          hover
          class="flex flex-col justify-between overflow-hidden"
        >
          <!-- Portrait Image -->
          <div class="relative aspect-square overflow-hidden bg-neutral-900">
            <img
              :src="member.image"
              :alt="member.name"
              loading="lazy"
              decoding="async"
              class="duration-ui h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>

          <!-- Bio & Role -->
          <div class="space-y-2.5 p-4 sm:p-5">
            <div>
              <h2 class="text-base leading-snug font-semibold text-ink sm:text-lg">
                {{ member.name }}
              </h2>
              <p class="mt-0.5 text-[11px] font-semibold tracking-wider text-accent uppercase">
                {{ member.role }}
              </p>
            </div>

            <p class="line-clamp-3 text-xs leading-relaxed text-muted">
              {{ member.bio }}
            </p>

            <div class="flex flex-wrap gap-1 pt-1.5">
              <span
                v-for="tag in member.tags"
                :key="tag"
                class="rounded-md bg-black/5 px-2 py-0.5 text-[9px] font-medium tracking-wider text-muted uppercase dark:bg-white/10"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </BaseCard>
      </section>
    </div>

    <CtaBand />
  </div>
</template>
