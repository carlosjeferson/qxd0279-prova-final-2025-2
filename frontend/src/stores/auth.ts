import { defineStore } from 'pinia'
import { api } from '../services/api'
import router from '../router'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'ADMIN'

  },

  actions: {
    async login(email: string, password: string) {
      const response = await api.post('/users/login', {
        email,
        password
      })

      this.token = response.data.token
      this.user = response.data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))

      router.push('/')
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      router.push('/login')
    }
  }
})
