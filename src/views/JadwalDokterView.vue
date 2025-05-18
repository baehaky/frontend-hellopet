<script setup>
import { ref } from 'vue'
import CarouselDoctor from '@/components/CarouselDoctor.vue'
import JadwalDokterList from '@/components/JadwalDokterList.vue'

// Use this to toggle between carousel and list view if needed
const viewMode = ref('list') // 'carousel' or 'list'
</script>

<template>
  <div class="min-h-screen p-4 bg-gradient-to-b from-cyan-500 to-blue-300 space-y-6">
    <!-- You can choose which component to show based on preference -->
    <JadwalDokterList v-if="viewMode === 'list'" />
    <CarouselDoctor v-else />
  </div>
</template>
