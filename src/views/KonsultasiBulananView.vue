<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useDokterStore } from '@/stores/dokter'
import { useAuthStore } from '@/stores/auth'

Chart.register(...registerables)

const chartRef = ref(null)
const chartTypeRef = ref('bar')
const isFullscreen = ref(false)
const authStore = useAuthStore()
let chartInstance = null

const doctorId = authStore.user.id
const statisticsStore = useDokterStore()

const totalConsultations = computed(() => {
  if (!statisticsStore.monthlyData.data) return 0
  return statisticsStore.monthlyData.data.reduce((total, count) => total + count, 0)
})

const avgConsultationsPerMonth = computed(() => {
  if (!statisticsStore.monthlyData.data || statisticsStore.monthlyData.data.length === 0) return 0
  return (totalConsultations.value / statisticsStore.monthlyData.data.length).toFixed(1)
})

const mostActiveMonth = computed(() => {
  if (!statisticsStore.monthlyData.data || statisticsStore.monthlyData.data.length === 0)
    return 'Tidak ada data'
  const maxIndex = statisticsStore.monthlyData.data.indexOf(
    Math.max(...statisticsStore.monthlyData.data),
  )
  return statisticsStore.monthlyData.labels[maxIndex] || 'Tidak ada data'
})

// Chart colors based on data values
const getGradientColors = () => {
  if (!chartRef.value) return []

  const ctx = chartRef.value.getContext('2d')
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400)
  gradientFill.addColorStop(0, 'rgba(65, 105, 225, 0.8)')
  gradientFill.addColorStop(1, 'rgba(65, 105, 225, 0.2)')

  return {
    backgroundColor: chartTypeRef.value === 'line' ? gradientFill : 'rgba(65, 105, 225, 0.7)',
    borderColor: 'rgba(65, 105, 225, 1)',
    hoverBackgroundColor: 'rgba(65, 105, 225, 0.9)',
    hoverBorderColor: 'rgba(65, 105, 225, 1)',
  }
}

// Chart initialization and update
function initOrUpdateChart() {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartRef.value.getContext('2d')
  const colors = getGradientColors()

  chartInstance = new Chart(ctx, {
    type: chartTypeRef.value,
    data: {
      labels: statisticsStore.monthlyData.labels,
      datasets: [
        {
          label: 'Konsultasi',
          data: statisticsStore.monthlyData.data,
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 2,
          hoverBackgroundColor: colors.hoverBackgroundColor,
          hoverBorderColor: colors.hoverBorderColor,
          tension: 0.4,
          fill: chartTypeRef.value === 'line',
          pointBackgroundColor: 'rgba(65, 105, 225, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            font: {
              family: "'Poppins', sans-serif",
              size: 12,
            },
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.2)',
          },
        },
        x: {
          ticks: {
            font: {
              family: "'Poppins', sans-serif",
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            family: "'Poppins', sans-serif",
            size: 14,
          },
          bodyFont: {
            family: "'Poppins', sans-serif",
            size: 13,
          },
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} konsultasi`
            },
          },
        },
      },
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
  })
}

function exportChart() {
  if (!chartRef.value) return

  const link = document.createElement('a')
  link.href = chartRef.value.toDataURL('image/png')
  link.download = `statistik-konsultasi-${new Date().toISOString().split('T')[0]}.png`
  link.click()
}

onMounted(() => {
  statisticsStore.fetchMonthlyConversations(doctorId)
})

watchEffect(() => {
  if (
    statisticsStore.monthlyData.labels?.length > 0 &&
    !statisticsStore.loading &&
    !statisticsStore.error
  ) {
    initOrUpdateChart()
  }
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<template>
  <section class="py-10">
    <div
      :class="[
        'dashboard-container max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white',
        { fullscreen: isFullscreen },
      ]"
    >
      <div
        class="dashboard-header p-6 bg-gradient-to-r from-blue-600 to-sky-700 text-white flex flex-wrap justify-between items-center"
      >
        <div>
          <h2 class="text-2xl font-bold">Statistik Konsultasi Dokter</h2>
          <p class="text-gray-200 text-sm mt-1">
            Periode: {{ statisticsStore.monthlyData.labels?.[0] }} -
            {{
              statisticsStore.monthlyData.labels?.[statisticsStore.monthlyData.labels.length - 1]
            }}
          </p>
        </div>
        <div class="flex space-x-2 mt-3 md:mt-0">
          <button
            @click="exportChart"
            class="btn-control text-xs px-3 py-2 bg-white text-blue-600 font-semibold bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center transition-all"
          >
            <span class="material-icons-outlined text-sm">Export Image</span>
          </button>
        </div>
      </div>

      <div class="dashboard-content p-6">
        <div v-if="statisticsStore.loading" class="flex flex-col items-center justify-center h-64">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          ></div>
          <p class="mt-4 text-gray-500 font-medium">Memuat data konsultasi...</p>
        </div>

        <div
          v-else-if="statisticsStore.error"
          class="bg-red-50 border-l-4 border-red-500 p-4 rounded"
        >
          <div class="flex">
            <span class="material-icons-outlined text-red-500 mr-3">error_outline</span>
            <p class="text-red-700">{{ statisticsStore.error }}</p>
          </div>
          <button
            @click="statisticsStore.fetchMonthlyConversations(doctorId)"
            class="mt-3 text-sm text-red-700 hover:text-red-900 underline flex items-center"
          >
            <span class="material-icons-outlined text-sm mr-1">refresh</span>
            Coba lagi
          </button>
        </div>

        <div v-else>
          <!-- Analytics cards -->
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

          <div
            class="chart-container relative"
            :style="{ height: isFullscreen ? '70vh' : '400px' }"
          >
            <canvas ref="chartRef" class="w-full h-full"></canvas>
          </div>

          <div class="mt-4 text-sm text-gray-500 text-center">
            * Data menunjukkan jumlah konsultasi yang Anda tangani setiap bulannya
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-container {
  transition: all 0.3s ease;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  border-radius: 0;
}

.btn-control {
  transition: all 0.2s ease;
}

.btn-control:hover {
  transform: translateY(-1px);
}

.chart-container {
  transition: height 0.3s ease;
}

/* Menambahkan animasi untuk loading */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dashboard-content {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
