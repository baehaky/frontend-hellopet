<script setup>
import { RouterLink } from 'vue-router'
const formFields = [
  { type: 'text', placeholder: 'Email' },
  { type: 'password', placeholder: 'Password' },
]

const links = [
  {
    label: 'Belum punya akun? Daftar di sini',
    to: '/register',
    class:
      'bg-red-400 hover:border-red-300 active:bg-red-700 rounded-md text-white w-full text-center font-medium px-3 py-2 md:px-4 md:py-3 ',
  },
  {
    label: 'Kembali ke beranda',
    to: '/',
    class:
      'bg-black hover:border-red-300 active:bg-red-700 rounded-md text-white w-full text-center font-medium px-3 py-2 md:px-4 md:py-3 md:hidden',
  },
]
</script>

<template>
  <div class="flex flex-col max-w-md space-y-5">
    <form class="flex flex-col space-y-3">
      <template v-for="(field, index) in formFields" :key="index">
        <input
          :type="field.type"
          :placeholder="field.placeholder"
          class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-teal-400 rounded-lg font-medium placeholder:font-normal w-full"
        />
      </template>

      <button
        class="flex items-center justify-center hover:border-teal-300 active:bg-teal-700 bg-teal-400 w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium text-white"
      >
        Konfirmasi
      </button>
    </form>

    <div className="flex justify-center items-center ">
      <span className="w-[100px] border border-black"></span>
      <span className="hidden md:block px-5">Selamat Datang</span>
      <span className="px-4 block md:hidden">Atau</span>
      <span className="w-[100px] border border-black"></span>
    </div>

    <div class="flex flex-col space-y-3">
      <RouterLink v-for="(item, index) in links" :key="index" :to="item.to" :class="item.class">
        <span v-if="item.icon" class="bg-white rounded-full mr-3" v-html="item.icon"></span>
        {{ item.label }}
      </RouterLink>
    </div>
  </div>
</template>
