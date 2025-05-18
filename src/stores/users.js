import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await api.get('/api/roles/users')
        this.users = response.data
      } catch (error) {
        console.error('Gagal memuat users:', error)
        throw error
      }
    },
  },
})
