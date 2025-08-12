export interface DateItemProps {
  /**
   * The number to display inside the item.
   * @type {number}
   * @example 1
   * @description The number to display inside the item. This will be displayed as the main content of the item.
   */
  dateNumber: number
  /**
   * The date text to display inside the item.
   * @type {string}
   * @example "SEN"
   * @description The date text to display inside the item. This will be displayed as the secondary content of the item.
   */
  dateText: string
  /**
   * The variant of the item.
   * @type {'default' | 'active'}
   * @example "active"
   * @description The variant of the item. This will be used to style the item.
   * @default 'default'
   */
  variant?: 'default' | 'active'
}
