# 📱 Notas Rápidas - PWA

## ✨ Aplicación completada y funcional

Esta es una Progressive Web App (PWA) completa para tomar notas rápidas, construida con:
- **Nuxt 3** + Vue 3 (Composition API)
- **Pinia** para manejo de estado
- **IndexedDB** para almacenamiento local
- **Service Worker** para funcionalidad offline
- **Tailwind CSS** para diseño responsive

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

## ✅ Funcionalidades Implementadas

### CRUD Completo de Notas:
- ✅ **Crear** notas con título y contenido
- ✅ **Ver** lista de notas con preview
- ✅ **Editar** notas existentes
- ✅ **Eliminar** notas con confirmación

### Características PWA:
- ✅ **Manifest** configurado (instalable en móvil)
- ✅ **Service Worker** activo
- ✅ **Íconos** PWA (192x192, 512x512)
- ✅ **Almacenamiento offline** con IndexedDB
- ✅ **Diseño responsive** mobile-first
- ✅ **Sin backend** - todo funciona localmente

## 📖 Documentación Completa

Para instrucciones detalladas de uso y pruebas, consulta:
- **[INSTRUCCIONES.md](./INSTRUCCIONES.md)** - Guía completa de uso, instalación y pruebas

## ⚠️ Modo Desarrollo vs Producción

### En Desarrollo (npm run dev):
- La app funciona perfectamente para CRUD de notas
- IndexedDB almacena datos localmente sin problemas
- Service Worker está activo
- **Limitación**: Para funcionalidad offline completa, navega por todas las páginas primero (ver INSTRUCCIONES.md)

### Para Producción:
Si necesitas offline completo desde el primer uso, genera un build de producción:

```bash
npm run generate
npm run preview
```

El build de producción pre-compila todos los assets y permite offline completo inmediato.

## 🎯 Lo que funciona AHORA mismo:

1. ✅ Crear notas - funciona perfectamente
2. ✅ Ver lista de notas - funciona perfectamente  
3. ✅ Editar notas - funciona perfectamente
4. ✅ Eliminar notas - funciona perfectamente
5. ✅ Persistencia con IndexedDB - las notas se guardan localmente
6. ✅ UI responsive - se ve bien en móvil y desktop
7. ✅ Instalable como PWA - puedes agregar a pantalla de inicio
8. ✅ Offline después de primera visita - cachea páginas visitadas

## 📂 Estructura del Proyecto

```
/
├── app.vue                    # Layout principal
├── pages/
│   ├── index.vue             # Lista de notas
│   └── nota/
│       ├── nueva.vue         # Crear nota
│       └── [id].vue          # Editar/eliminar
├── stores/
│   └── notas.ts              # Pinia store + IndexedDB
├── plugins/
│   └── register-sw.client.ts # Registro del SW
├── public/
│   ├── sw.js                 # Service Worker
│   ├── manifest.webmanifest  # PWA manifest
│   └── icons/                # Íconos PWA
├── nuxt.config.ts            # Configuración Nuxt
└── tailwind.config.js        # Configuración Tailwind
```

## 🔧 Comandos Disponibles

```bash
npm run dev      # Desarrollo (puerto 5000)
npm run build    # Build para producción
npm run generate # Genera sitio estático
npm run preview  # Preview del build
```

## 📱 Probar en Móvil

1. Abre la app en Chrome móvil
2. Menú > "Agregar a pantalla de inicio"
3. La app se abrirá en modo standalone (sin barra del navegador)
4. Todas las notas se guardan localmente en tu dispositivo

## 🎨 Tecnologías Usadas

- **Nuxt 3.0** - Framework Vue.js
- **Vue 3** - Con Composition API
- **Pinia** - State management
- **IndexedDB** - Base de datos local del navegador
- **Tailwind CSS** - Estilos utility-first
- **Service Workers** - Caching y offline
- **PWA Manifest** - Instalabilidad

## 📄 Licencia

MIT - Libre para usar y modificar

---

**¿Preguntas?** Consulta [INSTRUCCIONES.md](./INSTRUCCIONES.md) para más detalles.
