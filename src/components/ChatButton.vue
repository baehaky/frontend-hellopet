<script setup>
import { usePaymentStore } from '@/stores/payment'

const props = defineProps({
  doctor: Object,
})

const paymentStore = usePaymentStore()

const payNow = () => {
  paymentStore.payConsultation(props.doctor.id)
}
</script>

<template>
  <button
    @click="payNow"
    class="py-2.5 bg-pink-400 px-5 rounded-md text-white w-full hover:bg-pink-500 transition-colors"
  >
    Pesan Dokter
  </button>
</template>
