<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sectionRef = useTemplateRef<HTMLElement>('section')
const imageRef = useTemplateRef<HTMLElement>('storyImage')
const step1Ref = useTemplateRef<HTMLElement>('step1')
const step2Ref = useTemplateRef<HTMLElement>('step2')
const step3Ref = useTemplateRef<HTMLElement>('step3')

useGsap(sectionRef, ({ gsap }, el) => {
  if (!imageRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 0.8,
    },
  })

  // Scrub clip-path expansion and scale
  tl.fromTo(
    imageRef.value,
    { clipPath: 'inset(8% 8% 8% 8% round 10px)', scale: 1.12 },
    { clipPath: 'inset(0% 0% 0% 0% round 10px)', scale: 1, ease: 'none', duration: 2 },
  )

  // Crossfade step texts
  if (step1Ref.value && step2Ref.value && step3Ref.value) {
    tl.to(step1Ref.value, { opacity: 0, y: -16, duration: 0.5 }, 0.5)
      .fromTo(step2Ref.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
      .to(step2Ref.value, { opacity: 0, y: -16, duration: 0.5 }, 1.3)
      .fromTo(step3Ref.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
  }
})
</script>

<template>
  <section
    ref="section"
    class="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-ink py-10 text-on-ink sm:py-14"
    aria-label="Apex Design and Engineering Story"
  >
    <div
      class="relative z-10 container-site grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12"
    >
      <!-- Left Narrative Steps -->
      <div class="relative flex h-52 items-center sm:h-64 lg:col-span-5">
        <!-- Step 1 -->
        <div ref="step1" class="absolute inset-0 flex flex-col justify-center space-y-2.5">
          <span class="label-caps text-[10px] text-accent">Chapter 01 — Aero Philosophy</span>
          <h2 class="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Sculpted by aerodynamic necessity, not ornament.
          </h2>
          <p class="text-xs leading-relaxed text-muted sm:text-sm">
            Every contour on the GT-9 serves a cooling channel, downforce blade, or air curtain to
            achieve 0.198 Cd.
          </p>
        </div>

        <!-- Step 2 -->
        <div
          ref="step2"
          class="absolute inset-0 flex flex-col justify-center space-y-2.5 opacity-0"
        >
          <span class="label-caps text-[10px] text-accent">Chapter 02 — High Voltage</span>
          <h2 class="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            1,150 HP unleashed with zero thermal decay.
          </h2>
          <p class="text-xs leading-relaxed text-muted sm:text-sm">
            Submerged dielectric oil cooling keeps silicon-carbide switches operating at peak
            continuous load indefinitely.
          </p>
        </div>

        <!-- Step 3 -->
        <div
          ref="step3"
          class="absolute inset-0 flex flex-col justify-center space-y-2.5 opacity-0"
        >
          <span class="label-caps text-[10px] text-accent">Chapter 03 — True Circularity</span>
          <h2 class="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Closed-loop materials, zero-compromise future.
          </h2>
          <p class="text-xs leading-relaxed text-muted sm:text-sm">
            From fossil-free steel chassis beams to 94.8% recycled battery chemistry, sustainable
            velocity is now reality.
          </p>
        </div>
      </div>

      <!-- Right Scrubbed Visual -->
      <div class="relative flex h-[300px] items-center justify-center sm:h-[400px] lg:col-span-7">
        <div
          ref="storyImage"
          class="h-full w-full overflow-hidden rounded-lg bg-neutral-800 will-change-transform"
          style="clip-path: inset(8% 8% 8% 8% round 10px)"
        >
          <img
            src="@/assets/images/story-drive.jpg"
            alt="Apex GT-9 electric car navigating mountain curves at twilight"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover select-none"
          />
        </div>
      </div>
    </div>
  </section>
</template>
