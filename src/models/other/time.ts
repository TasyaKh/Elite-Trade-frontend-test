export type Time = {
  hours: number
  minutes: number
  seconds: number
}

export const isTime = (value: unknown): value is Time => {
  if (typeof value !== 'object' || value === null) return false
  const time = value as Time
  return (
    typeof time.hours === 'number' &&
    typeof time.minutes === 'number' &&
    typeof time.seconds === 'number'
  )
}
