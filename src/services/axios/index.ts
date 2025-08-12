import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {

  }
})

export const prayerAPI = axios.create({
  baseURL: import.meta.env.VITE_PRAYER_API_URL,
  timeout: 60000
})

export const getData = async (id:string) => {
  return await axiosInstance.get(id)
}

