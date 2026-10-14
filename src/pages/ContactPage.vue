<script setup lang="ts">
import { ref } from 'vue'
import { useSeo } from '@/lib/seo'
import { SITE } from '@/data/site'
import BaseCard from '@/components/ui/BaseCard.vue'
import BasePill from '@/components/ui/BasePill.vue'
import SplitText from '@/components/motion/SplitText.vue'
import IconCheck from '~icons/ph/check'
import IconEnvelopeSimple from '~icons/ph/envelope-simple'
import IconPhone from '~icons/ph/phone'
import IconMapPin from '~icons/ph/map-pin'

useSeo({
  title: 'Contact & Allocation Inquiry — Apex Cars',
  description: 'Schedule a private circuit test drive or inquire about Apex GT-9 commission slots.',
  path: '/contact',
})

const form = ref({
  name: '',
  email: '',
  program: 'gt9',
  message: '',
  honeypot: '',
})

const submitted = ref(false)
const submitting = ref(false)

function handleSubmit() {
  if (form.value.honeypot) return // bot trapped
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 400)
}
</script>

<template>
  <div class="pt-6 pb-12 sm:pt-8">
    <div class="container-site space-y-8">
      <!-- Page Hero -->
      <section class="max-w-3xl space-y-3">
        <span
          class="inline-block rounded-md bg-ink px-2.5 py-0.5 label-caps text-[10px] text-accent"
        >
          Direct Inquiries
        </span>
        <h1 class="text-display leading-tight font-semibold tracking-tight text-ink">
          <SplitText text="Commission your allocation." />
        </h1>
        <p class="max-w-xl text-body text-xs leading-relaxed text-muted sm:text-sm">
          Connect with our client services and vehicle dynamics team in Gothenburg for vehicle
          allocations, circuit test sessions, or technical inquiries.
        </p>
      </section>

      <!-- Contact Form & Coordinates -->
      <div class="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
        <!-- Form Column -->
        <div class="lg:col-span-7">
          <BaseCard padding="md" class="space-y-5">
            <div v-if="!submitted">
              <h2 class="mb-1 text-xl font-semibold">Private Consultation Request</h2>
              <p class="mb-4 text-xs text-muted">
                All fields are handled strictly under non-disclosure protocols.
              </p>

              <form class="space-y-4" @submit.prevent="handleSubmit">
                <!-- Honeypot -->
                <div class="hidden" aria-hidden="true">
                  <label for="company_trap">Leave blank</label>
                  <input
                    id="company_trap"
                    v-model="form.honeypot"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>

                <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div class="space-y-1">
                    <label for="name" class="label-caps text-[10px] text-muted">Full Name *</label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Elena Vance"
                      class="h-9 w-full rounded-lg border border-line bg-bg px-3 text-xs text-ink transition-colors focus:border-ink focus:outline-none sm:h-10 sm:text-sm"
                    />
                  </div>

                  <div class="space-y-1">
                    <label for="email" class="label-caps text-[10px] text-muted"
                      >Email Address *</label
                    >
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="elena@example.com"
                      class="h-9 w-full rounded-lg border border-line bg-bg px-3 text-xs text-ink transition-colors focus:border-ink focus:outline-none sm:h-10 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="program" class="label-caps text-[10px] text-muted"
                    >Vehicle of Interest</label
                  >
                  <select
                    id="program"
                    v-model="form.program"
                    class="h-9 w-full rounded-lg border border-line bg-bg px-3 text-xs text-ink transition-colors focus:border-ink focus:outline-none sm:h-10 sm:text-sm"
                  >
                    <option value="gt9">Apex GT-9 Aerodyne (Grand Tourer)</option>
                    <option value="track-r">Apex R-Spec Prototype (Track Weapon)</option>
                    <option value="platform">900V SiC Platform Licensing</option>
                    <option value="other">General Press / Corporate</option>
                  </select>
                </div>

                <div class="space-y-1">
                  <label for="message" class="label-caps text-[10px] text-muted"
                    >Specific Requirements</label
                  >
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="3"
                    placeholder="Describe delivery territory, circuit preferences or bespoke options..."
                    class="w-full resize-none rounded-lg border border-line bg-bg p-3 text-xs text-ink transition-colors focus:border-ink focus:outline-none sm:text-sm"
                  />
                </div>

                <BasePill
                  type="submit"
                  variant="solid"
                  size="md"
                  class="w-full"
                  :disabled="submitting"
                >
                  <span>{{ submitting ? 'Transmitting Request...' : 'Submit Inquiry' }}</span>
                </BasePill>
              </form>
            </div>

            <!-- Success message -->
            <div v-else class="space-y-3 py-8 text-center">
              <div
                class="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-ink"
              >
                <IconCheck class="h-5 w-5" />
              </div>
              <h3 class="text-xl font-semibold">Inquiry Confirmed</h3>
              <p class="mx-auto max-w-sm text-xs text-muted">
                Thank you, {{ form.name }}. A client liaison from our Gothenburg facility will reach
                out within 24 hours.
              </p>
            </div>
          </BaseCard>
        </div>

        <!-- Coordinates Column -->
        <div class="space-y-4 lg:col-span-5">
          <BaseCard padding="md" class="space-y-4">
            <h3 class="text-base font-semibold">Headquarters & Studio</h3>

            <div class="space-y-2.5 text-xs text-muted">
              <div class="flex items-start gap-2.5">
                <IconMapPin class="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                <span>{{ SITE.address }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <IconEnvelopeSimple class="h-4 w-4 shrink-0 text-ink" />
                <a :href="`mailto:${SITE.email}`" class="hover:text-ink">{{ SITE.email }}</a>
              </div>
              <div class="flex items-center gap-2.5">
                <IconPhone class="h-4 w-4 shrink-0 text-ink" />
                <a :href="`tel:${SITE.phone}`" class="hover:text-ink">{{ SITE.phone }}</a>
              </div>
            </div>
          </BaseCard>

          <BaseCard variant="dark" padding="md" class="space-y-2.5">
            <div class="label-caps text-[10px] text-accent">Private Circuit Sessions</div>
            <h4 class="text-sm font-semibold text-on-ink">Gothenburg Proving Grounds</h4>
            <p class="text-[11px] leading-relaxed text-muted">
              Experience the GT-9 at speed under the guidance of our test drivers on our private 4.2
              km handling circuit.
            </p>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>
