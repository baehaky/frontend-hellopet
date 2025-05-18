import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import api from '@/lib/api'
import { useAuthStore } from './auth'
import sound from '@/assets/sounds/notification.mp3'

export const useChatStore = defineStore('chat', {
  state: () => ({
    conversationId: null,
    socket: null,
    onlineUsers: [],
    messages: [],
    selectedUser: null,
    isConnected: false,
    typing: false,
    typingUsers: {},
    unreadMessages: {},
  }),

  getters: {
    sortedMessages: (state) => {
      return [...state.messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    },

    hasUnreadMessages: (state) => (userId) => {
      return state.unreadMessages[userId] > 0
    },
  },

  actions: {
    initSocket(userId) {
      // Close existing connection if it exists
      if (this.socket) {
        this.socket.disconnect()
      }

      const apiUrl = 'http://localhost:5000'

      this.socket = io(apiUrl, {
        query: { userId },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      // Setup event listeners
      this.setupSocketListeners()
    },

    setupSocketListeners() {
      // Connection events
      this.socket.on('connect', () => {
        this.isConnected = true
        console.log('Connected to chat server')
      })

      this.socket.on('disconnect', () => {
        this.isConnected = false
        console.log('Disconnected from chat server')
      })

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
        this.isConnected = false
      })

      // Chat-related events
      this.socket.on('getOnlineUsers', (users) => {
        this.onlineUsers = users
        console.log('Online users updated:', users)
      })

      this.socket.on('newMessage', (message) => {
        console.log('Received new message via socket:', message)

        // Check if this message is already in our list to avoid duplicates
        const messageExists = this.messages.some((msg) => msg.id === message.id)

        if (!messageExists) {
          this.messages.push(message)
          console.log('Added new message to state:', message)

          // If the message is from someone other than the current user
          const authStore = useAuthStore()
          if (message.senderId !== authStore.user.id) {
            // Increment unread message counter for this sender
            if (!this.unreadMessages[message.senderId]) {
              this.unreadMessages[message.senderId] = 0
            }
            this.unreadMessages[message.senderId]++

            // Play sound notification
            this.playNotificationSound()
          }
        } else {
          console.log('Message already exists in state, skipping')
        }
      })

      // User typing indication
      this.socket.on('userTyping', ({ userId, isTyping }) => {
        console.log('User typing update:', userId, isTyping)
        this.typingUsers = {
          ...this.typingUsers,
          [userId]: isTyping,
        }

        // Auto-remove typing indicator after a delay
        if (isTyping) {
          setTimeout(() => {
            this.typingUsers = {
              ...this.typingUsers,
              [userId]: false,
            }
          }, 3000)
        }
      })

      // Message read status update
      this.socket.on('messagesRead', ({ userId }) => {
        console.log('Messages read by:', userId)
        // Update message status here if you want to show read receipts
      })
    },

    selectUser(user) {
      const authStore = useAuthStore()
      this.selectedUser = user

      // Reset unread counter for this user
      this.unreadMessages[user.id] = 0

      // Fetch message history
      this.fetchMessages(authStore.user.id, user.id)
    },

    async fetchMessages(senderId, receiverId) {
      try {
        const res = await api.get(`/api/messages`, {
          params: {
            senderId,
            receiverId,
          },
        })
        this.messages = res.data
      } catch (error) {
        console.error('Error fetching messages:', error)
        throw new Error('Failed to load messages')
      }
    },

    async sendMessage(text) {
      const authStore = useAuthStore()
      if (!this.selectedUser) {
        throw new Error('Please select a user before sending messages.')
      }

      if (!text.trim()) {
        return
      }

      const senderId = authStore.user.id
      const receiverId = this.selectedUser.id

      try {
        // Optimistic UI update - add message to local state immediately
        const tempId = `temp-${Date.now()}`
        const tempMessage = {
          id: tempId,
          senderId,
          receiverId,
          message: text,
          createdAt: new Date().toISOString(),
          status: 'sending',
        }

        this.messages.push(tempMessage)

        this.sendTypingStatus(false)

        const res = await api.post(`/api/messages/client/send/${receiverId}`, {
          senderId,
          receiverId,
          message: text,
        })

        this.conversationId = res.data.conversationId
        this.messages = this.messages.filter((msg) => msg.id !== tempId)

        const realMessage = {
          ...res.data,
          status: 'sent',
        }

        this.messages.push(realMessage)

        if (this.socket && this.isConnected) {
          this.socket.emit('sendMessage', realMessage)
        } else {
          console.warn('Socket not connected, could not emit message')
        }

        return res.data
      } catch (error) {
        const failedMessage = this.messages.find((msg) => msg.id === `temp-${Date.now()}`)
        if (failedMessage) {
          failedMessage.status = 'failed'
        }

        console.error('Error sending message:', error)
        throw new Error('Failed to send message')
      }
    },

    async resendMessage(messageId) {
      const failedMessage = this.messages.find(
        (msg) => msg.id === messageId && msg.status === 'failed',
      )
      if (failedMessage) {
        this.messages = this.messages.filter((msg) => msg.id !== messageId)
        return this.sendMessage(failedMessage.message)
      }
    },

    sendTypingStatus(isTyping) {
      const authStore = useAuthStore()
      if (this.socket && this.isConnected && this.selectedUser) {
        this.socket.emit('typing', {
          senderId: authStore.user.id,
          receiverId: this.selectedUser.id,
          isTyping,
        })
      }
    },

    playNotificationSound() {
      const audio = new Audio(sound)
      audio.play().catch((err) => console.error('Failed to play notification sound:', err))
    },

    cleanup() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
      this.isConnected = false
    },
  },
})
