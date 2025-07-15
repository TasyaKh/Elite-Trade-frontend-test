import OrdersPage from '@/pages/OrdersPage/OrdersPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersPage,
    },
  ],
})

export default router
