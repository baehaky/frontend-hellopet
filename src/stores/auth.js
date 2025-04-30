import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async register(payload) {
      this.loading = true
      this.error = null
      try {
        await api.post('/api/auth/register', payload)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal dalam mendaftar'
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(payload) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/api/auth/login', payload)

        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: this.user,
            token: this.token,
          }),
        )

        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Gagal dalam masuk'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      this.error = null
      try {
        await api.post('/api/auth/logout')
      } catch (error) {
        if (error.response && error.response.status !== 401) {
          this.error = error.response?.data?.message || 'Gagal logout'
          throw error
        }
      } finally {
        this.clearAuth()
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth')
    },

    initialize() {
      const authData = localStorage.getItem('auth')
      if (authData) {
        const { user, token } = JSON.parse(authData)
        this.user = user
        this.token = token
      }
    },
  },
})
