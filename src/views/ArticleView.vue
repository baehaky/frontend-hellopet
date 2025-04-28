<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="mt-10 px-5 lg:px-20">
    <RouterLink to="/">
      <h1 class="font-medium underline underline-offset-3 hover:underline-offset-1 transition-all">
        kembali
      </h1>
    </RouterLink>
    <div class="mb-4 md:mb-0 w-full mx-auto relative">
      <div class="px-4 lg:px-0">
        <h2 class="text-4xl font-semibold text-gray-800 leading-tight">
          Penyakit Umum pada Anjing: Kenali Gejala dan Cara Pencegahannya
        </h2>
        <h4 class="text-lg font-semibold text-gray-700 mt-1 leading-tight">Admin</h4>
        <p class="py-2 text-green-700 inline-flex items-center justify-center mb-2">4/25/2025</p>
      </div>

      <img
        src="@/assets/images/dog.jpg"
        class="w-full object-cover lg:rounded"
        :style="{ height: '28em' }"
      />
    </div>

    <div class="flex flex-col lg:flex-row lg:space-x-12">
      <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full">
        <!-- <div :dangerouslySetInnerHTML="{__html: postInfo.content }" /> -->
        <p>
          Anjing dikenal sebagai hewan peliharaan yang setia dan penuh kasih sayang. Namun, seperti
          halnya manusia, anjing juga bisa terkena berbagai jenis penyakit. Sebagai pemilik yang
          bertanggung jawab, penting bagi kita untuk mengenali tanda-tanda awal penyakit dan
          memahami bagaimana cara merawat serta mencegahnya.
        </p>
        <br />
        <h2><strong>1. Parvovirus (Parvo)</strong></h2>
        <p>
          Parvovirus adalah penyakit yang sangat menular pada anjing. Gejalanya meliputi muntah,
          diare berdarah, kehilangan nafsu makan, dan tubuh yang lemas. Pencegahan terbaik adalah
          dengan memberikan vaksin secara rutin sesuai anjuran dokter hewan.
        </p>
        <br />
        <h2><strong>2. Distemper</strong></h2>
        <p>
          Distemper adalah penyakit virus lain yang juga berbahaya. Tanda-tandanya antara lain demam
          tinggi, batuk dan pilek, mata berair, hingga kejang atau gangguan saraf. Vaksinasi
          distemper sejak usia dini sangat penting untuk mencegah infeksi ini.
        </p>
        <br />
        <h2><strong>3. Cacingan</strong></h2>
        <p>
          Cacingan bisa menyebabkan perut buncit, berat badan turun, anemia, dan bahkan muntah atau
          kotoran yang mengandung cacing. Pencegahan dilakukan dengan pemberian obat cacing secara
          berkala setiap beberapa bulan sesuai saran dokter hewan.
        </p>
        <br />
        <h2><strong>4. Penyakit Kulit</strong></h2>
        <p>
          Penyakit kulit bisa ditandai dengan gatal berlebihan, kerontokan bulu, luka atau ruam,
          serta bau tidak sedap dari kulit. Penyebabnya bisa jamur, kutu, alergi, atau lingkungan
          yang tidak bersih. Menjaga kebersihan dan menggunakan sampo khusus bisa membantu
          mencegahnya.
        </p>
        <br />
        <h2><strong>5. Rabies</strong></h2>
        <p>
          Rabies adalah penyakit yang sangat serius dan bisa menular ke manusia. Gejala rabies
          termasuk perubahan perilaku, air liur berlebihan, dan kelumpuhan. Vaksin rabies sangat
          penting terutama jika anjing sering berada di luar rumah.
        </p>

        <br />
        <h2><strong>Kesimpulan</strong></h2>
        <p>
          Menjaga kesehatan anjing bukan hanya membuat mereka hidup lebih lama, tetapi juga menjaga
          keamanan lingkungan sekitar. Dengan perhatian dan perawatan yang tepat, penyakit bisa
          dicegah atau ditangani sejak dini. Jangan ragu untuk berkonsultasi ke dokter hewan bila
          menemukan gejala yang mencurigakan.
        </p>
      </div>
    </div>
  </main>
</template>
