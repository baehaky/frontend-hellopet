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
  <section className="min-h-screen flex items-stretch flex-row-reverse">
    <div className="lg:flex w-1/2 hidden bg-teal-400  items-center">
      <div className="w-full px-10 text-white">
        <h1 className="text-5xl font-bold text-left tracking-wide">Daftarkan segera akun kamu</h1>
        <RouterLink to="/">
          <button
            className="group relative mt-5 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
          >
            <div
              className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
            ></div>
            <span className="relative text-teal-600 group-hover:text-white"> Kembali </span>
          </button>
        </RouterLink>
      </div>
    </div>
    <div className="lg:w-2/3 w-full flex items-center justify-center text-center md:px-16 px-0">
      <div className="w-full py-6">
        <h1 className="my-6 text-black text-3xl font-bold">Daftarkan Akun Kamu</h1>
        <div>
          <form
            @submit.prevent="submitForm"
            class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto flex flex-wrap"
          >
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
                class="uppercase block w-full p-4 text-lg rounded-full bg-teal-400 hover:bg-teal-600 text-white"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
