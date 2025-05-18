<script setup>
import { ref, onMounted } from 'vue'
import { useDokterStore } from '@/stores/dokter'
import { useClock } from '@/composables/useClock'
import { BriefcaseIcon, StarIcon, BanknotesIcon, ClockIcon } from '@heroicons/vue/24/outline'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Card, CardContent } from './ui/card'
import ChatButton from './ChatButton.vue'

const userStore = useDokterStore()
const users = ref([])
const loading = ref(true)

const fetchUsers = async () => {
  loading.value = true
  await userStore.fetchUsers()
  users.value = userStore.users
  loading.value = false
}

onMounted(fetchUsers)

const { dayName, hours, minutes, seconds } = useClock()
</script>

<template>
  <div class="flex items-center justify-center flex-col space-y-3">
    <h1 class="text-white text-3xl font-semibold font-mono">Jadwal Dokter</h1>
    <p
      class="inline-flex items-center text-lg font-semibold bg-[#FCFF82] p-2 rounded-md text-[#16BDCA]"
    >
      {{ dayName }} {{ hours }} : {{ minutes }} : {{ seconds }}
    </p>
    <div class="text-center text-white font-semibold animate-pulse" v-if="loading">
      Memuat data dokter...
    </div>

    <Carousel v-else class="relative w-full max-w-3xl" :opts="{ align: 'start' }">
      <CarouselContent>
        <CarouselItem v-for="user in users" :key="user.id" class="md:basis-1/2 lg:basis-1/3">
          <Card class="shadow-md hover:shadow-lg transition-shadow">
            <CardContent class="flex flex-col items-center justify-center space-y-2">
              <img
                :src="user.picture || 'https://via.placeholder.com/100'"
                :alt="user.username"
                class="w-24 h-24 object-cover rounded-full"
              />
              <h1 class="text-lg font-semibold text-center">{{ user.username }}</h1>
              <div class="grid grid-cols-2 gap-2 p-3 text-xs">
                <div class="flex items-center gap-2">
                  <BriefcaseIcon class="w-5" />
                  <p>{{ user.workExperience }} Tahun</p>
                </div>
                <div class="flex items-center gap-2">
                  <BanknotesIcon class="w-5" />
                  <p>Rp{{ user.price }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <StarIcon class="w-5" />
                  <p>{{ user.rate ?? 0 }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <ClockIcon class="w-5" />
                  <p>30 Menit</p>
                </div>
              </div>
              <!-- Replace the button with our ChatButton component -->
              <ChatButton :doctor="user" />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
