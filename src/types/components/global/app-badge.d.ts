import { Component } from 'vue'

export interface AppBadgeProps {
  /**
   * The text to display inside the badge.
   * @type {string}
   * @example "New"
   * @description The text to display inside the badge. This will be displayed as the content of the badge.
   */
  text?: string
  /**
   * The icon to display inside the badge, as a Vue component.
   * @type {Component}
   * @example <template><icon-name /></template>
   * @description The icon to display inside the badge. This will be displayed as the icon of the badge.
   */
  icon?: Component
  /**
   * The variant of the badge.
   * @type {'default' | 'success' | 'warning' | 'danger'}
   * @example "success"
   * @description The variant of the badge. This will be used to style the badge.
   * @default "default"
   */
  variant?: 'default' | 'success' | 'warning' | 'danger'
}
