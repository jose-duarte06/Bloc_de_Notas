<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Nueva Nota</h1>
        
        <form @submit.prevent="guardarNota" class="space-y-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              id="titulo"
              v-model="titulo"
              type="text"
              placeholder="Escribe un título..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-base"
              required
            />
          </div>

          <div>
            <label for="contenido" class="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              id="contenido"
              v-model="contenido"
              rows="12"
              placeholder="Escribe tu nota aquí..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none text-base"
              required
            ></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              :disabled="guardando"
              class="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
            >
              {{ guardando ? 'Guardando...' : 'Guardar Nota' }}
            </button>
            <button
              type="button"
              @click="cancelar"
              :disabled="guardando"
              class="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotasStore } from '~/stores/notas'

const notasStore = useNotasStore()
const router = useRouter()

const titulo = ref('')
const contenido = ref('')
const guardando = ref(false)

const guardarNota = async () => {
  if (!titulo.value.trim() || !contenido.value.trim()) {
    return
  }

  guardando.value = true
  try {
    await notasStore.crearNota(titulo.value.trim(), contenido.value.trim())
    router.push('/')
  } catch (error) {
    console.error('Error al guardar la nota:', error)
    alert('Error al guardar la nota. Por favor, intenta de nuevo.')
  } finally {
    guardando.value = false
  }
}

const cancelar = () => {
  router.push('/')
}
</script>
