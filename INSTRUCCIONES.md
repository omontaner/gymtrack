# 📱 GymTrack Pro - Instrucciones de Instalación y Uso

## 🎯 Descripción
GymTrack Pro es una aplicación web progresiva (PWA) completa para el seguimiento de entrenamientos de gimnasio. Funciona offline, se puede instalar en tu dispositivo móvil y ofrece una experiencia similar a una app nativa.

---

## 📋 Características Principales

✅ **Registro de Entrenamientos**
- Tipos de ejercicio personalizables (Fuerza, Cardio, Estiramientos, Mixto)
- Seguimiento de repeticiones, peso, series y notas
- Organización por días de rutina (Push, Pull, Legs, etc.)
- Edición y eliminación de registros

✅ **Historial Completo**
- Visualización ordenada por fecha
- Filtros por tipo de ejercicio y día de rutina
- Búsqueda de ejercicios específicos
- Indicadores visuales de récords personales

✅ **Estadísticas Detalladas**
- Gráficos de progreso semanal
- Volumen por tipo de ejercicio
- Distribución de rutina
- Métricas totales (entrenamientos, repeticiones, volumen, peso máximo)

✅ **Diseño Moderno**
- Interfaz minimalista y colorida
- Modo oscuro y claro automático
- Animaciones suaves
- 100% responsivo (móvil, tablet, escritorio)

✅ **Funcionalidad PWA**
- Instalable en dispositivos móviles
- Funciona offline
- Almacenamiento local seguro
- Exportación e importación de datos

---

## 🚀 Instalación Rápida

### Opción 1: Usar directamente desde el navegador

1. **Abrir en el navegador**
   - Abre el archivo `index.html` en tu navegador web favorito
   - Chrome, Firefox, Safari y Edge son totalmente compatibles

2. **Empezar a usar**
   - ¡La app está lista para usar!
   - Todos los datos se guardan automáticamente en tu navegador

### Opción 2: Instalar en iPhone

1. **Abrir en Safari**
   - Abre `index.html` en Safari (debe ser Safari, no Chrome)

2. **Añadir a pantalla de inicio**
   - Toca el botón de compartir (ícono de cuadrado con flecha hacia arriba)
   - Desplázate y selecciona "Añadir a pantalla de inicio"
   - Personaliza el nombre si lo deseas
   - Toca "Añadir"

3. **Usar como app**
   - Ahora verás el ícono de GymTrack Pro en tu pantalla de inicio
   - Tócalo para abrir la app
   - Funciona como una app nativa, ¡incluso sin conexión!

### Opción 3: Instalar en Android

1. **Abrir en Chrome**
   - Abre `index.html` en Google Chrome

2. **Instalar la app**
   - Toca el menú (tres puntos verticales)
   - Selecciona "Añadir a pantalla de inicio" o "Instalar app"
   - También puede aparecer un banner automático sugiriendo la instalación
   - Toca "Instalar" o "Añadir"

3. **Usar como app**
   - Encuentra el ícono de GymTrack Pro en tu pantalla de inicio o cajón de apps
   - Ábrelo como cualquier otra aplicación
   - ¡Funciona completamente offline!

### Opción 4: Servidor Web Local (Recomendado para desarrollo)

Si quieres probar todas las funcionalidades PWA completas:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (si tienes http-server instalado)
npx http-server -p 8000
```

Luego abre en tu navegador: `http://localhost:8000`

---

## 📖 Guía de Uso

### 1️⃣ Registrar un Entrenamiento

1. En la pestaña **"Entrenar"**:
   - Selecciona el tipo de ejercicio
   - Escribe el nombre del ejercicio (ej: "Press de banca")
   - Elige el día de rutina (ej: "Push")
   - Introduce repeticiones y peso
   - Especifica el número de series
   - Añade notas opcionales (ej: "Sentí buena conexión muscular")
   
2. Toca **"Guardar Registro"**
   - Verás una confirmación en la parte inferior
   - Si es un récord personal, recibirás una notificación especial 🎉

3. **Consejos**:
   - Puedes añadir tipos de ejercicio personalizados con el botón ➕
   - Puedes añadir días de rutina personalizados también
   - Todos los datos se guardan automáticamente

### 2️⃣ Ver tu Historial

1. Ve a la pestaña **"Historial"**

2. **Filtrar entrenamientos**:
   - Por tipo de ejercicio
   - Por día de rutina
   - Buscar ejercicios específicos

3. **Acciones disponibles**:
   - ✏️ **Editar**: Modifica cualquier registro
   - 🗑️ **Eliminar**: Borra registros (con confirmación)
   - Los récords personales se marcan con ⭐

### 3️⃣ Ver Estadísticas

1. Abre la pestaña **"Estadísticas"**

2. **Métricas disponibles**:
   - Total de entrenamientos
   - Total de repeticiones
   - Volumen total levantado (kg)
   - Peso máximo alcanzado

3. **Gráficos interactivos**:
   - **Progreso Semanal**: Muestra tu volumen de entrenamiento semana a semana
   - **Volumen por Tipo**: Compara cuánto entrenas cada tipo de ejercicio
   - **Distribución de Rutina**: Visualiza cómo distribuyes tus entrenamientos

### 4️⃣ Configuración

1. Ve a **"Ajustes"**

2. **Recordatorios**:
   - Activa recordatorios diarios
   - Configura la hora de tu recordatorio
   - (Necesita permisos de notificación)

3. **Gestión de Datos**:
   - **Exportar**: Descarga todos tus datos en formato JSON
   - **Importar**: Restaura datos desde un archivo de respaldo
   - **Borrar Todo**: Elimina todos los datos (¡con confirmación!)

### 5️⃣ Cambiar entre Modo Oscuro y Claro

- Toca el botón 🌙/☀️ en la esquina superior derecha
- El modo se adapta automáticamente a la configuración de tu dispositivo
- Tu preferencia se guarda automáticamente

---

## 💾 Gestión de Datos

### Almacenamiento Local
- Todos tus datos se guardan en el almacenamiento local de tu navegador
- Los datos persisten incluso si cierras el navegador
- Capacidad de almacenamiento: ~10MB (suficiente para miles de entrenamientos)

### Respaldo de Datos

**Exportar datos**:
1. Ve a Ajustes > "Exportar Datos (JSON)"
2. Se descargará un archivo `gymtrack-backup-[fecha].json`
3. Guarda este archivo en un lugar seguro (Drive, Dropbox, etc.)

**Importar datos**:
1. Ve a Ajustes > "Importar Datos"
2. Selecciona tu archivo de respaldo `.json`
3. Los datos se restaurarán automáticamente

**Consejo**: Exporta tus datos regularmente para tener respaldos

### Migración Futura a la Nube

La estructura de la app está preparada para migrar fácilmente a almacenamiento en la nube:

- Los datos están en formato JSON estándar
- Estructura modular del código
- Service Worker preparado para sincronización
- Solo requiere añadir un backend y autenticación

---

## 🎨 Personalización

### Añadir Tipos de Ejercicio Personalizados

1. En el formulario de registro, toca el botón ➕ junto a "Tipo de Ejercicio"
2. Introduce el nombre del nuevo tipo (ej: "Yoga", "Boxeo", "Natación")
3. Ya está disponible en el selector

### Añadir Días de Rutina Personalizados

1. En el formulario, toca ➕ junto a "Día de Rutina"
2. Introduce el nombre (ej: "Brazos", "Core", "Cardio Pesado")
3. Ahora puedes organizarte como prefieras

---

## 🔧 Solución de Problemas

### La app no se instala en iPhone

**Solución**:
- Debe usarse Safari (no Chrome ni Firefox)
- Asegúrate de tener iOS 11.3 o superior
- Verifica que no tengas restricciones de instalación

### La app no funciona offline

**Solución**:
- Asegúrate de haberla instalado desde un servidor web (no desde `file://`)
- Verifica que el Service Worker esté registrado (abre las herramientas de desarrollo)
- Recarga la página una vez después de instalarla

### Los datos no se guardan

**Solución**:
- Verifica que el navegador tenga habilitado el almacenamiento local
- No uses modo incógnito/privado
- Comprueba que no hayas alcanzado el límite de almacenamiento

### Los gráficos no se muestran

**Solución**:
- Asegúrate de tener conexión a internet la primera vez (para cargar Chart.js)
- Verifica que tengas JavaScript habilitado
- Actualiza la página

### Perdí mis datos

**Solución**:
- Si tienes un respaldo exportado, ve a Ajustes > Importar Datos
- Los datos se guardan por navegador/dispositivo, no entre dispositivos
- Siempre exporta tus datos antes de cambiar de dispositivo o navegador

---

## 📱 Compatibilidad

### Navegadores Soportados

✅ **Completamente soportado**:
- Chrome 90+ (Android, Windows, Mac, Linux)
- Safari 14+ (iOS, iPadOS, Mac)
- Edge 90+
- Firefox 88+

⚠️ **Soporte limitado**:
- Internet Explorer: No soportado

### Dispositivos Recomendados

✅ **Óptimo**:
- iPhone (iOS 14+)
- iPad (iPadOS 14+)
- Android (7.0+)
- Ordenadores de escritorio/portátiles

### Requisitos Mínimos

- Navegador moderno actualizado
- JavaScript habilitado
- ~2MB de espacio libre
- Pantalla: 320px de ancho mínimo

---

## 🔐 Privacidad y Seguridad

### Datos Locales
- **Todos tus datos se guardan solo en tu dispositivo**
- No se envía información a ningún servidor
- No hay tracking ni analytics
- No se requiere cuenta ni registro

### Permisos
- **Almacenamiento**: Para guardar tus entrenamientos
- **Notificaciones**: Solo si activas los recordatorios (opcional)

### Recomendaciones
- Exporta tus datos regularmente
- No compartas tu dispositivo sin protección por contraseña
- Usa la función de borrar datos si cambias de dispositivo

---

## 🆘 Soporte y Contacto

### Problemas Técnicos

Si encuentras algún problema:

1. Verifica las soluciones en "Solución de Problemas"
2. Asegúrate de usar un navegador compatible y actualizado
3. Prueba limpiar la caché del navegador
4. Reinstala la app

### Mejoras y Sugerencias

Esta es una aplicación de código abierto. Puedes:
- Modificar el código según tus necesidades
- Añadir nuevas funcionalidades
- Adaptarla a tus rutinas específicas

---

## 📝 Estructura del Proyecto

```
gymtrack-pro/
├── index.html              # Estructura HTML principal
├── styles.css              # Estilos CSS (modo oscuro/claro)
├── app.js                  # Lógica principal de la aplicación
├── service-worker.js       # Service Worker para PWA
├── service-worker-register.js  # Registro del Service Worker
├── manifest.json           # Manifiesto de la PWA
├── icon-192.png           # Icono 192x192
├── icon-512.png           # Icono 512x512
└── INSTRUCCIONES.md       # Este archivo
```

---

## 🔄 Actualizaciones Futuras Posibles

Ideas para expandir la aplicación:

- 🌐 Sincronización en la nube
- 👥 Compartir rutinas con amigos
- 📸 Añadir fotos de progreso
- 🏆 Sistema de logros y metas
- 📅 Planificador de rutinas
- 🔔 Recordatorios inteligentes
- 📊 Análisis avanzados con IA
- 🎥 Videos de ejercicios
- 💬 Notas de voz
- 🌍 Múltiples idiomas

---

## ⚖️ Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 🎉 ¡Comienza a Entrenar!

Ya tienes todo listo. Abre la aplicación y:

1. Registra tu primer entrenamiento
2. Mira cómo se actualizan tus estadísticas
3. Mantén el seguimiento de tu progreso
4. ¡Supera tus récords personales!

**¡Buena suerte en tu viaje fitness! 💪🔥**

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026  
**Creado con**: HTML, CSS, JavaScript, Chart.js
