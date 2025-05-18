<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Chart } from 'chart.js'

const props = defineProps({
  monthlyLabels: Array,
  monthlyData: Array,
  chartType: String,
  isFullscreen: Boolean,
})

const emit = defineEmits(['chartReady'])

const chartRef = ref(null)
let chartInstance = null

const getGradientColors = () => {
  if (!chartRef.value) return {}

  const ctx = chartRef.value.getContext('2d')
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400)
  gradientFill.addColorStop(0, 'rgba(65, 105, 225, 0.8)')
  gradientFill.addColorStop(1, 'rgba(65, 105, 225, 0.2)')

  return {
    backgroundColor: props.chartType === 'line' ? gradientFill : 'rgba(65, 105, 225, 0.7)',
    borderColor: 'rgba(65, 105, 225, 1)',
    hoverBackgroundColor: 'rgba(65, 105, 225, 0.9)',
    hoverBorderColor: 'rgba(65, 105, 225, 1)',
  }
}

const initOrUpdateChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartRef.value.getContext('2d')
  const colors = getGradientColors()

  chartInstance = new Chart(ctx, {
    type: props.chartType,
    data: {
      labels: props.monthlyLabels,
      datasets: [
        {
          label: 'Konsultasi',
          data: props.monthlyData,
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 2,
          hoverBackgroundColor: colors.hoverBackgroundColor,
          hoverBorderColor: colors.hoverBorderColor,
          tension: 0.4,
          fill: props.chartType === 'line',
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
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: { family: "'Poppins', sans-serif", size: 14 },
          bodyFont: { family: "'Poppins', sans-serif", size: 13 },
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} konsultasi`
            },
          },
        },
      },
      animation: { duration: 1500, easing: 'easeOutQuart' },
      interaction: { intersect: false, mode: 'index' },
    },
  })

  emit('chartReady', chartInstance)
}

watch(
  () => [props.monthlyLabels, props.monthlyData, props.chartType],
  () => {
    if (props.monthlyLabels?.length > 0) {
      initOrUpdateChart()
    }
  },
  { immediate: true },
)

onMounted(() => {
  initOrUpdateChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

function exportChart() {
  if (!chartRef.value) return

  const link = document.createElement('a')
  link.href = chartRef.value.toDataURL('image/png')
  link.download = `statistik-konsultasi-${new Date().toISOString().split('T')[0]}.png`
  link.click()
}
</script>

<template>
  <div class="chart-container relative" :style="{ height: isFullscreen ? '70vh' : '400px' }">
    <canvas ref="chartRef" class="w-full h-full"></canvas>
  </div>
</template>
