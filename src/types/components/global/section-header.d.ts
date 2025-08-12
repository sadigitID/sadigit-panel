import { Component } from 'vue'

export interface SectionHeaderProps {
  /**
   * The title of the section header.
   * @type {string}
   * @example "Section Title"
   * @description The title of the section header. This will be displayed as the main heading.
   */
  title: string
  /**
   * The subtitle of the section header.
   * @type {string}
   * @example "This is the subtitle"
   * @description The subtitle of the section header. This will provide additional context or instructions.
   */
  subtitle: string
  /**
   * The icon to display in the section header, as a Vue component.
   * @type {Component}
   * @example <template><icon-name /></template>
   * @description The icon to display in the section header. This will be displayed as a visual representation of the section.
   */
  icon: Component
}
