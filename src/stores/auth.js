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
        await api.post('/api/auth/user/register', payload)
        return true
      } catch (error) {
        this.error = error.response?.message || 'Gagal dalam mendaftar'
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

        if (response.data && response.data.data) {
          this.user = response.data.data.user
          this.token = response.data.data.token

          localStorage.setItem(
            'auth',
            JSON.stringify({
              user: this.user,
              token: this.token,
            }),
          )

          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

          return true
        }
        throw new Error('Invalid response structure')
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
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

    async initialize() {
      const savedAuth = localStorage.getItem('auth')
      if (savedAuth) {
        try {
          const parsedAuth = JSON.parse(savedAuth)
          this.user = parsedAuth.user
          this.token = parsedAuth.token

          if (this.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            await api.get('/api/auth/me')
          }
        } catch (error) {
          console.warn('Auth initialization failed:', error)
          this.clearAuth()
        }
      }
    },
  },
})
