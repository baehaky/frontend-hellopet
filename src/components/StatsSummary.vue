<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  totalConsultations: Number,
  avgConsultationsPerMonth: [Number, String],
  mostActiveMonth: String,
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-blue-50 rounded-lg p-4 shadow-sm">
      <div class="text-blue-900 text-sm font-medium mb-1">Total Konsultasi</div>
      <div class="text-2xl font-bold text-blue-800">{{ totalConsultations }}</div>
    </div>

    <div class="bg-indigo-50 rounded-lg p-4 shadow-sm">
      <div class="text-indigo-900 text-sm font-medium mb-1">Rata-rata per Bulan</div>
      <div class="text-2xl font-bold text-indigo-800">{{ avgConsultationsPerMonth }}</div>
    </div>

    <div class="bg-purple-50 rounded-lg p-4 shadow-sm">
      <div class="text-purple-900 text-sm font-medium mb-1">Bulan Tersibuk</div>
      <div class="text-2xl font-bold text-purple-800">{{ mostActiveMonth }}</div>
    </div>
  </div>
</template>
