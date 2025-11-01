<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div v-if="!nota" class="text-center py-12">
        <p class="text-gray-600">Nota no encontrada</p>
        <button 
          @click="router.push('/')"
          class="mt-4 text-primary-500 hover:text-primary-600 font-medium"
        >
          Volver a inicio
        </button>
      </div>

      <div v-else class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Editar Nota</h1>
        
        <form @submit.prevent="guardarCambios" class="space-y-4">
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
              {{ guardando ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
            <button
              type="button"
              @click="confirmarEliminar"
              :disabled="guardando"
              class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
            >
              Eliminar
            </button>
          </div>

          <button
            type="button"
            @click="cancelar"
            :disabled="guardando"
            class="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <div 
      v-if="mostrarDialogoEliminar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="cerrarDialogoEliminar"
    >
      <div 
        @click.stop
        class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          ¿Eliminar nota?
        </h3>
        <p class="text-gray-600 mb-6">
          ¿Estás seguro que quieres eliminar esta nota? Esta acción no se puede deshacer.
        </p>
        <div class="flex gap-3">
          <button
            @click="eliminarNota"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Eliminar
          </button>
          <button
            @click="cerrarDialogoEliminar"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotasStore } from '~/stores/notas'

const notasStore = useNotasStore()
const router = useRouter()
const route = useRoute()

const titulo = ref('')
const contenido = ref('')
const guardando = ref(false)
const mostrarDialogoEliminar = ref(false)

const notaId = computed(() => route.params.id as string)
const nota = computed(() => notasStore.obtenerNotaPorId(notaId.value))

onMounted(async () => {
  await notasStore.cargarNotas()
  
  if (nota.value) {
    titulo.value = nota.value.titulo
    contenido.value = nota.value.contenido
  }
})

const guardarCambios = async () => {
  if (!titulo.value.trim() || !contenido.value.trim()) {
    return
  }

  guardando.value = true
  try {
    await notasStore.actualizarNota(notaId.value, titulo.value.trim(), contenido.value.trim())
    router.push('/')
  } catch (error) {
    console.error('Error al actualizar la nota:', error)
    alert('Error al guardar los cambios. Por favor, intenta de nuevo.')
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = () => {
  mostrarDialogoEliminar.value = true
}

const cerrarDialogoEliminar = () => {
  mostrarDialogoEliminar.value = false
}

const eliminarNota = async () => {
  try {
    await notasStore.eliminarNota(notaId.value)
    router.push('/')
  } catch (error) {
    console.error('Error al eliminar la nota:', error)
    alert('Error al eliminar la nota. Por favor, intenta de nuevo.')
  }
}

const cancelar = () => {
  router.push('/')
}
</script>
