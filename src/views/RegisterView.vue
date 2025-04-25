<script setup>
import RegisterForm from '@/components/register/RegisterForm.vue'
import RegisterSection from '@/components/register/RegisterSection.vue'
</script>

<template>
  <section className="min-h-screen flex items-stretch flex-row-reverse">
    <RegisterSection />
    <div className="lg:w-2/3 w-full flex items-center justify-center text-center md:px-16 px-0">
      <div className="w-full py-6">
        <h1 className="my-6 text-black text-3xl font-bold">Daftarkan Akun Kamu</h1>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  </section>
</template>
