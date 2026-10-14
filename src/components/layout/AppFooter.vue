<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SITE } from '@/data/site'
import { NAV_ITEMS } from '@/data/navigation'
import BasePill from '@/components/ui/BasePill.vue'
import IconButton from '@/components/ui/IconButton.vue'
import IconArrowUp from '~icons/ph/arrow-up'
import IconCheck from '~icons/ph/check'

const email = ref('')
const subscribed = ref(false)

function handleSubscribe() {
  if (!email.value || !email.value.includes('@')) return
  subscribed.value = true
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="mt-24 border-t border-line bg-surface pt-20 pb-12 text-ink">
    <div class="container-site space-y-16">
      <!-- Top Row: Newsletter + Columns -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <!-- Newsletter column -->
        <div class="space-y-6 lg:col-span-5">
          <div class="inline-block rounded-full bg-ink px-3 py-1 label-caps text-accent">
            Dispatches
          </div>
          <h2 class="text-3xl font-semibold tracking-tight">Stay ahead of the curve.</h2>
          <p class="max-w-sm text-sm text-muted">
            Receive engineering briefings, vehicle launch dates, and track telemetry insights
            directly.
          </p>

          <form
            v-if="!subscribed"
            class="flex max-w-md items-center gap-2"
            @submit.prevent="handleSubscribe"
          >
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email for newsletter subscription"
              class="h-11 w-full rounded-full border border-line bg-bg px-5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
            />
            <BasePill type="submit" variant="solid" size="md">Join</BasePill>
          </form>

          <div
            v-else
            class="flex items-center gap-2 rounded-2xl bg-accent/20 p-3 text-sm font-medium text-ink"
          >
            <IconCheck class="h-4 w-4 text-ink" />
            <span>Thank you for subscribing to Apex Dispatches.</span>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <div class="mb-4 label-caps text-muted">Navigation</div>
            <ul class="m-0 list-none space-y-3 p-0 text-sm">
              <li v-for="item in NAV_ITEMS" :key="item.to">
                <RouterLink :to="item.to" class="link-draw text-ink hover:text-accent">
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <div class="mb-4 label-caps text-muted">Engineering</div>
            <ul class="m-0 list-none space-y-3 p-0 text-sm text-ink">
              <li><span class="cursor-pointer hover:text-accent">Apex 900V SiC</span></li>
              <li><span class="cursor-pointer hover:text-accent">Active Downforce</span></li>
              <li><span class="cursor-pointer hover:text-accent">Track Telemetry OS</span></li>
              <li><span class="cursor-pointer hover:text-accent">Carbon Skateboard</span></li>
            </ul>
          </div>

          <div>
            <div class="mb-4 label-caps text-muted">Connect</div>
            <ul class="m-0 list-none space-y-3 p-0 text-sm">
              <li>
                <a
                  :href="SITE.social.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-draw text-ink hover:text-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  :href="SITE.social.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-draw text-ink hover:text-accent"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  :href="SITE.social.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-draw text-ink hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <RouterLink to="/kit" class="link-draw text-xs text-muted hover:text-ink">
                  Design Kit (/kit)
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Oversized Wordmark -->
      <div class="flex flex-col items-center overflow-hidden border-t border-line pt-8 select-none">
        <span
          class="pointer-events-none font-sans text-[18vw] leading-none font-black tracking-[-0.06em] text-black/5 uppercase select-none dark:text-white/5"
        >
          APEX
        </span>
      </div>

      <!-- Bottom Bar -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row"
      >
        <div>
          © {{ new Date().getFullYear() }} {{ SITE.name }}. All rights reserved. {{ SITE.address }}
        </div>
        <div class="flex items-center gap-6">
          <RouterLink to="/contact" class="hover:text-ink">Legal Notice</RouterLink>
          <RouterLink to="/contact" class="hover:text-ink">Privacy Policy</RouterLink>
          <IconButton aria-label="Scroll back to top of page" size="sm" @click="scrollToTop">
            <IconArrowUp class="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  </footer>
</template>
