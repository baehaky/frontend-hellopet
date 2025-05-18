<template>
  <section class="py-5">
    <div class="max-w-4xl bg-white mx-auto rounded-xl shadow-lg overflow-hidden">
      <div v-if="dokterStore.loading" class="flex flex-col items-center justify-center h-64">
        <div
          class="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-600 font-medium">Loading profit data...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="errorMessage"
        class="flex flex-col items-center justify-center h-64 text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="font-medium mb-2">{{ errorMessage }}</p>
        <button
          @click="loadProfitData"
          class="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Retry
        </button>
      </div>

      <!-- Success State -->
      <div v-else class="flex flex-col h-full">
        <div class="mb-8 bg-gradient-to-r p-5 from-blue-600 to-sky-700">
          <h2 class="text-center text-white text-2xl font-bold mb-2">Monthly Profit Dashboard</h2>
          <p class="text-center text-gray-200 text-lg font-medium">
            {{ dokterStore.profitData.year }}
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 px-5 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-blue-100 rounded-xl p-5 shadow-sm">
            <h3 class="text-sm text-blue-900 font-medium mb-2">Total Annual Profit</h3>
            <p class="text-lg font-bold text-blue-900">{{ formatCurrency(totalProfit) }}</p>
          </div>
          <div class="bg-blue-100 rounded-xl p-5 shadow-sm">
            <h3 class="text-sm text-blue-900 font-medium mb-2">Highest Month</h3>
            <p class="text-lg font-semibold text-blue-900">
              {{ highestMonth }}:
              <span class="text-blue-900 font-bold">{{ formatCurrency(highestProfit) }}</span>
            </p>
          </div>
          <div class="bg-blue-100 rounded-xl p-5 shadow-sm">
            <h3 class="text-sm text-blue-900 font-medium mb-2">Average Monthly</h3>
            <p class="text-lg font-bold text-blue-900">{{ formatCurrency(averageProfit) }}</p>
          </div>
        </div>

        <!-- Chart Container -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 class="text-center text-gray-700 font-medium mb-4">Monthly Profit Trend</h3>
          <div class="h-80">
            <canvas ref="chartCanvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useDokterStore } from '@/stores/dokter'
Chart.register(...registerables)

const dokterStore = useDokterStore()
const chartCanvas = ref(null)
const errorMessage = ref(null)
let chart = null

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

const getGradientColors = () => {
  const ctx = chartCanvas.value.getContext('2d')
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 300)
  gradientFill.addColorStop(0, 'rgba(59, 130, 246, 0.6)') // Blue-500
  gradientFill.addColorStop(1, 'rgba(59, 130, 246, 0.1)')

  return {
    backgroundColor: gradientFill,
    borderColor: 'rgba(37, 99, 235, 1)', // Blue-600
    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
  }
}

// Chart creator
const createChart = () => {
  if (chart) chart.destroy()

  const ctx = chartCanvas.value.getContext('2d')
  const colors = getGradientColors()

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dokterStore.profitData.items.map((item) => item.month),
      datasets: [
        {
          label: 'Profit',
          data: dokterStore.profitData.items.map((item) => item.profit),
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 2,
          pointBackgroundColor: colors.pointBackgroundColor,
          pointBorderColor: colors.pointBorderColor,
          pointHoverBackgroundColor: colors.pointHoverBackgroundColor,
          pointHoverBorderColor: colors.pointHoverBorderColor,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3,
          fill: true,
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
            callback: function (value) {
              return formatCurrency(value).replace('Rp', '')
            },
            font: {
              family: "'Poppins', sans-serif",
              size: 12,
            },
            color: '#64748b',
          },
          grid: {
            color: 'rgba(226, 232, 240, 0.6)',
          },
          border: {
            dash: [4, 4],
          },
        },
        x: {
          ticks: {
            font: {
              family: "'Poppins', sans-serif",
              size: 12,
            },
            color: '#64748b',
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
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          titleFont: {
            family: "'Poppins', sans-serif",
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            family: "'Poppins', sans-serif",
            size: 13,
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function (context) {
              return `Profit: ${formatCurrency(context.parsed.y)}`
            },
          },
          usePointStyle: true,
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
  })
}

// Computed Profit Stats
const totalProfit = computed(() => {
  return dokterStore.profitData.items.reduce((sum, item) => sum + item.profit, 0)
})

const averageProfit = computed(() => {
  return dokterStore.profitData.items.length
    ? totalProfit.value / dokterStore.profitData.items.length
    : 0
})

const highestProfit = computed(() => {
  return dokterStore.profitData.items.length
    ? Math.max(...dokterStore.profitData.items.map((item) => item.profit))
    : 0
})

const highestMonth = computed(() => {
  if (!dokterStore.profitData.items.length) return 'N/A'
  const maxProfit = highestProfit.value
  const monthItem = dokterStore.profitData.items.find((item) => item.profit === maxProfit)
  return monthItem?.month || 'N/A'
})

const loadProfitData = async () => {
  try {
    const res = await dokterStore.fetchMonthlyProfit()
    if (!res.success) {
      errorMessage.value = res.message || 'Failed to load profit data'
    } else {
      errorMessage.value = null
      setTimeout(() => createChart(), 100)
    }
  } catch (err) {
    errorMessage.value = 'Unexpected error loading data'
    console.error(err)
  }
}

onMounted(() => {
  loadProfitData()
})
</script>
