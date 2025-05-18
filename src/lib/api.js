import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: import.meta.env.VITE_URL_BASE,
  },
})

api.interceptors.request.use((config) => {
  config.headers.Referer = import.meta.env.VITE_URL_BASE
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.clearAuth()
    }
    return Promise.reject(error)
  },
)

export default api
