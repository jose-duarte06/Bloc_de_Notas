# Notas Rápidas - PWA

## 🎯 Descripción del Proyecto
Progressive Web App (PWA) para tomar notas rápidas. Aplicación completamente funcional offline, instalable en dispositivos móviles, sin necesidad de backend. Todos los datos se almacenan localmente en IndexedDB.

## 📊 Estado Actual
**Versión:** 1.0.0  
**Estado:** Completado y funcional  
**Última actualización:** 1 de Noviembre, 2025

## 🏗️ Arquitectura

### Stack Tecnológico:
- **Framework:** Nuxt 3.0 (Vue 3 Composition API)
- **Estado:** Pinia para state management
- **Estilos:** Tailwind CSS (mobile-first)
- **Base de datos:** IndexedDB (almacenamiento local)
- **PWA:** Service Worker personalizado + Manifest
- **Lenguaje:** TypeScript/JavaScript

### Estructura de Archivos Principales:
```
/
├── app.vue                    # Layout principal con header sticky
├── pages/
│   ├── index.vue             # Lista de notas con botón flotante +
│   └── nota/
│       ├── nueva.vue         # Formulario crear nota
│       └── [id].vue          # Formulario editar/eliminar nota
├── stores/
│   └── notas.ts              # Pinia store + IndexedDB helper
├── plugins/
│   └── register-sw.client.ts # Registro de Service Worker
├── public/
│   ├── sw.js                 # Service Worker con cache-first
│   ├── manifest.webmanifest  # PWA manifest
│   └── icons/                # Íconos PWA (192x192, 512x512)
├── nuxt.config.ts            # Config Nuxt con PWA meta tags
└── tailwind.config.js        # Config Tailwind
```

## ✨ Funcionalidades Implementadas

### CRUD de Notas:
- ✅ **Crear** notas con título y contenido
- ✅ **Leer** lista de notas ordenadas por fecha
- ✅ **Actualizar** notas existentes
- ✅ **Eliminar** notas con confirmación de diálogo modal

### PWA Features:
- ✅ **Offline-first**: Funciona completamente sin internet
- ✅ **Instalable**: Se puede instalar en móvil/escritorio
- ✅ **Standalone**: Se ejecuta sin barra de navegador cuando está instalada
- ✅ **Service Worker**: Cache de assets con estrategia cache-first
- ✅ **Manifest**: Configurado con íconos, colores y metadata

### UX/UI:
- ✅ Diseño responsive mobile-first
- ✅ Header sticky con logo y navegación
- ✅ Botón flotante para crear nueva nota
- ✅ Vista previa de contenido en lista de notas
- ✅ Fechas relativas (hace X min/horas/días)
- ✅ Diálogo de confirmación al eliminar
- ✅ Estados de carga

## 🔧 Decisiones Técnicas

### IndexedDB vs localStorage:
Se eligió **IndexedDB** porque:
- Mayor capacidad de almacenamiento (>50MB vs ~5MB)
- API asíncrona que no bloquea el UI thread
- Soporta consultas complejas y estructuras de datos
- Mejor rendimiento para operaciones CRUD frecuentes

### Service Worker:
- **Estrategia cache-first**: Prioriza velocidad sobre contenido fresco
- **Versionado de cache**: Permite invalidar cache en actualizaciones
- **Fallback a red**: Si no está en cache, intenta red
- **Runtime cache**: Cachea páginas visitadas dinámicamente

### Pinia Store:
- Estado centralizado para todas las notas
- Getters para ordenamiento y búsqueda por ID
- Acciones asíncronas que actualizan IndexedDB inmediatamente
- Separación clara entre lógica de negocio y persistencia

## 🚀 Cómo Usar

### Desarrollo:
```bash
npm run dev  # Puerto 5000
```

### Producción:
```bash
npm run build
npm run preview
```

### Probar Offline:
1. Abrir DevTools (F12)
2. Application > Service Workers
3. Crear algunas notas
4. Activar modo "Offline"
5. Recargar - la app sigue funcionando

### Instalar PWA:
- **Android Chrome**: Menú > Agregar a pantalla de inicio
- **iOS Safari**: Compartir > Agregar a pantalla de inicio
- **Desktop Chrome**: Ícono de instalación en barra de direcciones

## 📝 Modelo de Datos

### Nota (TypeScript Interface):
```typescript
interface Nota {
  id: string        // Timestamp único
  titulo: string    // Título de la nota
  contenido: string // Contenido de la nota
  fecha: string     // ISO string de fecha/hora
}
```

### IndexedDB Schema:
- **Database:** NotasRapidasDB
- **Version:** 1
- **Store:** notas
- **KeyPath:** id

## 🎨 Temas y Colores

### Paleta de Colores:
- **Primary:** Blue-500 (#3b82f6) - Header, botones, acentos
- **Background:** Gray-50 (#f9fafb) - Fondo general
- **Cards:** White (#ffffff) - Tarjetas de notas
- **Text:** Gray-900 (#111827) - Texto principal

### Responsive Breakpoints (Tailwind):
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px

## 🔐 Seguridad y Privacidad

- **Sin backend**: Todos los datos permanecen en el dispositivo
- **Sin tracking**: No se envían datos a servidores externos
- **Sin cookies**: No se usan cookies
- **Sin autenticación**: No hay login, todo es local
- **Privacidad total**: Las notas nunca salen del dispositivo

## 📱 Compatibilidad

### Navegadores Soportados:
- ✅ Chrome/Edge 90+ (Desktop y Android)
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS y macOS)
- ✅ Samsung Internet 14+

### Features Requeridas:
- Service Workers
- IndexedDB
- ES6+ JavaScript
- CSS Grid/Flexbox

## 🐛 Issues Conocidos

Ninguno identificado actualmente.

## 🔄 Changelog

### v1.0.0 (2025-11-01)
- ✨ Implementación inicial completa
- ✨ CRUD de notas con IndexedDB
- ✨ Service Worker con cache offline
- ✨ PWA instalable
- ✨ UI responsive con Tailwind CSS
- ✨ Confirmación de eliminación
- ✨ Fechas relativas

## 📚 Recursos y Referencias

- [Documentación Nuxt 3](https://nuxt.com)
- [Pinia Store](https://pinia.vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

## 🎓 Aprendizajes

### PWA:
- Service Workers funcionan solo en HTTPS o localhost
- El manifest debe tener al menos un ícono 192x192 y 512x512
- `display: "standalone"` elimina la barra del navegador
- El Service Worker se registra solo en el cliente (no SSR)

### IndexedDB:
- Es asíncrono por naturaleza (usa Promises)
- Requiere manejo de versiones para migraciones
- Object stores son como tablas en SQL
- Soporta transacciones para operaciones atómicas

### Nuxt 3:
- Los plugins `.client.ts` solo se ejecutan en el navegador
- Auto-imports globales disponibles en toda la app
- Tailwind se integra vía módulo oficial
- Pinia se integra perfectamente con módulo oficial

## 👤 Preferencias del Usuario

Ninguna preferencia específica registrada aún.
