<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div v-if="notasStore.cargando" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Cargando notas...</p>
      </div>

      <div v-else-if="notasStore.notasOrdenadas.length === 0" class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 class="mt-4 text-xl font-semibold text-gray-700">No hay notas aún</h2>
        <p class="mt-2 text-gray-500">Presiona el botón + para crear tu primera nota</p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="nota in notasStore.notasOrdenadas" 
          :key="nota.id"
          @click="abrirNota(nota.id)"
          class="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-200"
        >
          <h3 class="font-semibold text-lg text-gray-900 mb-1 truncate">
            {{ nota.titulo || 'Sin título' }}
          </h3>
          <p class="text-gray-600 text-sm mb-2 line-clamp-2">
            {{ nota.contenido || 'Sin contenido' }}
          </p>
          <p class="text-xs text-gray-400">
            {{ formatearFecha(nota.fecha) }}
          </p>
        </div>
      </div>
    </div>

    <button 
      @click="crearNuevaNota"
      class="fixed bottom-6 right-6 w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      aria-label="Crear nueva nota"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNotasStore } from '~/stores/notas'

const notasStore = useNotasStore()
const router = useRouter()

onMounted(async () => {
  await notasStore.cargarNotas()
})

const crearNuevaNota = () => {
  router.push('/nota/nueva')
}

const abrirNota = (id: string) => {
  router.push(`/nota/${id}`)
}

const formatearFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO)
  const ahora = new Date()
  const diff = ahora.getTime() - fecha.getTime()
  
  const minutos = Math.floor(diff / 60000)
  const horas = Math.floor(diff / 3600000)
  const dias = Math.floor(diff / 86400000)
  
  if (minutos < 1) return 'Justo ahora'
  if (minutos < 60) return `Hace ${minutos} min`
  if (horas < 24) return `Hace ${horas} h`
  if (dias < 7) return `Hace ${dias} d`
  
  return fecha.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
