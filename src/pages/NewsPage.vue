<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeo } from '@/lib/seo'
import { NEWS_DATA, type NewsArticle } from '@/data/news'
import { formatDate } from '@/lib/format'
import BaseCard from '@/components/ui/BaseCard.vue'
import FilterChip from '@/components/ui/FilterChip.vue'
import SplitText from '@/components/motion/SplitText.vue'
import CtaBand from '@/features/home/CtaBand.vue'
import IconArrowUpRight from '~icons/ph/arrow-up-right'

useSeo({
  title: 'Journal & Track Dispatches — Apex Cars',
  description:
    'Engineering briefs, track records, and sustainable design insights from the Apex technical teams.',
  path: '/news',
})

const selectedCategory = ref<string>('all')

const categories = ['all', 'Engineering', 'Sustainability', 'Design']

const filteredArticles = computed<NewsArticle[]>(() => {
  if (selectedCategory.value === 'all') return NEWS_DATA
  return NEWS_DATA.filter((a) => a.category === selectedCategory.value)
})
</script>

<template>
  <div class="pt-6 pb-10 sm:pt-8">
    <div class="container-site space-y-6 sm:space-y-8">
      <!-- Page Hero -->
      <section class="max-w-3xl space-y-3">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
        >
          Journal & Announcements
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="Dispatches from the cutting edge." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          Deep-dives into powertrain silicon, aerodynamic track testing at the Ring, and circular
          factory initiatives.
        </p>

        <!-- Category Filter Chips -->
        <div class="flex flex-wrap gap-2 pt-2">
          <FilterChip
            v-for="cat in categories"
            :key="cat"
            :label="cat === 'all' ? 'All Stories' : cat"
            :active="selectedCategory === cat"
            @click="selectedCategory = cat"
          />
        </div>
      </section>

      <!-- Articles Grid -->
      <section class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
        <div v-for="article in filteredArticles" :key="article.id" class="group">
          <BaseCard
            padding="none"
            hover
            class="flex h-full flex-col justify-between overflow-hidden"
          >
            <div class="relative h-44 overflow-hidden bg-neutral-900 sm:h-48">
              <img
                :src="article.image"
                :alt="article.title"
                loading="lazy"
                decoding="async"
                class="duration-ui h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div
                class="absolute top-3 left-3 rounded-md bg-ink/80 px-2 py-0.5 label-caps text-[9px] text-on-ink backdrop-blur-md"
              >
                {{ article.category }}
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-5">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-[11px] text-muted">
                  <time :datetime="article.date">{{ formatDate(article.date) }}</time>
                  <span>•</span>
                  <span>{{ article.readTime }}</span>
                </div>
                <h2
                  class="text-base leading-snug font-semibold text-ink transition-colors group-hover:text-accent sm:text-lg"
                >
                  {{ article.title }}
                </h2>
                <p class="line-clamp-3 text-xs leading-relaxed text-muted">
                  {{ article.summary }}
                </p>
              </div>

              <div
                class="flex items-center gap-1 border-t border-line pt-3 text-[11px] font-semibold tracking-wider text-ink uppercase transition-colors group-hover:text-accent"
              >
                <span>Read Full Article</span>
                <IconArrowUpRight class="h-3.5 w-3.5" />
              </div>
            </div>
          </BaseCard>
        </div>
      </section>
    </div>

    <CtaBand />
  </div>
</template>
