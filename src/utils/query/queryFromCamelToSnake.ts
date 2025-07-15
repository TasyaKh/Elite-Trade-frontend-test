import qs from 'qs'
import { camelToSnake } from './camelToSnake'

export const queryFromCamelToSnake = (obj: Record<string, unknown>): string => {
  const snakeCaseObj: Record<string, unknown> = {}

  for (const key in obj) {
    const value = obj[key]
    if (value !== undefined && value !== null) {
      snakeCaseObj[camelToSnake(key)] = value
    }
  }

  return qs.stringify(snakeCaseObj, {
    encode: false,
    skipNulls: true,
  })
}
