<!-- src/views/ChatPasienView.vue -->
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Chat from '@/components/Chat.vue'

const route = useRoute()

const selectedUser = ref({
  id: route.params.id,
  username: route.query.username,
  role: route.query.role,
})
</script>

<template>
  <div class="min-h-screen p-4 bg-gradient-to-b from-blue-300 to-cyan-500">
    <div class="max-w-3xl mx-auto">
      <Chat :selected-user="selectedUser" />
    </div>
  </div>
</template>
