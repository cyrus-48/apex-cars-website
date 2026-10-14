import { useRouter } from 'vue-router'
import { whenIdle } from '@/lib/gsap'

type Loader = () => Promise<unknown>
const warmed = new Set<string>()

/** Prefetch route chunks on hover/focus, and all nav routes once the browser is idle. */
export function usePrefetch() {
  const router = useRouter()

  function prefetch(path: string) {
    if (warmed.has(path) || typeof window === 'undefined') return
    const record = router.resolve(path).matched[0]
    const component = record?.components?.default
    if (typeof component === 'function') {
      warmed.add(path)
      void (component as Loader)().catch(() => warmed.delete(path))
    }
  }

  function prefetchAllWhenIdle(paths: readonly string[]) {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    whenIdle(() => paths.forEach(prefetch), 4000)
  }

  return { prefetch, prefetchAllWhenIdle }
}
