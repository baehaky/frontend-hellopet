<template>
  <div class="flex items-center p-4 border-b">
    <!-- Profile section -->
    <div class="relative">
      <img
        :src="currentUser.profile || '/default-avatar.png'"
        alt="Profile"
        class="w-10 h-10 rounded-full"
      />
      <span
        :class="chatStore.onlineUsers.includes(currentUser.id) ? 'bg-green-500' : 'bg-gray-400'"
        class="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white"
      ></span>
    </div>
    <div class="ml-3">
      <h3 v-if="authStore.user.roles === 'user'" class="font-medium">
        Drh. {{ currentUser.username }}
      </h3>
      <h3 v-else class="font-medium">{{ currentUser.username }}</h3>
      <p class="text-xs text-gray-500">
        {{ chatStore.onlineUsers.includes(currentUser.id) ? 'Online' : 'Offline' }}
      </p>
      <p v-if="isUserTyping" class="text-xs text-gray-600 italic animate-pulse">
        Sedang mengetik...
      </p>
    </div>

    <!-- Timer section -->
    <div class="ml-auto">
      <CountdownTimer />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CountdownTimer from '@/components/CountdownTimer.vue'

defineProps({
  currentUser: Object,
  isUserTyping: Boolean,
  authStore: Object,
  chatStore: Object,
})
</script>
