<script setup>
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  isMobileOpen: Boolean,
  navItems: Array,
})

const emit = defineEmits(['close'])

const route = useRoute()

const handleClose = () => {
  emit('close')
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

      <RouterLink to="/login" @click="handleClose">
        <button class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg w-full mt-2">Masuk</button>
      </RouterLink>
    </div>
  </div>
</template>
