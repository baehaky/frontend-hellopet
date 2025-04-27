import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async register(payload) {
      ;(this.loading = true), (this.error = null)
      try {
        await api.post('api/auth/register', payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal dalam mendaftar'
      } finally {
        this.loading = false
      }
    },
    async login(payload) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('api/auth/login', payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })

        this.user = response.data.user
        this.token = response.data.token
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal dalam masuk'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true
      this.error = null
      try {
        await api.post('/api/auth/logout', {}, { withCredentials: true })
      } catch (error) {
        if (error.response && error.response.status !== 401) {
          this.error = error.response?.data?.message || 'Gagal logout'
          throw error
        }
      } finally {
        this.user = null
        this.token = null
        localStorage.removeItem('auth')
        this.loading = false
      }
    },
  },
})
