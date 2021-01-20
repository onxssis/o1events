export function deleteObjectProps(obj: Record<string, any>, prop: string[]) {
  for (const p of prop) {
    p in obj && delete obj[p]
  }
}
