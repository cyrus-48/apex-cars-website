<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { NEWS_DATA } from '@/data/news'
import { formatDate } from '@/lib/format'
import BaseCard from '@/components/ui/BaseCard.vue'
import BasePill from '@/components/ui/BasePill.vue'
import IconButton from '@/components/ui/IconButton.vue'
import IconArrowUpRight from '~icons/ph/arrow-up-right'

const articles = NEWS_DATA.slice(0, 3)
</script>

<template>
  <section class="py-8 cv-auto sm:py-10" aria-labelledby="news-heading">
    <div class="container-site space-y-6">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div class="space-y-1.5">
          <span
            class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
          >
            Journal & Track Logs
          </span>
          <h2 id="news-heading" class="text-h2 font-semibold tracking-tight text-ink">
            Latest Dispatches
          </h2>
        </div>

        <BasePill to="/news" variant="outline" size="sm">
          <span>View All Dispatches</span>
          <IconArrowUpRight class="h-3 w-3" />
        </BasePill>
      </div>

      <!-- 3 Cards Grid -->
      <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
        <RouterLink v-for="article in articles" :key="article.id" to="/news" class="group block">
          <BaseCard
            padding="none"
            hover
            class="flex h-full flex-col justify-between overflow-hidden"
          >
            <!-- Image with Zoom and Arrow-Circle Reveal -->
            <div class="relative h-40 overflow-hidden bg-neutral-900 sm:h-44">
              <img
                :src="article.image"
                :alt="article.title"
                loading="lazy"
                decoding="async"
                class="duration-ui h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
              />

              <!-- Floating Arrow Circle Reveal on Hover -->
              <div
                class="duration-micro absolute right-3 bottom-3 translate-y-1 opacity-0 transition-all ease-out group-hover:translate-y-0 group-hover:opacity-100"
              >
                <IconButton aria-label="Read article" variant="solid" size="sm">
                  <IconArrowUpRight class="h-3.5 w-3.5" />
                </IconButton>
              </div>

              <div
                class="absolute top-3 left-3 rounded-md bg-ink/80 px-2 py-0.5 label-caps text-[9px] text-on-ink backdrop-blur-md"
              >
                {{ article.category }}
              </div>
            </div>

            <!-- Content Area -->
            <div class="flex flex-1 flex-col justify-between space-y-3 p-4 sm:p-5">
              <div class="space-y-1.5">
                <div class="flex items-center gap-1.5 text-[11px] text-muted">
                  <time :datetime="article.date">{{ formatDate(article.date) }}</time>
                  <span>•</span>
                  <span>{{ article.readTime }}</span>
                </div>

                <h3
                  class="text-base leading-snug font-semibold text-ink transition-colors group-hover:text-accent sm:text-lg"
                >
                  {{ article.title }}
                </h3>

                <p class="line-clamp-2 text-xs leading-relaxed text-muted">
                  {{ article.summary }}
                </p>
              </div>

              <div
                class="flex items-center gap-1 border-t border-line pt-3 text-[11px] font-semibold tracking-wider text-ink uppercase transition-colors group-hover:text-accent"
              >
                <span>Read Story</span>
                <IconArrowUpRight class="h-3 w-3" />
              </div>
            </div>
          </BaseCard>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
