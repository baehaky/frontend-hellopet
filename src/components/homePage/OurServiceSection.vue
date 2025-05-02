<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const serviceItems = computed(() => {
  return authStore.isLoggedIn
    ? [
        {
          name: 'Konsultasi dengan Dokter Hewan',
          image: '@/assets/images/7.png',
          path: 'jadwal-dokter',
        },
      ]
    : [
        {
          name: 'Konsultasi dengan Dokter Hewan',
          image: '@/assets/images/7.png',
          path: 'jadwal-dokter',
        },
        { name: 'Favorit Dokter', image: '@/assets/images/8.png', path: 'favorit-dokter' },
      ]
})
</script>

<template>
  <section class="bg-[#FCFF82] py-12">
    <h1 class="text-[#FF8095] text-center pb-6 text-xl font-bold">Layanan Kami</h1>
    <div class="flex justify-center">
      <RouterLink v-for="(item, index) in serviceItems" :key="index" :to="item.path">
        <div
          class="flex flex-col items-center border border-gray-200 rounded-lg shadow-sm max-w-xs md:max-w-xl bg-[#FF8095] p-5"
        >
          <img
            class="object-cover w-38 rounded-t-lg h-auto md:h-auto md:w-42 md:rounded-none md:rounded-s-lg"
            :src="item.image"
            alt=""
          />
          <div class="flex flex-col justify-between leading-normal">
            <h5 class="text-xl font-bold tracking-tight md:text-left text-center text-white">
              {{ item.name }}
            </h5>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
