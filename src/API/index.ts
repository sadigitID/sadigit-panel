import axios from 'axios'
import type { OffersOrContractResponse } from '@/types/offerOrContract'
import type { ProjectResponse } from '@/types/projects'
import type { ProjectBoardResponse } from '@/types/services/project-board-service'
import type { ServerResponse } from '@/types/services/server-service'
import type { AgendaListResponse } from '@/types/services/agenda-service'
import type { PresenceListResponse } from '@/types/Presence'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use(config => {
  if (config.url?.includes('/auth')) return config

  const token = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const loginUser = async (username: string, password: string) => {
  const response = await instance.post('/auth', { username, password })

  const { token, uuid, data, expiredAt } = response.data

  Cookies.set('token', token, {
    expires: new Date(expiredAt),
    secure: true,
    sameSite: 'Strict'
  })

  Cookies.set('uuid', uuid)
  Cookies.set('user', JSON.stringify(data))

  return response.data
}

// API lainnya
export const fetchOurApp = async () => {
  const response = await instance.get('/ourapp')
  return response.data
}

export const fetchOffersOrContact = async (
  type: 'offer' | 'contract' | 'all' = 'all'
) => {
  const response = await instance.get<OffersOrContractResponse>('/offerorcontact', {
    params: { type }
  })

  const cleanedData = {
    ...response.data,
    data: {
      head: response.data.data.head.filter((_, i) => i !== response.data.data.head.length - 1),
      body: response.data.data.body.map(row => row.slice(0, -1))
    }
  }

  return cleanedData
}

export const fetchProjects = async () => {
  const response = await instance.get<ProjectResponse>('/monitoring-project/progress')
  return response.data
}

export const fetchProjectBoards = async (): Promise<ProjectBoardResponse[]> => {
  const response = await instance.get<ProjectBoardResponse[]>('/api/projectboards')
  return response.data
}

export const fetchServer = async (): Promise<{
  status: boolean
  message: string
  data: ServerResponse[]
}> => {
  const response = await instance.get('/server')
  return response.data
}

export const fetchAgendaList = async (): Promise<AgendaListResponse> => {
  const response = await instance.get('/agenda-list')
  return response.data
}

export const fetchPresenceList = async (): Promise<PresenceListResponse> => {
  const response = await instance.get('/presence')
  return response.data
}

export const fetchMonitoringProject = async (): Promise<{
  status: boolean
  message: string
  data: ProjectBoardResponse[]
}> => {
  const response = await instance.get('/monitoring-project')
  return response.data
}

