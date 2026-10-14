#!/usr/bin/env node
// Fails when any file under src/ exceeds the max line count (spec rule 5).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const MAX = 250
const ROOT = new URL('../src', import.meta.url).pathname
const EXT = /\.(vue|ts|css|mjs|js)$/

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : EXT.test(name) ? [full] : []
  })
}

const rows = walk(ROOT)
  .map((file) => ({ file: relative(process.cwd(), file), lines: readFileSync(file, 'utf8').split('\n').length }))
  .sort((a, b) => b.lines - a.lines)

const offenders = rows.filter((r) => r.lines > MAX)
const largest = rows[0]

if (largest) console.log(`Largest file: ${largest.file} (${largest.lines} lines), ${rows.length} files checked`)

if (offenders.length) {
  console.error(`\n${offenders.length} file(s) exceed ${MAX} lines:`)
  for (const o of offenders) console.error(`  ${o.lines}\t${o.file}`)
  process.exit(1)
}
