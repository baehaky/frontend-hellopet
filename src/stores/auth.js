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

        console.log('Login success:', this.user, this.token)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal dalam masuk'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true
      try {
        await api
          .post(
            '/api/auth/logout',
            {},
            {
              withCredentials: true,
            },
          )
          .catch(() => {})

        this.user = null
        this.token = null
        localStorage.removeItem('auth')

        return true
      } finally {
        this.loading = false
      }
    },
  },
})
