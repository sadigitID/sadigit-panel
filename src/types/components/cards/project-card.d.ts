import type { BadgeTypes } from '@/types/services/project-board-service'

export interface PICsFormattedModel {
  /**
   * Person in charge (PIC) image
   * @type {string[]}
   * @example ["image1.png", "image2.png"]
   * @description The list of person in charge (PIC) images
   */
  PICs: string[]
  /**
   * Person in charge (PIC) count
   * @type {number}
   * @example 2
   * @description The number of person in charge (PIC)
   */
  count: number
}

export interface ProjectCardProps {
  /**
   * Project card title
   * @type {string}
   * @example "Project 1"
   * @description The title of the project card
   */
  title: string
  /**
   * Project card description
   * @type {string}
   * @example "This is the description of project 1."
   * @description The description of the project card
   */
  description: string
  /**
   * Project card due date
   * @type {string}
   * @example "2023-10-01"
   * @description The due date of the project card
   */
  dueDate: string
  /**
   * Project card person in charge (PIC)
   * @type {string[]}
   * @example ["image1.png", "image2.png"]
   * @description The list of person in charge (PIC) of the project card
   */
  pics: string[]
  /**
   * Project card comments
   * @type {number}
   * @example 10
   * @description The number of comments on the project card
   */
  comments: number
  /**
   * Project card badges
   * @type {string[]}
   * @example ["badge1", "badge2"]
   * @description The list of badges on the project card
   */
  badges: BadgeTypes[]
}
