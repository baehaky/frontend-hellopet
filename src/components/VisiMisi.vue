<script setup>

</script>

<template>
  <section class="bg-white py-12 px-6 md:px-16 lg:px-32">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Visi & Misi Kami</h2>
      <p class="text-gray-600 text-lg">
        Kami hadir untuk menciptakan dunia yang lebih baik bagi hewan peliharaan dan pemiliknya.
      </p>
    </div>

    <div class="flex flex-col md:flex-row items-center gap-8">
      <div class="shadow-lg ">
        <img
          src="@/assets/images/catdog.png"
          alt="Cat and Dog"
          class="w-full h-auto rounded-xl shadow-lg mix-blend-multiply"
        />
      </div>
      <div class="flex-1 space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Visi</h3>
          <p class="text-gray-600">
            Menjadi platform terdepan yang menghubungkan pecinta hewan dengan solusi terbaik untuk
            kesejahteraan hewan peliharaan.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Misi</h3>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>Menyediakan layanan kesehatan hewan yang mudah diakses.</li>
            <li>Memberikan edukasi seputar perawatan hewan peliharaan.</li>
            <li>Membangun komunitas pecinta hewan yang peduli dan suportif.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
