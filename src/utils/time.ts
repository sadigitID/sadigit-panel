/**
 * Converts a Date object to a month in string format.
 *
 * @param date - The Date object to format.
 * @returns A string representing the month.
 *
 * @example
 * formatToMonthString(new Date()) // "Jan"
 */
export function formatToMonthString(date: Date): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return monthNames[date.getMonth()]
}

/**
 * Converts a Date object to a day in 'DD' format.
 *
 * @param date - The Date object to format.
 * @returns A number representing the day of the month in 'DD' format.
 *
 * @example
 * formatToDay(new Date()) // "01"
 */
export function formatToDay(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')

  return pad(date.getDate())
}

/**
 * Converts a Date object to a time string in "HH:mm:ss" format.
 *
 * @param date - The Date object to format.
 * @returns A string representing the time in "HH:mm:ss" format.
 *
 * @example
 * formatToHHMMSS(new Date()) // "HH:mm:ss"
 */
export function formatToHHMMSS(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const h = pad(date.getHours())
  const m = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  return `${h}:${m}:${s}`
}

/**
 * Converts a Date object to a time string in "HH:mm" format.
 *
 * @param date - The Date object to format.
 * @returns A string representing the time in "HH:mm" format.
 *
 * @example
 * formatToHHMM(new Date()) // "HH:mm"
 */
export function formatToHHMM(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const h = pad(date.getHours())
  const m = pad(date.getMinutes())
  return `${h}:${m}`
}

/**
 * Checks if a given Date is within a specific time range.
 *
 * The start and end times should be in "HH:mm" 24-hour format.
 *
 * @param now - The current Date object to check.
 * @param start - The start of the range in "HH:mm" format.
 * @param end - The end of the range in "HH:mm" format.
 * @returns `true` if `now` falls within the range; otherwise `false`.
 *
 * @example
 * isWithinTimeRange(new Date(), "12:00", "13:00") // true or false
 */
export function isWithinTimeRange(now: Date, start: string, end: string): boolean {
  const current = now.getHours() * 60 + now.getMinutes()
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  const startMin = startH * 60 + startM
  const endMin = endH * 60 + endM

  return current >= startMin && current <= endMin
}
