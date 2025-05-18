import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import JadwalDokter from '@/views/JadwalDokterView.vue'
import InformasiHewan from '@/views/InformasiHewanView.vue'
import DokterFavorite from '@/views/DokterFavoriteView.vue'
import TentangkamiView from '@/views/TentangkamiView.vue'
import ArticleView from '@/views/ArticleView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'tentang-kami',
          name: 'tentang-kami',
          component: TentangkamiView,
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView,
        },
        {
          path: 'jadwal-dokter',
          name: 'jadwaldokter',
          component: JadwalDokter,
          meta: { requiresAuth: true, role: 'user' },
        },
        {
          path: 'chat/:id',
          name: 'chat',
          component: () => import('@/views/ChatView.vue'),
          meta: { requiresAuth: true, role: 'user' },
        },
        {
          path: 'informasi',
          name: 'informasi',
          component: InformasiHewan,
        },
        {
          path: 'informasi/:id',
          name: 'informasi-detail',
          component: ArticleView,
        },
        {
          path: 'dokter-favorite',
          name: 'dokter-favorite',
          component: DokterFavorite,
          meta: { requiresAuth: true, role: 'user' },
        },
        {
          path: 'listgrooming',
          name: 'listgrooming',
          component: () => import('../components/ListGrooming.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404NotFound.vue'),
    },
    {
      path: '/dokter-login',
      name: 'dokter-login',
      component: () => import('../views/LoginDokterView.vue'),
    },
    {
      path: '/partner-login',
      name: 'partner-login',
      component: LoginView,
    },
    {
      path: '/dokter/dashboard/:dokterId',
      component: () => import('@/layout/DashboardLayoutDoctor.vue'),
      meta: { requiresAuth: true, role: 'dokter' },
      children: [
        {
          path: '',
          name: 'dashboard-dokter',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'konsultasi-bulanan',
          name: 'konsultasi-bulanan',
          component: () => import('@/views/KonsultasiBulananView.vue'),
        },
        {
          path: 'profit-bulan',
          name: 'profit-bulan',
          component: () => import('@/views/ProfitBulanView.vue'),
        },
        {
          path: 'chat/:id',
          name: 'chat-dokter',
          component: () => import('@/views/ChatDokterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
