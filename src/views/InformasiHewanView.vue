<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="max-w-7xl mx-auto my-8 px-2">
    <div class="flex justify-center text-2xl md:text-3xl font-bold mb-4">Informasi Hewan</div>

    <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
      <li
        class="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-primary-400"
      >
        <RouterLink class="relative" to="/informasi/penyakitanjing">
          <div class="relative w-full aspect-video">
            <img
              class="rounded w-full h-full object-cover"
              src="@/assets/images/dog.jpg"
              alt="anjing"
              loading="lazy"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-cyan-400 to-teal-700 text-white"
            >
              <h2 class="text-xl font-semibold">Penyakit Umum pada Anjing:</h2>
              <p class="font-medium text-sm">Kenali Gejala dan Cara Pencegahannya</p>
            </div>
          </div>
        </RouterLink>

        <div class="flex flex-col justify-beetween gap-3 px-4 py-2">
          <p class="text-gray-600 two-lines">
            Anjing dikenal sebagai hewan peliharaan yang setia dan penuh kasih sayang. Namun,
            seperti halnya manusia, anjing juga bisa terkena berbagai jenis penyakit. 
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
