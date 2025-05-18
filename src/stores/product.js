import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)

  const dummyProducts = [
    {
      id: 1,
      name: 'Drh. Bima Setiawan',
      experience: '6',
      price: '60.000',
      rate: '95%',
      image: 'headphones.jpg',
    },
    {
      id: 2,
      name: 'Drh. Bima Setiawan',
      experience: '6',
      price: '60.000',
      rate: '95%',
      image: 'headphones.jpg',
    },
    {
      id: 3,
      name: 'Drh. Bima Setiawan',
      experience: '6',
      price: '60.000',
      rate: '95%',
      image: 'headphones.jpg',
    },
    {
      id: 4,
      name: 'Drh. Bima Setiawan',
      experience: '6',
      price: '60.000',
      rate: '95%',
      image: 'headphones.jpg',
    },
  ]

  const fetchProducts = async () => {
    loading.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      products.value = dummyProducts
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    fetchProducts,
  }
})
