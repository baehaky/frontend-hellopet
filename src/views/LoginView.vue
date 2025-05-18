<script setup>
import LoginForm from '@/components/login/LoginForm.vue'
import LoginSection from '@/components/login/LoginSection.vue'
</script>

<template>
  <div className="flex min-h-[100dvh] ">
    <div className="flex flex-row w-full">
      <LoginSection />
      <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Masuk ke akun</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>
