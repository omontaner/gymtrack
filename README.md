# 🏋️ GymTrack Pro

Una Progressive Web App (PWA) moderna, minimalista y totalmente funcional para el seguimiento de entrenamientos de gimnasio.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PWA](https://img.shields.io/badge/PWA-ready-orange)

## 🎯 Características Destacadas

- ✅ **100% Offline** - Funciona completamente sin conexión
- 📱 **Instalable** - Añade a pantalla de inicio en iOS y Android
- 🎨 **Diseño Moderno** - Interfaz minimalista con animaciones suaves
- 🌓 **Modo Oscuro/Claro** - Se adapta a las preferencias del sistema
- 📊 **Estadísticas Visuales** - Gráficos interactivos con Chart.js
- 💾 **Datos Locales** - Todo se guarda en tu dispositivo
- 📤 **Exportar/Importar** - Respaldo completo de datos en JSON
- ⚡ **Rápida y Ligera** - Sin dependencias pesadas

## 🚀 Inicio Rápido

### Método 1: Abrir directamente

```bash
# Simplemente abre index.html en tu navegador
open index.html  # Mac
xdg-open index.html  # Linux
start index.html  # Windows
```

### Método 2: Servidor local (Recomendado)

**Linux/Mac:**
```bash
chmod +x start-server.sh
./start-server.sh
```

**Windows:**
```bash
start-server.bat
```

**Manual:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

Luego abre: `http://localhost:8000`

### Método 3: Instalar como PWA

**En iPhone:**
1. Abre en Safari
2. Toca Compartir → Añadir a pantalla de inicio

**En Android:**
1. Abre en Chrome
2. Menú → Instalar app

## 📁 Estructura del Proyecto

```
gymtrack-pro/
│
├── index.html                    # HTML principal
├── styles.css                    # Estilos con CSS Variables
├── app.js                        # Lógica de la aplicación
│
├── service-worker.js             # SW para offline/caché
├── service-worker-register.js    # Registro del SW
├── manifest.json                 # PWA manifest
│
├── icon-192.png                  # Icono app (192x192)
├── icon-512.png                  # Icono app (512x512)
│
├── start-server.sh               # Script inicio (Unix)
├── start-server.bat              # Script inicio (Windows)
│
├── INSTRUCCIONES.md              # Guía completa en español
└── README.md                     # Este archivo
```

## 🛠️ Tecnologías

- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS, Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS puro, sin frameworks
- **Chart.js** - Visualización de datos
- **Service Workers** - Funcionalidad offline
- **LocalStorage** - Persistencia de datos
- **PWA** - Web App Manifest

## 💾 Almacenamiento de Datos

### Estructura de Datos

```javascript
// Workout Object
{
  id: "1645123456789",
  exerciseType: "Fuerza",
  exerciseName: "Press de banca",
  routineDay: "Push",
  reps: 12,
  weight: 80,
  sets: 3,
  volume: 2880,  // reps × weight × sets
  notes: "Buena conexión muscular",
  timestamp: "2026-02-16T10:30:00.000Z"
}

// Settings Object
{
  dailyReminder: false,
  reminderTime: "09:00",
  theme: "auto"  // 'light', 'dark', 'auto'
}
```

### LocalStorage Keys

- `gymtrack_workouts` - Array de entrenamientos
- `gymtrack_exercise_types` - Tipos de ejercicio personalizados
- `gymtrack_routine_days` - Días de rutina personalizados
- `gymtrack_settings` - Configuración de la app
- `gymtrack_theme` - Preferencia de tema

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
  --primary: #6366f1;        /* Color principal */
  --secondary: #ec4899;      /* Color secundario */
  --success: #10b981;        /* Color de éxito */
  --warning: #f59e0b;        /* Color de advertencia */
  --danger: #ef4444;         /* Color de peligro */
}
```

### Añadir Nuevas Funcionalidades

El código está modularizado y comentado. Puedes extenderlo fácilmente:

```javascript
// En app.js

// Añadir nueva estadística
function calculateNewStat() {
  // Tu lógica aquí
}

// Añadir nuevo gráfico
function renderNewChart() {
  const ctx = document.getElementById('newChart');
  // Configuración de Chart.js
}
```

## 📊 API de Datos

### Métodos Principales

```javascript
// Cargar datos
loadData()

// Guardar datos
saveData()

// Añadir entrenamiento
handleWorkoutSubmit(event)

// Editar entrenamiento
editWorkout(id)

// Eliminar entrenamiento
deleteWorkout(id)

// Exportar datos
exportData()

// Importar datos
importData(event)
```

## 🔄 Service Worker

### Estrategia de Caché

**Cache-First** con actualización en segundo plano:

```javascript
// Archivos en caché
- index.html
- styles.css
- app.js
- manifest.json
- Chart.js CDN
```

### Actualizaciones

El Service Worker se actualiza automáticamente cada minuto. Para forzar actualización:

```javascript
navigator.serviceWorker.getRegistration().then(reg => {
  reg.update();
});
```

## 📱 Compatibilidad PWA

### Características PWA Implementadas

- ✅ Web App Manifest
- ✅ Service Worker
- ✅ Offline First
- ✅ Instalable
- ✅ Iconos adaptativos
- ✅ Theme color
- ✅ Splash screen (iOS)
- ⏳ Push Notifications (preparado)
- ⏳ Background Sync (preparado)

### Requisitos para PWA

- ✅ HTTPS (o localhost)
- ✅ Manifest válido
- ✅ Service Worker registrado
- ✅ Iconos 192px y 512px
- ✅ Start URL

## 🔐 Seguridad y Privacidad

- **Sin Servidores** - Todo local
- **Sin Tracking** - Cero analytics
- **Sin Cuentas** - No se requiere registro
- **Sin Cookies** - Solo LocalStorage
- **Open Source** - Código visible y auditable

## 🐛 Debugging

### Chrome DevTools

```javascript
// Console helpers
console.log('Workouts:', app.workouts);
console.log('Settings:', app.settings);

// Limpiar todo
localStorage.clear();

// Ver Service Worker
chrome://serviceworker-internals/
```

### Common Issues

**Service Worker no se registra:**
```javascript
// Verificar
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('SW:', reg);
});
```

**Datos no persisten:**
```javascript
// Verificar almacenamiento
console.log(localStorage.getItem('gymtrack_workouts'));
```

## 🚀 Despliegue

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/gymtrack-pro.git
git push -u origin main
```

Activa GitHub Pages en Settings → Pages

### Netlify

```bash
# netlify.toml
[build]
  publish = "."
  command = "echo 'No build needed'"
```

### Vercel

```bash
vercel --prod
```

## 📈 Roadmap

### v1.1 (Próximamente)
- [ ] Planificador de rutinas
- [ ] Temporizador de descanso
- [ ] Más tipos de gráficos
- [ ] Exportar a PDF/Excel

### v1.2 (Futuro)
- [ ] Sincronización en la nube
- [ ] Fotos de progreso
- [ ] Social sharing
- [ ] Multi-idioma

### v2.0 (Visión)
- [ ] Backend opcional
- [ ] Compartir rutinas
- [ ] IA para sugerencias
- [ ] Integración con wearables

## 🤝 Contribuir

Este es un proyecto de código abierto. Siéntete libre de:

1. 🍴 Fork el proyecto
2. 🔨 Crear una rama (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🎉 Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

```
MIT License

Copyright (c) 2026 GymTrack Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Créditos

- **Chart.js** - https://www.chartjs.org/
- **Emojis** - Unicode Consortium
- **Iconos** - Diseño personalizado

## 📞 Soporte

Para dudas o problemas:
- 📖 Lee `INSTRUCCIONES.md` primero
- 🐛 Revisa la sección de debugging
- 💬 Abre un issue en GitHub

## 🎉 ¡Gracias por usar GymTrack Pro!

Si te gusta el proyecto:
- ⭐ Dale una estrella en GitHub
- 🔄 Compártelo con amigos
- 🐛 Reporta bugs
- 💡 Sugiere mejoras

---

**Hecho con 💪 y ☕**

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
