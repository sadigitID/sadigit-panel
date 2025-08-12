import type { UseClockParams, UseClockReturn } from '@/types/composables/use-clock'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * A composable that provides a reactive `Date` object representing the current time.
 *
 * Internally, this composable updates the time based on the specified interval and unit
 * and cleans up the interval when the component is unmounted.
 *
 * @param params - The parameters to configure the interval duration and unit.
 * @returns An object containing a single `Ref<Date>` named `now` that updates based on the interval.
 *
 * @example
 * const { now } = useClock({ interval: 1, unit: 'seconds' })
 * console.log(now.value.toLocaleTimeString())
 */
export function useClock(params: UseClockParams): UseClockReturn {
  const now = ref(new Date())

  let interval: ReturnType<typeof setInterval>

  const intervalMs =
    params.unit === 'seconds' ? params.interval * 1000 : params.interval * 60 * 1000

  onMounted(() => {
    interval = setInterval(() => {
      now.value = new Date()
    }, intervalMs)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return {
    now
  }
}
