import api from '@/lib/api'
import { defineStore } from 'pinia'

export const useConversationsStore = defineStore('conversation', {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    async endConversation(payload) {
      console.log(payload.id)
      this.loading = true
      this.error = null
      try {
        await api.patch(`/api/messages/client/end/${payload.id}`)
        return true
      } catch (error) {
        this.error = error.response?.message || 'Gagal dalam mendaftar'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
