export function camelToSnake(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}
