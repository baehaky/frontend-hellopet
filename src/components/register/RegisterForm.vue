<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  phone: '',
  email: '',
  password: '',
})

const formFields = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
  },
  {
    name: 'phone',
    type: 'text',
    placeholder: 'Nomor Handphone',
  },

  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
]

const submitForm = async () => {
  const success = await auth.register({
    username: form.username,
    email: form.email,
    password: form.password,
    phone_number: form.phone,
  })

  if (success) {
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Pendaftaran berhasil!',
    })
    router.push('/login')
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Pendaftaran gagal!',
    })
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto flex flex-wrap">
    <template v-for="field in formFields" :key="field.name">
      <div :class="`pb-2 pt-4 w-full ${field.col || ''}`">
        <input
          v-model="form[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="block w-full p-4 text-lg rounded-sm border-2"
        />
      </div>
    </template>

    <div class="px-4 pb-2 pt-4 w-full">
      <button
        type="submit"
        class="uppercase block w-full p-4 text-lg rounded-md bg-teal-400 hover:bg-teal-600 text-white"
        :disabled="auth.loading"
      >
        {{ auth.loading ? 'Loading...' : 'Daftar' }}
      </button>
    </div>
  </form>
</template>
