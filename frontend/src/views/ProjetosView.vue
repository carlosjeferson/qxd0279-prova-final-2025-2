<template>
  <div>
    <h1>Projetos</h1>

    <div v-if="projetos.length">
      <ProjetoCard
        v-for="p in projetos"
        :key="p.id"
        :projeto="p"
      />
    </div>

    <div v-else>
      <p>Nenhum projeto encontrado.</p>
    </div>

    <div style="margin-top: 20px;">
      <button @click="paginaAnterior" :disabled="page === 1">
        Anterior
      </button>

      <span style="margin: 0 10px;">
        Página {{ page }} de {{ totalPages }}
      </span>

      <button @click="proximaPagina" :disabled="page === totalPages">
        Próxima
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useProjetosService } from '@/services/projetosService'
import ProjetoCard from '@/components/ProjetoCard.vue'

const projetos = ref<any[]>([])
const page = ref(1)
const totalPages = ref(1)

const projetosService = useProjetosService()

async function carregarProjetos() {
  try {
    const res = await projetosService.getAll(page.value)

    projetos.value = res.data.data
    totalPages.value = res.data.meta.totalPages
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
  }
}

function proximaPagina() {
  if (page.value < totalPages.value) {
    page.value++
  }
}

function paginaAnterior() {
  if (page.value > 1) {
    page.value--
  }
}

// sempre que mudar a página → recarrega
watch(page, carregarProjetos)

onMounted(carregarProjetos)
</script>
