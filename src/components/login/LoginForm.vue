<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const formFields = [
  { name: 'email', type: 'text', placeholder: 'Email' },
  { name: 'password', type: 'password', placeholder: 'Password' },
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

const submitForm = async () => {
  const success = await auth.login({
    email: form.email,
    password: form.password,
  })

  if (success) {
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Login berhasil!',
    })
    await router.push('/')
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Login gagal!',
    })
  }
}
</script>

<template>
  <div class="flex flex-col max-w-md space-y-5">
    <form @submit.prevent="submitForm" class="flex flex-col space-y-3">
      <template v-for="field in formFields" :key="field.name">
        <input
          v-model="form[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-teal-400 rounded-lg font-medium placeholder:font-normal w-full"
        />
      </template>

      <button
        type="submit"
        class="flex items-center justify-center hover:border-teal-300 active:bg-teal-700 bg-teal-400 w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium text-white"
        :disabled="auth.loading"
      >
        {{ auth.loading ? 'Loading...' : 'Masuk' }}
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
