<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import MobileNavbar from './MobileNavbar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isMobileOpen = ref(false)
const route = useRoute()
const router = useRouter()

const isLoading = computed(() => authStore.loading)

const navItems = computed(() => {
  return authStore.isLoggedIn
    ? [
        { name: 'Beranda', path: '/' },
        { name: 'List Grooming', path: 'listgrooming' },
        { name: 'Tentang Kami', path: 'tentang-kami' },
        { name: 'Informasi', path: 'informasi' },
      ]
    : [
        { name: 'Beranda', path: '/' },
        { name: 'List Grooming', path: 'listgrooming' },
        { name: 'Tentang Kami', path: 'tentang-kami' },
        { name: 'Informasi', path: 'informasi' },
      ]
})

const closeMobileMenu = () => {
  isMobileOpen.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

watch(
  () => authStore.isLoggedIn,
  (newVal) => {
    if (!newVal && !['/', '/login', '/register'].includes(route.path)) {
      router.push('/')
    }
  },
)
authStore.initialize()
</script>

<template>
  <header class="bg-white sticky top-0 w-full border-b-[1.5px] z-10 border-b-black">
    <nav
      class="max-w-7xl mx-auto flex items-center lg:gap-x-10 justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <RouterLink to="/" class="-m-1.5 p-1.5">
        <img class="h-12 w-auto" src="@/assets/images/10.png" alt="Logo" />
      </RouterLink>

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

      <div class="hidden md:flex lg:flex-1 lg:justify-end">
        <RouterLink
          v-if="!authStore.isLoggedIn"
          to="/login"
          class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg hover:bg-cyan-700"
        >
          Masuk
        </RouterLink>
        <button
          v-else
          type="button"
          @click="handleLogout"
          :disabled="isLoading"
          class="bg-red-500 py-1.5 px-3.5 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          <span v-if="isLoading">Memproses...</span>
          <span v-else>Keluar</span>
        </button>
      </div>

      <div class="md:hidden">
        <button @click="isMobileOpen = !isMobileOpen" class="text-black">
          <Bars3BottomRightIcon class="size-7" />
        </button>
      </div>
    </nav>

    <MobileNavbar
      :is-mobile-open="isMobileOpen"
      :nav-items="navItems"
      :is-logged-in="authStore.isLoggedIn"
      @close="closeMobileMenu"
      @logout="handleLogout"
    />
  </header>
</template>
