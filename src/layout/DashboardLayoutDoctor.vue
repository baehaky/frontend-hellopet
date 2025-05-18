<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import Footer from '@/components/Footer.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <AppSidebar />
  <main class="bg-[#16BDCA]">
    <RouterView />
  </main>
  <Footer />
</template>
