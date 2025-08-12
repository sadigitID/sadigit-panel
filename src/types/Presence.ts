export interface PresenceItem {
  id: number
  name: string
  image: string
  description: string
  isOnCleaningDuty: boolean
  status: 'Present' | 'Absent'
  date: string // format: YYYY-MM-DD
}

export interface PresenceListResponse {
  status: boolean
  message: string
  data: PresenceItem[]
}
