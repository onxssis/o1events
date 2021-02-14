import format from 'date-fns/format'

export function deleteObjectProps(obj: Record<string, any>, prop: string[]) {
  for (const p of prop) {
    p in obj && delete obj[p]
  }
}

export function formatDate(
  date: string,
  formatString: string = 'eee, MMM dd, ppp'
) {
  return format(
    new Date(Date.parse(date || new Date().toISOString())),
    formatString
  )
}

export function mergeObjects(a: any, b: any) {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    return undefined
  }

  const c: any = {}
  for (const k in a) {
    if (k in b) c[k] = b[k]
  }
  return c
}
