<script setup>
import { ref, onMounted } from 'vue'
import Chat from '@/components/Chat.vue'
import { useRoute } from 'vue-router'
import { useDokterStore } from '@/stores/dokter'

const route = useRoute()
const dokterStore = useDokterStore()
const selectedUser = ref(null)

onMounted(async () => {
  if (route.params.id) {
    await dokterStore.fetchUsers()
    selectedUser.value = dokterStore.users.find((user) => user.id === route.params.id)
  }
})
</script>

<template>
  <div class="min-h-screen p-4 bg-gradient-to-b from-cyan-500 to-blue-300">
    <div class="max-w-3xl mx-auto">
      <Chat :selected-user="selectedUser" />
    </div>
  </div>
</template>
