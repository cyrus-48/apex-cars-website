<script setup lang="ts">
import BasePill from '@/components/ui/BasePill.vue'
import MagneticWrapper from '@/components/motion/MagneticWrapper.vue'
import IconArrowRight from '~icons/ph/arrow-right'
</script>

<template>
  <section class="py-8 cv-auto sm:py-12" aria-labelledby="cta-heading">
    <div class="container-site">
      <div
        class="relative flex flex-col items-center space-y-4 overflow-hidden rounded-card bg-ink p-6 text-center text-on-ink shadow-lift sm:p-8 lg:p-10"
      >
        <!-- Background subtle glow -->
        <div
          class="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />

        <div class="relative z-10 max-w-2xl space-y-2.5">
          <span
            class="inline-block rounded-md bg-white/10 px-2.5 py-0.5 label-caps text-[10px] text-accent"
          >
            Order & Allocation
          </span>

          <h2 id="cta-heading" class="text-h2 leading-tight font-semibold tracking-tight">
            Ready to experience the apex of electric velocity?
          </h2>

          <p class="mx-auto max-w-lg text-body text-xs text-muted sm:text-sm">
            Private test drives and custom commission allocations are now open for the Apex GT-9 and
            R-Spec programs.
          </p>
        </div>

        <!-- Magnetic Oversized CTA Button -->
        <div class="relative z-10 pt-2">
          <MagneticWrapper :strength="0.45">
            <BasePill to="/contact" variant="accent" size="lg" class="px-6 py-2.5 shadow-lift">
              <span>Reserve Your Allocation</span>
              <IconArrowRight class="h-4 w-4" />
            </BasePill>
          </MagneticWrapper>
        </div>
      </div>
    </div>
  </section>
</template>
