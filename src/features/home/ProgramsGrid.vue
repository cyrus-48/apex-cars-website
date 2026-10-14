<script setup lang="ts">
import { ref, computed } from 'vue'
import { PROGRAMS_DATA, type ProgramItem } from '@/data/programs'
import BasePill from '@/components/ui/BasePill.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import FilterChip from '@/components/ui/FilterChip.vue'
import IconArrowUpRight from '~icons/ph/arrow-up-right'

type CategoryFilter = 'all' | 'vehicles' | 'technology' | 'charging'

const activeFilter = ref<CategoryFilter>('all')

const filteredPrograms = computed<ProgramItem[]>(() => {
  if (activeFilter.value === 'all') return PROGRAMS_DATA
  return PROGRAMS_DATA.filter((item) => item.category === activeFilter.value)
})
</script>

<template>
  <section class="py-8 cv-auto sm:py-10" aria-labelledby="programs-heading">
    <div class="container-site space-y-6">
      <!-- Section Title & Filter Tabs -->
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div class="space-y-1.5">
          <span
            class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
          >
            Vehicle & Architecture R&D
          </span>
          <h2 id="programs-heading" class="text-h2 font-semibold tracking-tight text-ink">
            Programs & Platforms
          </h2>
          <p class="max-w-md text-xs text-muted sm:text-sm">
            High-voltage electric architectures engineered for instantaneous delivery and zero
            degradation.
          </p>
        </div>

        <!-- Filter Pill Chips -->
        <div class="flex flex-wrap gap-1.5">
          <FilterChip
            label="All Programs"
            :active="activeFilter === 'all'"
            :count="PROGRAMS_DATA.length"
            @click="activeFilter = 'all'"
          />
          <FilterChip
            label="Vehicles"
            color="#C6F432"
            :active="activeFilter === 'vehicles'"
            :count="2"
            @click="activeFilter = 'vehicles'"
          />
          <FilterChip
            label="Platform SiC"
            color="#4A90E2"
            :active="activeFilter === 'technology'"
            :count="1"
            @click="activeFilter = 'technology'"
          />
          <FilterChip
            label="Charging Grid"
            color="#E2744A"
            :active="activeFilter === 'charging'"
            :count="1"
            @click="activeFilter = 'charging'"
          />
        </div>
      </div>

      <!-- FLIP Animated Cards Grid -->
      <TransitionGroup
        name="grid"
        tag="div"
        class="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2"
      >
        <BaseCard
          v-for="program in filteredPrograms"
          :key="program.id"
          padding="none"
          hover
          tilt
          class="group flex flex-col justify-between"
        >
          <!-- Image Header with Zoom on Hover -->
          <div class="relative h-44 overflow-hidden bg-neutral-900 sm:h-52">
            <img
              :src="program.image"
              :alt="program.title"
              loading="lazy"
              decoding="async"
              class="duration-ui h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
            />
            <div
              v-if="program.badge"
              class="absolute top-3 left-3 rounded-md border border-white/20 bg-ink/80 px-2 py-0.5 label-caps text-[10px] text-on-ink backdrop-blur-md"
            >
              {{ program.badge }}
            </div>
          </div>

          <!-- Content Details -->
          <div class="flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-5">
            <div class="space-y-1">
              <h3 class="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                {{ program.title }}
              </h3>
              <p class="text-xs font-medium text-muted">
                {{ program.subtitle }}
              </p>
              <p class="pt-1 text-xs leading-relaxed text-ink-soft">
                {{ program.description }}
              </p>
            </div>

            <!-- Stats strip & CTA -->
            <div class="flex items-center justify-between gap-3 border-t border-line pt-3">
              <div class="flex items-center gap-4 sm:gap-6">
                <div v-for="stat in program.stats" :key="stat.label">
                  <div class="label-caps text-[9px] text-muted">{{ stat.label }}</div>
                  <div class="text-sm font-semibold text-ink">{{ stat.value }}</div>
                </div>
              </div>

              <BasePill to="/programs" size="sm" variant="outline" class="shrink-0">
                <span>Details</span>
                <IconArrowUpRight class="h-3 w-3" />
              </BasePill>
            </div>
          </div>
        </BaseCard>
      </TransitionGroup>
    </div>
  </section>
</template>
