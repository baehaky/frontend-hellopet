<template>
  <div class="w-full max-w-sm mx-auto mt-6">
    <h2 class="text-lg font-semibold mb-4">Pilih Pengguna</h2>
    <ul class="space-y-2">
      <li
        v-for="user in users"
        :key="user.id"
        @click="selectUser(user)"
        :class="[
          'p-3 border rounded cursor-pointer transition',
          chatStore.selectedUser?.id === user.id
            ? 'bg-blue-100 border-blue-500'
            : 'hover:bg-gray-100',
        ]"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import api from '@/lib/api'

const chatStore = useChatStore()
const users = ref([])

async function fetchUsers() {
  try {
    const res = await api.get('/api/users')
    users.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data user:', err)
  }
}

function selectUser(user) {
  chatStore.selectUser(user)
}

onMounted(fetchUsers)
</script>
