import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import JadwalDokter from '@/views/JadwalDokterView.vue'
import InformasiHewan from '@/views/InformasiHewanView.vue'
import DokterFavorite from '@/views/DokterFavoriteView.vue'
import TentangkamiView from '@/views/TentangkamiView.vue'
import ArticleView from '@/views/ArticleView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tentang-kami',
      name: 'tentang-kami',
      component: TentangkamiView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404NotFound.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/jadwal-dokter',
      name: 'jadwaldokter',
      component: JadwalDokter,
    },
    {
      path: '/informasi',
      name: 'informasi',
      component: InformasiHewan,
    },
    {
      path: '/informasi/:id',
      name: 'informasi-detail',
      component: ArticleView,
    },
    {
      path: '/dokter-favorite',
      name: 'dokter-favorite',
      component: DokterFavorite,
    },
  ],
})

export default router
