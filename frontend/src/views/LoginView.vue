<template>
  <form @submit.prevent="handleLogin">
    <h1>Login</h1>

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />

    <button type="submit">Entrar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)
  } catch {
    alert('Email ou senha inválidos')
  }
}
</script>
