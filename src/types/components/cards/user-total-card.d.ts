export interface UserTotalCardProps {
  /**
   * User total card title
   * @type {string}
   * @example "Total Users"
   * @description The title of the user total card
   */
  title: string
  /**
   * Total users
   * @type {number}
   * @example 100
   * @description The total number of users
   * @default 0
   */
  total?: number
  /**
   * User total card color
   * @type {string}
   * @example "bg-primary-700"
   * @description The color of the user total card
   * @default "bg-primary-700"
   */
  color?: string
}
