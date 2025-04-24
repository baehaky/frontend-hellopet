<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section className="min-h-screen flex items-stretch flex-row-reverse">
    <div className="lg:flex w-1/2 hidden bg-teal-400  items-center">
      <div className="w-full px-2 text-white">
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
      <div className="w-full py-6 ">
        <h1 className="my-6 text-black text-3xl font-bold">Daftarkan Akun Kamu</h1>

        <div>
          <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto flex flex-wrap">
            <div className="pb-2 pt-4 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Username"
                className="block w-full p-4 text-lg rounded-sm border-2"
              />
            </div>
            <div className="pb-2 pt-4 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Nomor Handphone"
                className="block w-full p-4 text-lg rounded-sm border-2"
              />
            </div>
            <div className="pb-2 pt-4 w-full">
              <input
                type="text"
                placeholder="Alamat"
                className="block w-full p-4 text-lg rounded-sm border-2"
              />
            </div>
            <div className="pb-2 pt-3 w-full ">
              <label>Pilih gender anda</label>
              <div className="flex justify-around mt-4">
                <div className="flex items-center">
                  <input type="radio" name="disabled-radio" className="w-4 h-4 " />
                  <label className="ms-2 text-sm font-medium ">Pria</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="disabled-radio" className="w-4 h-4 " />
                  <label className="ms-2 text-sm font-medium">Wanita</label>
                </div>
              </div>
            </div>

            <div className="pb-2 pt-4 w-full">
              <input
                className="block w-full p-4 text-lg rounded-sm border-2"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="pb-2 pt-4 w-full">
              <input
                className="block w-full p-4 text-lg rounded-sm border-2"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="px-4 pb-2 pt-4 w-full">
              <button
                className="uppercase block w-full p-4 text-lg rounded-full bg-teal-400 hover:bg-teal-600 focus:outline-none text-white"
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
