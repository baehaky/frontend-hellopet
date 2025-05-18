// composables/useClock.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useClock() {
  const currentTime = ref(new Date())

  let intervalId

  onMounted(() => {
    intervalId = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

  const dayName = computed(() => daysOfWeek[currentTime.value.getDay()])

  // Helper untuk menambahkan leading zero
  const format = (val) => String(val).padStart(2, '0')

  const hours = computed(() => format(currentTime.value.getHours()))
  const minutes = computed(() => format(currentTime.value.getMinutes()))
  const seconds = computed(() => format(currentTime.value.getSeconds()))

  return {
    currentTime,
    dayName,
    hours,
    minutes,
    seconds,
  }
}
