<script setup>
import { ref, onMounted } from 'vue'
import { useDokterStore } from '@/stores/dokter'
import { BriefcaseIcon, StarIcon, BanknotesIcon, ClockIcon } from '@heroicons/vue/24/outline'
import ChatButton from './ChatButton.vue'

const userStore = useDokterStore()
const users = ref([])
const loading = ref(true)

const fetchUsers = async () => {
  loading.value = true
  await userStore.fetchUsers()
  users.value = userStore.users
  loading.value = false
}

onMounted(fetchUsers)
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center text-white">Daftar Dokter</h1>

    <div class="text-center text-white font-semibold animate-pulse" v-if="loading">
      Memuat data dokter...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      >
        <div class="flex flex-col items-center justify-center space-y-3">
          <img
            :src="user.picture || 'https://via.placeholder.com/100'"
            :alt="user.username"
            class="w-24 h-24 object-cover rounded-full"
          />
          <h2 class="text-lg font-semibold text-center">{{ user.username }}</h2>
          <div class="grid grid-cols-2 gap-2 p-3 w-full text-sm">
            <div class="flex items-center gap-2">
              <BriefcaseIcon class="w-5" />
              <p>{{ user.workExperience }} Tahun</p>
            </div>
            <div class="flex items-center gap-2">
              <BanknotesIcon class="w-5" />
              <p>Rp{{ user.price }}</p>
            </div>
            <div class="flex items-center gap-2">
              <StarIcon class="w-5" />
              <p>{{ user.rate ?? 0 }}</p>
            </div>
            <div class="flex items-center gap-2">
              <ClockIcon class="w-5" />
              <p>30 Menit</p>
            </div>
          </div>
          <ChatButton :doctor="user" />
        </div>
      </div>
    </div>
  </div>
</template>
