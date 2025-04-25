<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import MobileNavbar from './MobileNavbar.vue'

const navItems = [
  { name: 'Beranda', path: '/' },
  { name: 'Tentang Kami', path: '/tentang-kami' },
  { name: 'Informasi', path: '/informasi' },
]

const isMobileOpen = ref(false)
const route = useRoute()

const closeMobileMenu = () => {
  isMobileOpen.value = false
}
</script>

<template>
  <header class="bg-white sticky top-0 w-full border-b-[1.5px] z-10 border-b-black">
    <nav
      class="max-w-7xl mx-auto flex items-center lg:gap-x-10 justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <!-- Logo -->
      <RouterLink to="/" class="-m-1.5 p-1.5">
        <img class="h-12 w-auto" src="@/assets/images/10.png" alt="Logo" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex gap-x-8 items-center">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'text-black font-serif flex gap-x-1.5 hover:text-[#16BDCA] hover:underline hover:[text-underline-offset:4px] transition-all delay-100',
            route.path === item.path ? 'font-bold text-[#16BDCA] underline' : '',
          ]"
        >
          {{ item.name }}
        </RouterLink>
      </div>

      <!-- Desktop Login Button -->
      <div class="hidden md:flex lg:flex-1 lg:justify-end">
        <RouterLink to="/login">
          <button class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg hover:bg-cyan-700">
            Masuk
          </button>
        </RouterLink>
      </div>

      <!-- Mobile Toggle Button -->
      <div class="md:hidden">
        <button @click="isMobileOpen = !isMobileOpen" class="text-black">
          <Bars3BottomRightIcon class="size-7" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <MobileNavbar :is-mobile-open="isMobileOpen" :nav-items="navItems" @close="closeMobileMenu" />
  </header>
</template>
