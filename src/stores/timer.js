import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const TIMER_STORAGE_KEY = 'chat_timer_data'
  const SESSION_ID_KEY = 'chat_session_id'

  const getSavedTimerData = () => {
    try {
      const savedData = localStorage.getItem(TIMER_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        if (parsedData.endTime > Date.now()) {
          return Math.ceil((parsedData.endTime - Date.now()) / 1000)
        }
      }
    } catch (error) {
      console.error('Error loading timer data:', error)
    }
    return 0
  }

  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem(SESSION_ID_KEY)
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem(SESSION_ID_KEY, sessionId)
    }
    return sessionId
  }

  const sessionId = ref(getOrCreateSessionId())
  const timeLeft = ref(getSavedTimerData())
  const timerInterval = ref(null)
  const callback = ref(null)
  const endTime = ref(0)
  const isInitialized = ref(false)

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const saveTimerData = () => {
    try {
      localStorage.setItem(
        TIMER_STORAGE_KEY,
        JSON.stringify({
          timeLeft: timeLeft.value,
          endTime: endTime.value,
          sessionId: sessionId.value,
        }),
      )
    } catch (error) {
      console.error('Error saving timer data:', error)
    }
  }

  watch(timeLeft, (newValue) => {
    if (isInitialized.value) {
      saveTimerData()
    }
  })

  const startTimer = (duration, onComplete) => {
    if (timeLeft.value <= 0) {
      timeLeft.value = duration
      endTime.value = Date.now() + duration * 1000
    } else {
      endTime.value = Date.now() + timeLeft.value * 1000
    }

    callback.value = onComplete
    isInitialized.value = true
    saveTimerData()

    clearTimer()

    timerInterval.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
        saveTimerData()
      } else {
        clearTimer()
        localStorage.removeItem(TIMER_STORAGE_KEY)
        if (callback.value) {
          callback.value()
        }
      }
    }, 1000)
  }

  const clearTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  const resetTimer = (duration) => {
    timeLeft.value = duration
    endTime.value = Date.now() + duration * 1000
    saveTimerData()
  }

  const pauseTimer = () => {
    clearTimer()
  }

  const resumeTimer = () => {
    if (!timerInterval.value && timeLeft.value > 0) {
      startTimer(timeLeft.value, callback.value)
    }
  }

  const resetSession = () => {
    sessionId.value = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(SESSION_ID_KEY, sessionId.value)
    localStorage.removeItem(TIMER_STORAGE_KEY)
    timeLeft.value = 0
  }

  return {
    timeLeft,
    formattedTime,
    startTimer,
    clearTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
    resetSession,
  }
})
