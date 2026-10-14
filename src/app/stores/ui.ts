import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'
const STORAGE_KEY = 'apex-theme'

/** Global UI state only: theme, overlays, cursor. Page data never lives here. */
export const useUiStore = defineStore('ui', () => {
  const theme = ref<ThemeMode>('light')
  const menuOpen = ref(false)
  const searchOpen = ref(false)
  const cursorLabel = ref('')

  function syncThemeFromDocument() {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      /* storage unavailable (private mode): theme still applies for this session */
    }
  }

  watch(theme, (value) => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', value === 'dark')
  })

  return { theme, menuOpen, searchOpen, cursorLabel, syncThemeFromDocument, toggleTheme }
})
