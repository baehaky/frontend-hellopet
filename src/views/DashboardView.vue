<script setup>
import { ref, onMounted } from 'vue'
import api from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useClock } from '@/composables/useClock'

const auth = useAuthStore()
const pasienList = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get(`/api/messages/chat/?id=${auth.user.id}`)
    pasienList.value = response.data.data
  } catch (err) {
    console.error('Gagal memuat pasien:', err)
  } finally {
    loading.value = false
  }
})

const base = `/dokter/dashboard/${auth.user.id}`

const { dayName, hours, minutes, seconds } = useClock()
</script>

<template>
  <section class="py-4 px-9 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-center text-white">Konsultasi dengan Customer</h1>
    <div class="flex justify-center mb-5">
      <p class="text-center text-lg font-semibold bg-[#FCFF82] p-2 rounded-md text-[#16BDCA]">
        {{ dayName }} {{ hours }} : {{ minutes }} : {{ seconds }}
      </p>
    </div>

    <div class="text-center text-white font-black" v-if="loading">Memuat daftar pasien...</div>

    <div v-else-if="pasienList.length">
      <template v-for="pasien in pasienList" :key="pasien.userId">
        <RouterLink
          :to="{
            path: `${base}/chat/${pasien.userId}`,
            query: {
              username: pasien.username,
              role: pasien.role,
            },
          }"
        >
          <div class="w-full bg-white p-3 flex space-x-3 rounded-2xl">
            <div class="rounded-full w-[50px] h-auto">
              <img :src="pasien.picture" :alt="pasien.username" />
            </div>
            <div>
              <h4 class="font-bold text-xl">{{ pasien.username }}</h4>
              <p class="text-md text-gray-600">{{ pasien.lastMessage.content }}</p>
            </div>
          </div>
        </RouterLink>
      </template>
    </div>

    <div v-else class="text-white text-center font-semibold bg-red-500 rounded-2xl p-5">
      Belum ada pasien yang memulai chat.
    </div>

    <div class="flex flex-col justify-center items-center mt-5">
      <h1 class="text-white text-3xl font-semibold mb-5">Review Customer</h1>
      <div class="h-auto w-full bg-red-500 text-center p-5 rounded-2xl text-white">
        Belum ada customer yang review
      </div>
    </div>
  </section>
</template>
