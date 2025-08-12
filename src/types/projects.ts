export interface Project {
  id: number
  title: string
  description: string
  progress: number
  range: string
}

export interface ProjectResponse {
  status: boolean
  message: string
  data: Project[]
}
