<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const images = {
  konsultasiLoggedIn: new URL('@/assets/images/7.png', import.meta.url).href,
  favorit: new URL('@/assets/images/5.png', import.meta.url).href,
}

const authStore = useAuthStore()

const serviceItems = computed(() => {
  if (authStore.isLoggedIn) {
    return [
      {
        name: 'Konsultasi dengan Dokter Hewan',
        image: images.konsultasiLoggedIn,
        path: 'jadwal-dokter',
      },
      // {
      //   name: 'Favorit Dokter',
      //   image: images.favorit,
      //   path: 'dokter-favorite',
      // },
    ]
  } else {
    return [
      {
        name: 'Konsultasi dengan Dokter Hewan',
        image: images.konsultasiLoggedIn,
        path: 'jadwal-dokter',
      },
    ]
  }
})
</script>

<template>
  <section class="bg-[#FCFF82] py-12">
    <h1 class="text-[#FF8095] text-center pb-6 text-xl font-bold">Layanan Kami</h1>
    <div class="flex justify-center flex-wrap gap-4">
      <RouterLink v-for="item in serviceItems" :key="item.path" :to="item.path" class="max-w-xs">
        <div
          class="flex flex-col items-center border min-w-xs border-gray-200 rounded-lg shadow-sm bg-[#FF8095] p-5"
        >
          <img :src="item.image" :alt="item.name" class="object-cover w-38 h-auto rounded-t-lg" />
          <h5 class="text-xl font-bold tracking-tight text-white text-center mt-4">
            {{ item.name }}
          </h5>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
