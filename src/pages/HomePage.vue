<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import { SITE } from '@/data/site'
import HeroSection from '@/features/home/HeroSection.vue'
import ImpactStrip from '@/features/home/ImpactStrip.vue'
import ProgramsGrid from '@/features/home/ProgramsGrid.vue'
import StoryBand from '@/features/home/StoryBand.vue'
import NewsPreview from '@/features/home/NewsPreview.vue'
import PartnersMarquee from '@/features/home/PartnersMarquee.vue'
import CtaBand from '@/features/home/CtaBand.vue'

useSeo({
  title: SITE.name,
  description: `${SITE.tagline} ${SITE.mission}`,
  path: '/',
})
</script>

<template>
  <div>
    <HeroSection />
    <ImpactStrip />
    <ProgramsGrid />
    <StoryBand />
    <NewsPreview />
    <PartnersMarquee />
    <CtaBand />
  </div>
</template>
