<template>
  <div class="flex items-center flex-col">
    <div class="text-xl font-bold text-center text-white">{{ formattedTime }}</div>
    <div class="text-xs text-gray-200 ml-2">Sisa waktu konsultasi</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTimerStore } from '@/stores/timer'
import { useConversationsStore } from '@/stores/conversation'
import { useChatStore } from '@/stores/chat'
import Swal from 'sweetalert2'

const props = defineProps({
  initialDuration: {
    type: Number,
    default: 30 * 60,
  },
})

const router = useRouter()
const timerStore = useTimerStore()
const chatStore = useChatStore()
const conversationStore = useConversationsStore()
const formattedTime = computed(() => timerStore.formattedTime)

const redirectToRoot = async () => {
  try {
    const res = await conversationStore.endConversation(chatStore.conversationId)
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

onMounted(() => {
  timerStore.startTimer(props.initialDuration, redirectToRoot)
})

onBeforeUnmount(() => {
  timerStore.pauseTimer()
})
</script>
