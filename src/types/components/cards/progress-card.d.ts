export interface ProgressCardProps {
  /**
   * Title of the card.
   * @type {string}
   * @example "Game Development"
   * @description Title of the card. This will be displayed as the title on the card.
   */
  title: string
  /**
   * The description of the employee.
   * @type {string}
   * @example "This is a description of the progress card."
   * @description The description of progress card.
   */
  description: string
  /**
   * The range of deadline.
   * @type {string}
   * @example "9 - 12 Apr 2025"
   * @description The range of deadline. This will be displayed as badge on the card.
   */
  range: string
  /**
   * The progress of the card.
   * @type {number}
   * @example 50
   * @description The progress of the card. This will be displayed as a progress bar on the card.
   * @default 0
   */
  progress?: number
}
