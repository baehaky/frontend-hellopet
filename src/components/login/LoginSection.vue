<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div className="md:flex w-1/2 flex-col bg-teal-400 justify-center hidden">
    <div className="py-10 -mt-10 px-10 rounded-lg backdrop-blur-lg">
      <div className="flex flex-col items-center">
        <img src="@/assets/images/9.png" className="w-1/3" />
        <p className="text-white mt-1">Silahkan register jika anda belum memiliki akun</p>
        <RouterLink
          to="/register"
          className="block text-center w-1/2 bg-white hover:bg-slate-400 hover:text-white text-black mt-4 rounded-lg font-medium mb-2 px-3 py-2 md:px-4 md:py-3"
        >
          Registrasi
        </RouterLink>
      </div>
    </div>
  </div>
</template>
