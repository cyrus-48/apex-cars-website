#!/usr/bin/env node
// Performance budget gate: measures gzip size of the JS/CSS the home page loads up-front.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const DIST = new URL('../dist', import.meta.url).pathname
const BUDGET = { js: 150 * 1024, css: 30 * 1024 }

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found. Run `pnpm build` first.')
  process.exit(1)
}

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const pick = (re) => [...html.matchAll(re)].map((m) => m[1]).filter((u) => u.startsWith('/'))

const js = new Set([
  ...pick(/<script[^>]+type="module"[^>]+src="([^"]+)"/g),
  ...pick(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g),
])
const css = new Set(pick(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g))

const gz = (urls) =>
  [...urls].reduce((sum, url) => sum + gzipSync(readFileSync(join(DIST, url))).length, 0)

const result = { js: gz(js), css: gz(css) }
let failed = false

for (const kind of /** @type {const} */ (['js', 'css'])) {
  const kb = (result[kind] / 1024).toFixed(1)
  const max = (BUDGET[kind] / 1024).toFixed(0)
  const ok = result[kind] <= BUDGET[kind]
  failed ||= !ok
  console.log(`${ok ? 'OK  ' : 'FAIL'} initial ${kind.toUpperCase()}: ${kb} KB gzip (budget ${max} KB)`)
}

process.exit(failed ? 1 : 0)
