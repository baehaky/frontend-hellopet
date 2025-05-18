// Socket service - untuk memisahkan logika socket dari store
import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.connected = false
    this.listeners = new Map()
  }

  connect(userId) {
    if (this.socket) {
      return Promise.resolve(this.socket)
    }

    return new Promise((resolve, reject) => {
      const socket = io(import.meta.env.VITE_API_URL, {
        query: { userId },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
      })

      socket.on('connect', () => {
        console.log('Socket connected successfully')
        this.socket = socket
        this.connected = true
        resolve(socket)
      })

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        reject(error)
      })

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason)
        this.connected = false

        // Coba hubungkan kembali jika disconnect karena error jaringan
        if (reason === 'io server disconnect' || reason === 'transport close') {
          socket.connect()
        }
      })
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  on(event, callback) {
    if (!this.socket) {
      console.warn('Socket is not connected')
      return
    }

    // Menyimpan listener untuk dapat dihapus nanti
    this.listeners.set(event, callback)
    this.socket.on(event, callback)
  }

  off(event) {
    if (!this.socket) return

    const callback = this.listeners.get(event)
    if (callback) {
      this.socket.off(event, callback)
      this.listeners.delete(event)
    }
  }

  emit(event, data) {
    if (!this.socket) {
      console.warn('Socket is not connected')
      return
    }
    this.socket.emit(event, data)
  }

  isConnected() {
    return this.connected
  }
}

// Singleton instance
export default new SocketService()
