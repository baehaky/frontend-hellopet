<script setup>
import { reactive } from 'vue'
const form = reactive({
  username: '',
  phone: '',
  address: '',
  email: '',
  password: '',
})

const formFields = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    col: 'md:w-1/2',
  },
  {
    name: 'phone',
    type: 'text',
    placeholder: 'Nomor Handphone',
    col: 'md:w-1/2',
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'Alamat',
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

const submitForm = () => {
  console.log('Form submitted:', { ...form })
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
      >
        Daftar
      </button>
    </div>
  </form>
</template>
