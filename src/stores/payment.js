import { defineStore } from 'pinia'
import api from '@/lib/api'
import { useRouter } from 'vue-router'

export const usePaymentStore = defineStore('payment', () => {
  const router = useRouter()

  const payConsultation = async (id) => {
    try {
      const res = await api.post('/api/payment/consulting', { id }, { withCredentials: true })

      const snapToken = res.data.token

      if (!window.snap) {
        const script = document.createElement('script')
        script.src = script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute('data-client-key', import.meta.env.VITE_CLIENT_KEY)

        script.onload = () => {
          launchSnap(snapToken, id)
        }

        document.body.appendChild(script)
      } else {
        launchSnap(snapToken, id)
      }
    } catch (err) {
      console.error('Gagal memulai pembayaran:', err)
    }
  }

  const launchSnap = (snapToken, id) => {
    window.snap.pay(snapToken, {
      onSuccess: async (result) => {
        console.log('Pembayaran sukses', result)
        router.push(`/chat/${id}`)
      },
      onPending: (result) => {
        console.log('Pembayaran pending', result)
      },
      onError: (result) => {
        console.error('Pembayaran gagal', result)
      },
      onClose: () => {
        console.log('Popup ditutup sebelum pembayaran')
      },
    })
  }

  return {
    payConsultation,
  }
})
