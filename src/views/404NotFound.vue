<template>
  <section class="bg-gray-900 h-screen flex items-center">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-transparent [text-shadow:_0_0_50px_rgba(22,189,202,0.4)]"
        >
          404
        </h1>

        <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-300">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <RouterLink
          to="/"
          class="inline-flex text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-2 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >Back to Homepage</RouterLink
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
