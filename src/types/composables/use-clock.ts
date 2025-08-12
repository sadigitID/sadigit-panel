import type { Ref } from 'vue'

export interface UseClockParams {
  /**
   * The interval at which the clock should update.
   * @type {number}
   * @example 1
   * @description The interval at which the clock should update, in seconds or minutes.
   */
  interval: number
  /**
   * The unit of the interval.
   * @type {'seconds' | 'minutes'}
   * @example "seconds"
   * @description The unit of the interval. This can be either seconds or minutes.
   */
  unit: 'seconds' | 'minutes'
}

export interface UseClockReturn {
  /**
   * The current time.
   * @type {Ref<Date>}
   * @description The current time, updated at the specified interval.
   */
  now: Ref<Date>
}
