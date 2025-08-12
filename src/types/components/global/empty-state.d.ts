import { Component } from 'vue'

export interface EmptyStateProps {
  /**
   * The title of the empty state.
   * @type {string}
   * @example "No Data Available"
   * @description The title of the empty state. This will be displayed as the main heading.
   */
  title: string
  /**
   * The description of the empty state.
   * @type {string}
   * @example "There is no data available at the moment."
   * @description The description of the empty state. This will provide additional context or instructions.
   */
  description: string
  /**
   * The icon to display in the empty state, this is a Vue component.
   * @type {Component}
   * @example <template><icon-name /></template>
   * @description The icon to display in the empty state. This will be displayed as a visual representation of the empty state.
   */
  icon?: Component
}
