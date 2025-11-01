<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-primary-500 text-white shadow-md sticky top-0 z-40">
      <div class="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h1 class="text-xl font-bold">Notas Rápidas</h1>
        </div>
        <button 
          v-if="route.path !== '/'"
          @click="volverInicio"
          class="text-white hover:text-gray-200 transition-colors"
          aria-label="Volver a inicio"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const volverInicio = () => {
  router.push('/')
}
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  overscroll-behavior-y: contain;
}
</style>
