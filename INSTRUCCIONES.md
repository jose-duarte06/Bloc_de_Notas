# 📱 Notas Rápidas - PWA de Notas

## 📋 Descripción
Aplicación Progressive Web App (PWA) para tomar notas rápidas de forma offline usando Vue.js con Nuxt.js 3.

## ⚙️ Stack Tecnológico
- **Nuxt 3** (Vue 3 con Composition API)
- **Pinia** para manejo de estado
- **Tailwind CSS** para estilos responsive mobile-first
- **IndexedDB** para persistencia local sin backend
- **Service Worker** personalizado para cache offline
- **Manifest.webmanifest** para instalabilidad PWA

## 🚀 Instalación

### Paso 1: Clonar el repositorio
```bash
git clone <url-del-repo>
cd notas-rapidas
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Iniciar servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

## 🧪 Cómo probar el modo offline

### ⚠️ IMPORTANTE - Preparación para prueba offline:
Para que la app funcione completamente offline, primero debes **navegar por todas las páginas con conexión** para que el Service Worker las cachee:

1. Abre la app con conexión a internet
2. Navega a la página principal (`/`)
3. Crea al menos una nota de prueba
4. Haz clic en la nota para abrir la página de edición (`/nota/[id]`)
5. Vuelve a la página principal
6. Navega a "Nueva nota" (`/nota/nueva`)
7. **Ahora** todas las páginas están cacheadas y la app funcionará offline

### En Chrome/Edge:
1. Abre la aplicación en `http://localhost:5000`
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Application**
4. En el menú lateral, selecciona **Service Workers**
5. Verás el Service Worker registrado para el origen
6. **IMPORTANTE**: Navega por todas las páginas (/, /nota/nueva, edita una nota)
7. Activa el checkbox **Offline** en la sección Service Workers
8. Recarga la página - ¡la app seguirá funcionando!
9. Puedes crear, editar y eliminar notas sin conexión

### En Firefox:
1. Abre la aplicación
2. Presiona `F12` para abrir DevTools
3. **IMPORTANTE**: Navega por todas las páginas primero
4. Ve a **Network** y selecciona **Offline** en el throttling
5. La app seguirá funcionando completamente

### Verificar que el Service Worker está activo:
```
DevTools > Application > Service Workers
```
Deberías ver: `Status: activated and is running`

## 📱 Cómo instalar la PWA en móvil

### Android (Chrome):
1. Abre la app en Chrome móvil
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar app"**
4. Confirma la instalación
5. La app aparecerá en tu pantalla de inicio como una app nativa
6. Al abrirla, se ejecutará en modo standalone (sin barra del navegador)

### iOS (Safari):
1. Abre la app en Safari
2. Toca el botón de compartir (cuadrado con flecha hacia arriba)
3. Desplázate y toca **"Agregar a pantalla de inicio"**
4. Asigna un nombre y confirma
5. La app aparecerá en tu pantalla de inicio

## 📂 Estructura del Proyecto

```
.
├── app.vue                      # Layout principal con header
├── pages/
│   ├── index.vue               # Lista de notas
│   └── nota/
│       ├── nueva.vue           # Crear nota
│       └── [id].vue            # Editar/eliminar nota
├── stores/
│   └── notas.ts                # Pinia store con IndexedDB
├── plugins/
│   └── register-sw.client.ts   # Registro del Service Worker
├── public/
│   ├── sw.js                   # Service Worker
│   ├── manifest.webmanifest    # Manifest PWA
│   ├── favicon.ico             # Favicon
│   └── icons/
│       ├── icon-192x192.png    # Icono 192x192
│       └── icon-512x512.png    # Icono 512x512
├── nuxt.config.ts              # Configuración de Nuxt
├── tailwind.config.js          # Configuración de Tailwind
└── tsconfig.json               # Configuración de TypeScript
```

## ✨ Funcionalidades

### ✅ Implementadas:
- [x] **Crear notas** con título y contenido
- [x] **Editar notas** existentes
- [x] **Eliminar notas** con confirmación
- [x] **Listar notas** ordenadas por fecha (más recientes primero)
- [x] **Persistencia offline** con IndexedDB
- [x] **Service Worker** con estrategia cache-first
- [x] **Instalable** como PWA en móvil y escritorio
- [x] **Modo standalone** cuando está instalada
- [x] **Diseño responsive** mobile-first con Tailwind CSS
- [x] **Fecha relativa** (hace X minutos/horas/días)

## 🔍 Cómo funciona

### Persistencia con IndexedDB:
- Todas las notas se guardan en IndexedDB del navegador
- No requiere conexión a internet ni backend
- Los datos persisten incluso al cerrar el navegador
- Cada nota tiene: `id`, `titulo`, `contenido`, `fecha`

### Service Worker:
- Cachea los assets estáticos (HTML, CSS, JS, íconos)
- Usa estrategia **cache-first**: primero busca en cache, luego en red
- Permite que la app funcione completamente offline
- Se actualiza automáticamente cuando hay nueva versión

### Pinia Store:
- Estado centralizado para todas las notas
- Acciones: `cargarNotas()`, `crearNota()`, `actualizarNota()`, `eliminarNota()`
- Cada acción actualiza inmediatamente IndexedDB

## 🎯 Criterios PWA Cumplidos

Esta aplicación cumple con todos los requisitos de una PWA:

1. ✅ **HTTPS** - Funciona en localhost o HTTPS en producción
2. ✅ **Service Worker** - Registrado y funcionando
3. ✅ **Manifest.webmanifest** - Configurado correctamente
4. ✅ **Instalable** - Se puede agregar a la pantalla de inicio
5. ✅ **Responsive** - Diseño mobile-first que se adapta a todos los tamaños
6. ✅ **Offline-first** - Funciona completamente sin conexión
7. ✅ **Standalone** - Se ejecuta en ventana propia sin navegador
8. ✅ **Íconos** - Múltiples tamaños (192x192, 512x512)
9. ✅ **Rápida** - Assets cacheados, carga instantánea
10. ✅ **Segura** - No requiere permisos especiales

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 5000

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza el build de producción

# Generación
npm run generate     # Genera sitio estático
```

## 🌐 Deploy

Para deployar en producción, asegúrate de:
1. Usar HTTPS (requerido para Service Workers)
2. Configurar headers correctos para el manifest
3. Verificar que los íconos sean accesibles
4. Probar la instalación en dispositivos reales

## 📝 Notas Técnicas

### ¿Por qué IndexedDB y no localStorage?
- **Capacidad**: IndexedDB soporta mucho más datos (>50MB vs ~5MB)
- **Asíncrono**: No bloquea el thread principal
- **Estructura**: Permite consultas complejas y índices
- **Tipado**: Soporta objetos complejos sin serialización manual

### Estrategia de Cache:
- **Cache-First**: Primero busca en cache, mejora rendimiento
- **Network Fallback**: Si no está en cache, busca en la red
- **Versionado**: Cache v1, permite invalidar cuando hay actualizaciones

## 🐛 Troubleshooting

### El Service Worker no se registra:
- Verifica que estés en HTTPS o localhost
- Revisa la consola del navegador por errores
- Asegúrate que `sw.js` esté en `/public/`

### Las notas no persisten:
- Verifica que IndexedDB esté habilitado en el navegador
- Revisa la consola por errores de IndexedDB
- Asegúrate de no estar en modo incógnito (algunos navegadores lo restringen)

### La app no se instala:
- Verifica que el manifest esté correctamente servido
- Asegúrate que todos los íconos existan
- Revisa que estés en HTTPS o localhost
- Verifica en DevTools > Application > Manifest

## 📄 Licencia

MIT License - libre para usar y modificar.
