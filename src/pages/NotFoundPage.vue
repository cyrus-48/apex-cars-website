<script setup lang="ts">
import { useSeo } from '@/lib/seo'
import BasePill from '@/components/ui/BasePill.vue'
import IconArrowLeft from '~icons/ph/arrow-left'

useSeo({
  title: '404 — Off the Racing Line',
  description: 'The requested route does not exist within the Apex telemetry system.',
  noindex: true,
})
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center pt-32 pb-20">
    <div class="container-site max-w-xl space-y-6 text-center">
      <span class="inline-block rounded-full bg-ink px-3 py-1 label-caps text-accent">
        Error 404
      </span>
      <h1 class="text-display leading-none font-semibold tracking-tight text-ink">Off Course.</h1>
      <p class="text-body text-muted">
        The coordinates you requested are outside the mapped circuit perimeter.
      </p>
      <div class="pt-4">
        <BasePill to="/" variant="solid" size="lg">
          <IconArrowLeft class="h-4 w-4" />
          <span>Return to Paddock</span>
        </BasePill>
      </div>
    </div>
  </div>
</template>
