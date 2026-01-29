<template>
  <div>
    <h1>Dashboard</h1>
    
    <div v-if="!loading">
      <div v-if="auth.user?.role === 'ADMIN'">
        <h2>Total de Projetos Cadastrados: {{ totalProjetos }}</h2>
      </div>

      <h2>Seus Projetos</h2>

      <div v-if="userProjetos.length">
        <ul>
          <li v-for="p in userProjetos" :key="p.id">
            {{ p.titulo }}
          </li>
        </ul>
      </div>

      <div v-else>
        <p>Nenhum projeto encontrado.</p>
      </div>
    </div>

    <div v-else>
      <p>Carregando dados do dashboard...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'

const auth = useAuthStore()

const loading = ref(true)
const totalProjetos = ref<number | null>(null)
const userProjetos = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await api.get('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    userProjetos.value = res.data.userProjetos || []
    totalProjetos.value = res.data.totalProjetos ?? null
  } catch (error) {
    console.error('Erro ao carregar dashboard', error)
  } finally {
    loading.value = false
  }
})
</script>
