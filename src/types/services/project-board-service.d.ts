export type BadgeTypes = 'Urgent' | 'Maintenance' | 'Error'

export type ProjectType = 'Backlogs' | 'Progress' | 'Revision' | 'Done'

export interface ProjectBoardResponse {
  title: string
  description: string
  due_date: string
  comments: number
  PICs: string[]
  badges: BadgeTypes[]
  type: ProjectType
}
