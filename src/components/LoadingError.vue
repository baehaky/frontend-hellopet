<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  loading: Boolean,
  error: String,
  onRetry: Function,
})
</script>

<template>
  <div>
    <div v-if="loading" class="flex flex-col items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-500 font-medium">Memuat data konsultasi...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex">
        <span class="material-icons-outlined text-red-500 mr-3">error_outline</span>
        <p class="text-red-700">{{ error }}</p>
      </div>
      <button
        @click="onRetry"
        class="mt-3 text-sm text-red-700 hover:text-red-900 underline flex items-center"
      >
        <span class="material-icons-outlined text-sm mr-1">refresh</span>
        Coba lagi
      </button>
    </div>
  </div>
</template>
