import { ProjectBoardResponse } from '@/types/services/project-board-service'

export interface ProjectBoardProps {
  /**
   * The title of the project board.
   * @type {string}
   * @example "Project Board"
   * @description The title of the project board. This will be displayed as the main heading.
   */
  title: string
  /**
   * The title of the project board when it is empty.
   * @type {string}
   * @example "No Projects Available"
   * @description The title of the project board when it is empty. This will be displayed as the main heading.
   */
  emptyStateTitle: string
  /**
   * The description of the project board when it is empty.
   * @type {string}
   * @example "There are no projects available at the moment."
   * @description The description of the project board when it is empty. This will provide additional context or instructions.
   */
  emptyStateDescription: string
  /**
   * The data to display inside the project board.
   * @type {ProjectBoardResponse[]}
   * @example [{ title: "Project 1", description: "This is the description of project 1.", status: "active", tasks: [{ id: 1, name: "Task 1", completed: false }] }]
   * @description The data to display inside the project board. This will be displayed as a list of project boards.
   */
  data: ProjectBoardResponse[]
  /**
   * The variant of the badge.
   * @type {'default' | 'success' | 'warning' | 'danger'}
   * @example "success"
   * @description The variant of the badge. This will be used to style the badge.
   * @default 'default'
   */
  variant?: 'default' | 'success' | 'warning' | 'danger'
}
