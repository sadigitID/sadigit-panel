export interface ServerCardProps {
  /**
   * The name of the server.
   * @type {string}
   * @example "My Server"
   * @description The name of the server. This will be displayed as the title on the card.
   */
  name: string
  /**
   * The status of the server.
   * @type {'active' | 'down'}
   * @example "active"
   * @description The status of the server. This will be displayed as a ping on the card.
   * @default "active"
   */
  status?: 'active' | 'down'
}
