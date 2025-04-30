<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  isMobileOpen: Boolean,
  navItems: Array,
  isLoggedIn: Boolean,
  isLoading: Boolean,
})

const emit = defineEmits(['close', 'logout'])

const route = useRoute()

const handleClose = () => {
  emit('close')
}
const isLoggingOut = ref(false)

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    await emit('logout')
    emit('close')
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div v-show="isMobileOpen" class="md:hidden px-6 pb-4">
    <div class="flex flex-col gap-4">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        @click="handleClose"
        :class="[
          'text-black font-serif flex gap-x-1.5 hover:text-[#16BDCA] hover:underline hover:[text-underline-offset:4px] transition-all delay-100',
          route.path === item.path ? 'font-bold text-[#16BDCA] underline' : '',
        ]"
      >
        {{ item.name }}
      </RouterLink>

      <RouterLink v-if="!isLoggedIn" to="/login" @click="handleClose">
        <button class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg w-full mt-2">Masuk</button>
      </RouterLink>

      <button
        @click="handleLogout"
        :disabled="isLoggingOut"
        class="bg-red-500 py-1.5 px-3.5 text-white rounded-lg w-full mt-2"
      >
        <span v-if="!isLoggingOut">Keluar</span>
        <span v-else class="flex items-center justify-center gap-2">
          <span
            class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          Memproses...
        </span>
      </button>
    </div>
  </div>
</template>
