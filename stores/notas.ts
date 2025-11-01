import { defineStore } from 'pinia'

export interface Nota {
  id: string
  titulo: string
  contenido: string
  fecha: string
}

const DB_NAME = 'NotasRapidasDB'
const DB_VERSION = 1
const STORE_NAME = 'notas'

class IndexedDBHelper {
  private dbPromise: Promise<IDBDatabase> | null = null

  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })

    return this.dbPromise
  }

  async getAll(): Promise<Nota[]> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.getAll()

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error al cargar notas de IndexedDB:', error)
      return []
    }
  }

  async add(nota: Nota): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.add(nota)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error al agregar nota a IndexedDB:', error)
      throw error
    }
  }

  async update(nota: Nota): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(nota)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error al actualizar nota en IndexedDB:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(id)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error al eliminar nota de IndexedDB:', error)
      throw error
    }
  }
}

const dbHelper = new IndexedDBHelper()

export const useNotasStore = defineStore('notas', {
  state: () => ({
    notas: [] as Nota[],
    cargando: false
  }),

  getters: {
    notasOrdenadas: (state) => {
      return [...state.notas].sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      )
    },
    
    obtenerNotaPorId: (state) => {
      return (id: string) => state.notas.find(nota => nota.id === id)
    }
  },

  actions: {
    async cargarNotas() {
      this.cargando = true
      try {
        this.notas = await dbHelper.getAll()
      } catch (error) {
        console.error('Error al cargar notas:', error)
      } finally {
        this.cargando = false
      }
    },

    async crearNota(titulo: string, contenido: string) {
      const nuevaNota: Nota = {
        id: Date.now().toString(),
        titulo,
        contenido,
        fecha: new Date().toISOString()
      }

      try {
        await dbHelper.add(nuevaNota)
        this.notas.push(nuevaNota)
      } catch (error) {
        console.error('Error al crear nota:', error)
        throw error
      }
    },

    async actualizarNota(id: string, titulo: string, contenido: string) {
      const notaIndex = this.notas.findIndex(n => n.id === id)
      if (notaIndex === -1) {
        throw new Error('Nota no encontrada')
      }

      const notaActualizada: Nota = {
        ...this.notas[notaIndex],
        titulo,
        contenido,
        fecha: new Date().toISOString()
      }

      try {
        await dbHelper.update(notaActualizada)
        this.notas[notaIndex] = notaActualizada
      } catch (error) {
        console.error('Error al actualizar nota:', error)
        throw error
      }
    },

    async eliminarNota(id: string) {
      try {
        await dbHelper.delete(id)
        this.notas = this.notas.filter(n => n.id !== id)
      } catch (error) {
        console.error('Error al eliminar nota:', error)
        throw error
      }
    }
  }
})
