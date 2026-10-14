<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/app/stores/ui'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import NavPills from '@/components/layout/NavPills.vue'
import IconButton from '@/components/ui/IconButton.vue'
import IconMagnifyingGlass from '~icons/ph/magnifying-glass'
import IconList from '~icons/ph/list'
import IconSun from '~icons/ph/sun'
import IconMoon from '~icons/ph/moon'

const ui = useUiStore()
</script>

<template>
  <header
    class="site-header duration-ui sticky inset-x-0 top-0 z-40 flex h-13 items-center border-b border-line/60 bg-bg/85 backdrop-blur-md transition-colors sm:h-15"
  >
    <div class="container-site flex w-full items-center justify-between gap-4">
      <!-- Logo Left -->
      <RouterLink
        to="/"
        class="shrink-0 rounded-md transition-opacity hover:opacity-80 focus:outline-none"
        aria-label="Apex Cars Home"
      >
        <BrandLogo />
      </RouterLink>

      <!-- Center Pill Nav (Desktop) -->
      <div class="hidden lg:block">
        <NavPills />
      </div>

      <!-- Right Action Group -->
      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <!-- Theme toggle -->
        <IconButton
          :aria-label="ui.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          size="sm"
          magnetic
          @click="ui.toggleTheme"
        >
          <IconSun v-if="ui.theme === 'dark'" class="h-4 w-4 text-accent" />
          <IconMoon v-else class="h-4 w-4 text-ink" />
        </IconButton>

        <!-- Search button -->
        <IconButton
          aria-label="Open search dialog"
          size="sm"
          magnetic
          @click="ui.searchOpen = true"
        >
          <IconMagnifyingGlass class="h-4 w-4" />
        </IconButton>

        <!-- Mobile menu button -->
        <IconButton
          class="lg:hidden"
          aria-label="Open mobile navigation menu"
          variant="solid"
          size="sm"
          magnetic
          @click="ui.menuOpen = true"
        >
          <IconList class="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  </header>
</template>
