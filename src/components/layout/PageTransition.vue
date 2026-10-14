<script setup lang="ts">
import { transitionState } from '@/lib/view-transition'
import { resetScroll } from '@/composables/useLenis'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

function onBeforeLeave() {
  if (transitionState.native || prefersReducedMotion()) return
}

function onAfterLeave() {
  resetScroll()
}

function onEnter() {
  if (transitionState.native) return
}
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="transitionState.native || prefersReducedMotion() ? 'fade' : 'page-wipe'"
      mode="out-in"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
      @enter="onEnter"
    >
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<style scoped>
.page-wipe-enter-active,
.page-wipe-leave-active {
  transition:
    opacity var(--dur-page) var(--ease-out),
    transform var(--dur-page) var(--ease-out);
}

.page-wipe-enter-from {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}

.page-wipe-leave-to {
  opacity: 0;
  transform: translate3d(0, -20px, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
