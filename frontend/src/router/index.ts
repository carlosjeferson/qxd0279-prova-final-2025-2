import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import ProjetosView from '../views/ProjetosView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },

    { 
      path: '/', 
      name: 'projetos', 
      component: ProjetosView, 
      meta: { requiresAuth: true } 
    },

    { 
      path: '/dashboard', 
      name: 'dashboard', 
      component: DashboardView, 
      meta: { requiresAuth: true } 
    },

    { 
      path: '/admin', 
      name: 'admin', 
      component: DashboardView, 
      meta: { requiresAuth: true, role: 'ADMIN' } 
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return '/'
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return '/'
  }
})

export default router
