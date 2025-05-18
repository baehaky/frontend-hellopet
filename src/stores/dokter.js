import { defineStore } from 'pinia'
import api from '@/lib/api'

export const useDokterStore = defineStore('dokter', {
  state: () => ({
    users: [],
    error: null,
    loading: false,

    monthlyData: {
      labels: [],
      data: [],
    },

    profitData: {
      year: new Date().getFullYear(),
      items: [], // array of { month, profit }
    },
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await api.get('/api/roles/dokter')
        this.users = response.data
      } catch (error) {
        console.error('Gagal memuat users:', error)
        throw error
      }
    },

    async fetchMonthlyConversations(doctorId) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`/api/statistic/conversations/monthly/${doctorId}`)
        this.monthlyData.labels = res.data.labels
        this.monthlyData.data = res.data.data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchMonthlyProfit(doctorId) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/api/statistic/profit/monthly/${doctorId}`)
        if (response.data.success) {
          this.profitData.items = response.data.data
          this.profitData.year = response.data.year
          return { success: true }
        } else {
          return { success: false, message: 'Gagal memuat data profit' }
        }
      } catch (error) {
        console.error('Gagal memuat data profit:', error)
        return {
          success: false,
          message: error.response?.data?.message || 'Gagal terhubung ke server',
        }
      } finally {
        this.loading = false
      }
    },
  },
})
