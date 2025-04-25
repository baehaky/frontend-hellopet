<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="mt-10 px-20">
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
        src="@/assets/images/dog.png"
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
          memahami bagaimana cara merawat serta mencegahnya. Berikut ini beberapa penyakit umum yang
          sering dialami oleh anjing:
        </p>

        <h2>1. Parvovirus (Parvo)</h2>
        <h3>Gejala:</h3>
        <ul>
          <li>Muntah</li>
          <li>Diare berdarah</li>
          <li>Kehilangan nafsu makan</li>
          <li>Lemas</li>
        </ul>
        <h3>Pencegahan:</h3>
        <p>
          Vaksinasi adalah langkah paling efektif untuk mencegah parvo. Pastikan anjing Anda
          mendapatkan vaksin secara rutin sesuai anjuran dokter hewan.
        </p>
        <hr />

        <h2>2. Distemper</h2>
        <h3>Gejala:</h3>
        <ul>
          <li>Demam tinggi</li>
          <li>Batuk dan pilek</li>
          <li>Mata berair</li>
          <li>Kejang atau gangguan saraf (pada tahap lanjut)</li>
        </ul>
        <h3>Pencegahan:</h3>
        <p>
          Vaksinasi distemper penting dilakukan sejak usia dini. Penyakit ini sangat menular dan
          bisa berakibat fatal.
        </p>
        <hr />

        <h2>3. Cacingan</h2>
        <h3>Gejala:</h3>
        <ul>
          <li>Perut buncit</li>
          <li>Berat badan turun</li>
          <li>Anemia (gusi pucat)</li>
          <li>Muntah atau feses mengandung cacing</li>
        </ul>
        <h3>Pencegahan:</h3>
        <p>Beri obat cacing secara berkala setiap 3-6 bulan, tergantung usia dan kondisi anjing.</p>
        <hr />

        <h2>4. Penyakit Kulit</h2>
        <h3>Gejala:</h3>
        <ul>
          <li>Gatal berlebihan</li>
          <li>Kerontokan bulu</li>
          <li>Luka atau ruam pada kulit</li>
          <li>Bau tidak sedap dari kulit</li>
        </ul>
        <h3>Penyebab:</h3>
        <p>Bisa disebabkan oleh jamur, kutu, alergi makanan, atau lingkungan.</p>
        <h3>Pencegahan:</h3>
        <p>
          Mandikan anjing secara teratur dengan sampo khusus, jaga kebersihan lingkungan, dan
          hindari kontak dengan hewan yang terinfeksi.
        </p>
        <hr />

        <h2>5. Rabies</h2>
        <h3>Gejala:</h3>
        <ul>
          <li>Perubahan perilaku (agresif atau takut air)</li>
          <li>Saliva berlebihan</li>
          <li>Lumpuh</li>
        </ul>
        <h3>Pencegahan:</h3>
        <p>
          Vaksin rabies wajib diberikan, terutama jika anjing berada di area yang rentan atau sering
          keluar rumah.
        </p>
        <hr />

        <h2>Tips Menjaga Kesehatan Anjing:</h2>
        <ul>
          <li><strong>Vaksinasi lengkap dan rutin</strong></li>
          <li><strong>Pemberian makanan bergizi dan air bersih</strong></li>
          <li><strong>Pemeriksaan kesehatan rutin ke dokter hewan</strong></li>
          <li><strong>Lingkungan yang bersih dan bebas parasit</strong></li>
          <li><strong>Aktivitas fisik dan mental yang cukup</strong></li>
        </ul>
        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Menjaga kesehatan anjing bukan hanya membuat mereka hidup lebih lama, tapi juga menjaga
          keamanan dan kesehatan lingkungan sekitar, termasuk manusia. Dengan perhatian yang tepat,
          penyakit pada anjing bisa dicegah atau ditangani sejak dini. Jangan ragu untuk
          berkonsultasi dengan dokter hewan jika anjing Anda menunjukkan gejala yang tidak biasa.
        </p>
      </div>
    </div>
  </main>
</template>
