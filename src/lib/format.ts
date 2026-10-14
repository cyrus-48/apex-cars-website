const formatters = new Map<number, Intl.NumberFormat>()

/** Locale-aware number formatting with fixed decimals (cached formatters). */
export function formatNumber(value: number, decimals = 0): string {
  let formatter = formatters.get(decimals)
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    formatters.set(decimals, formatter)
  }
  return formatter.format(value)
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

/** ISO date (YYYY-MM-DD) to "12 Sept 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T12:00:00Z`))
}
