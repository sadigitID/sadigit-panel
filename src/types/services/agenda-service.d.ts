import type { ParticipantType } from '@/types/components/cards/agenda-card'

// Untuk satu item agenda
export interface AgendaItem {
  title: string
  description: string
  date: string // YYYY-MM-DD
  time: {
    start: string // HH:mm
    end: string // HH:mm
  }
  jumlah_peserta: number
  participant: {
    type: ParticipantType
    list: string[]
  }
}

// Untuk seluruh response dari endpoint /agenda-list
export interface AgendaListResponse {
  status: boolean
  message: string
  data: AgendaItem[]
}
