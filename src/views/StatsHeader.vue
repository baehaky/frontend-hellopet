<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  chartType: String,
  isFullscreen: Boolean,
  startPeriod: String,
  endPeriod: String,
})

const emit = defineEmits(['toggleChartType', 'toggleFullscreen', 'exportChart'])
</script>

<template>
  <div
    class="dashboard-header p-6 bg-gradient-to-r from-blue-600 to-sky-700 text-white flex flex-wrap justify-between items-center"
  >
    <div>
      <h2 class="text-2xl font-bold">Statistik Konsultasi Dokter</h2>
      <p class="text-gray-200 text-sm mt-1">Periode: {{ startPeriod }} - {{ endPeriod }}</p>
    </div>
    <div class="flex space-x-2 mt-3 md:mt-0">
      <button
        @click="$emit('toggleChartType')"
        class="btn-control text-xs px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center transition-all text-blue-600 font-semibold"
      >
        <span class="material-icons-outlined text-sm mr-1">
          {{ chartType === 'bar' ? 'show_chart' : 'bar_chart' }}
        </span>
        {{ chartType === 'bar' ? 'Line Chart' : 'Bar Chart' }}
      </button>
      <button
        @click="$emit('exportChart')"
        class="btn-control text-xs px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center transition-all"
      >
        <span class="material-icons-outlined text-sm mr-1">download</span>
        Export
      </button>
      <button
        @click="$emit('toggleFullscreen')"
        class="btn-control text-xs px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center transition-all"
      >
        <span class="material-icons-outlined text-sm text-blue-600 font-semibold">
          {{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}
        </span>
      </button>
    </div>
  </div>
</template>
