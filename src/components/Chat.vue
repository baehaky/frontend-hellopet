<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { useDokterStore } from '@/stores/dokter'
import { useUserStore } from '@/stores/users'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { useTimerStore } from '@/stores/timer'
import { useConversationsStore } from '@/stores/conversation'
import Swal from 'sweetalert2'

const timerStore = useTimerStore()

const props = defineProps({
  selectedUser: {
    type: Object,
    default: null,
  },
})

const chatStore = useChatStore()
const authStore = useAuthStore()
const conversationStore = useConversationsStore()
const dokterStore = authStore.user.roles === 'dokter' ? useUserStore() : useDokterStore()
const router = useRouter()
const route = useRoute()
const message = ref('')
const chatContainer = ref(null)
const isTyping = ref(false)
const typingTimer = ref(null)
const currentUser = ref(null)

const sortedMessages = computed(() => chatStore.sortedMessages)
const isUserTyping = computed(() => {
  return currentUser.value && chatStore.typingUsers[currentUser.value.id]
})

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push({ name: 'login' })
    return
  }

  if (!chatStore.socket) {
    chatStore.initSocket(authStore.user.id)
  }

  const currentChatId = route.params.id
  const storedChatId = localStorage.getItem('current_chat_id')

  if (currentChatId && currentChatId !== storedChatId) {
    // This is a new chat session, reset the timer session
    timerStore.resetSession()
    localStorage.setItem('current_chat_id', currentChatId)
  }

  chatStore.socket.on('newMessage', handleNewMessage)

  // Get user from props or from route params
  if (props.selectedUser) {
    currentUser.value = props.selectedUser
  } else if (route.params.id) {
    // If we're using router params to identify the user, fetch user data
    await dokterStore.fetchUsers()
    currentUser.value = dokterStore.users.find((user) => user.id === route.params.id)
  }

  if (currentUser.value) {
    chatStore.selectUser(currentUser.value)
    scrollToBottom()
  }
})

// Clean up when component is unmounted
onUnmounted(() => {
  clearTimeout(typingTimer.value)

  if (chatStore.socket) {
    chatStore.socket.off('newMessage', handleNewMessage)
  }
})

// Watch for new messages to scroll down
watch(
  () => chatStore.messages.length,
  () => {
    scrollToBottom()
  },
)

// Watch for props changes
watch(
  () => props.selectedUser,
  (newUser) => {
    if (newUser) {
      currentUser.value = newUser
      chatStore.selectUser(newUser)
      scrollToBottom()
    }
  },
)

// Watch for route changes
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await dokterStore.fetchUsers()
      const user = dokterStore.users.find((u) => u.id === newId)
      if (user) {
        currentUser.value = user
        chatStore.selectUser(user)
        scrollToBottom()
      }
    }
  },
)

const handleNewMessage = (message) => {
  console.log('Direct message handler in component:', message)
}

// Typing indicator handling
const handleTyping = () => {
  clearTimeout(typingTimer.value)

  if (!isTyping.value) {
    isTyping.value = true
    chatStore.sendTypingStatus(true)
  }

  // Reset typing status after 2 seconds of inactivity
  typingTimer.value = setTimeout(() => {
    isTyping.value = false
    chatStore.sendTypingStatus(false)
  }, 2000)
}

// Send message
const send = async () => {
  if (!message.value.trim()) return

  try {
    await chatStore.sendMessage(message.value)
    message.value = ''
    scrollToBottom()
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}

// Retry sending failed message
const retryMessage = async (messageId) => {
  try {
    await chatStore.resendMessage(messageId)
  } catch (error) {
    console.error('Failed to resend message:', error)
  }
}

// Format message timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: id })
  } catch (e) {
    return ''
  }
}

// Scroll to bottom of chat
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }, 50)
}

const endConversationButton = async () => {
  try {
    const res = await conversationStore.endConversation({ id: chatStore.conversationId })
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Terimakasih telah melakukan konsultasi! :D',
      }).then(() => {
        router.push('/')
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi Kesalahan!',
      })
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
</script>

<template>
  <div v-if="currentUser" class="flex flex-col h-[600px] bg-[#FF8095] rounded-lg shadow-lg">
    <!-- Chat header -->
    <div class="flex items-center justify-between p-4 border-b-black border-b-1">
      <div class="flex">
        <div class="relative">
          <img
            :src="currentUser.profile || '/default-avatar.png'"
            alt="Profile"
            class="w-10 h-10 rounded-full text-white"
          />
          <span
            :class="chatStore.onlineUsers.includes(currentUser.id) ? 'bg-green-500' : 'bg-gray-400'"
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white"
          ></span>
        </div>
        <div class="ml-3">
          <h3 v-if="authStore.user.roles === 'user'" class="font-medium text-white">
            Drh. {{ currentUser.username }}
          </h3>
          <h3 v-else class="font-medium text-white">{{ currentUser.username }}</h3>
          <p class="text-xs text-gray-100">
            {{ chatStore.onlineUsers.includes(currentUser.id) ? 'Online' : 'Offline' }}
          </p>
          <p v-if="isUserTyping" class="text-xs text-gray-600 italic animate-pulse">
            Sedang mengetik...
          </p>
        </div>
      </div>
      <CountdownTimer />
      <div class="px-5 bg-[#16BDCA] py-1.5 hover:scale-105 hover:shadow-lg text-white rounded-xl">
        <button @click="endConversationButton()">Selesai</button>
      </div>
    </div>

    <!-- Messages container -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FF8095]">
      <div
        v-for="msg in sortedMessages"
        :key="msg.id"
        :class="msg.senderId === authStore.user.id ? 'flex justify-end' : 'flex justify-start'"
      >
        <div
          :class="[
            msg.senderId === authStore.user.id
              ? ' rounded-tl-lg rounded-tr-sm rounded-bl-lg'
              : ' rounded-tr-lg rounded-tl-sm rounded-br-lg',
            msg.status === 'failed' ? 'opacity-70' : '',
          ]"
          class="max-w-[70%] px-4 text-gray-800 font-semibold bg-gray-200 py-2 break-words shadow-sm"
        >
          <p>{{ msg.message }}</p>
          <div class="flex items-center justify-end gap-1 mt-1">
            <span class="text-xs opacity-70">{{ formatTime(msg.createdAt) }}</span>
            <template v-if="msg.senderId === authStore.user.id">
              <span v-if="msg.status === 'sending'" class="text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke-width="4"
                    stroke="currentColor"
                    stroke-dasharray="30 30"
                    stroke-dashoffset="0"
                  ></circle>
                </svg>
              </span>
              <span v-else-if="msg.status === 'sent'" class="text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span
                v-else-if="msg.status === 'failed'"
                class="text-xs cursor-pointer"
                @click="retryMessage(msg.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </template>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="sortedMessages.length === 0"
        class="flex flex-col items-center justify-center h-full"
      >
        <div class="text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p>Belum ada percakapan.</p>
          <p class="text-sm">Mulai percakapan dengan {{ currentUser.username }}</p>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="p-3 border-t bg-white">
      <div class="flex gap-2">
        <input
          v-model="message"
          @input="handleTyping"
          @keyup.enter="send"
          type="text"
          class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Ketik pesan..."
        />
        <button
          @click="send"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition flex items-center justify-center"
          :disabled="!message.trim()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div v-else class="h-[600px] flex items-center justify-center bg-white rounded-lg shadow-lg">
    <div class="text-center text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto mb-3 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      <h3 class="font-medium mb-1">Pilih Dokter untuk Memulai Konsultasi</h3>
      <p>Silahkan pilih dokter dari daftar untuk memulai konsultasi</p>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
