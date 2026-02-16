/* ================================================
   GymTrack Pro - Service Worker
   Maneja el almacenamiento en caché y funcionalidad offline
   ================================================ */

const CACHE_NAME = 'gymtrack-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Archivos en caché');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('[Service Worker] Error al cachear:', err);
            })
    );
    
    // Activa inmediatamente el nuevo service worker
    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    return self.clients.claim();
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devolver de caché si existe
                if (response) {
                    return response;
                }
                
                // Si no está en caché, hacer petición de red
                return fetch(event.request)
                    .then(response => {
                        // Verificar si es una respuesta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clonar la respuesta
                        const responseToCache = response.clone();
                        
                        // Añadir al caché
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
            .catch(err => {
                console.error('[Service Worker] Error en fetch:', err);
                
                // Aquí podrías devolver una página offline personalizada
                // return caches.match('/offline.html');
            })
    );
});

// Manejo de notificaciones push (para recordatorios futuros)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : '¡Es hora de entrenar! 💪',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'workout-reminder',
        actions: [
            {
                action: 'view',
                title: 'Ver App'
            },
            {
                action: 'close',
                title: 'Cerrar'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('GymTrack Pro', options)
    );
});

// Manejo de clicks en notificaciones
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Sincronización en segundo plano (para futuras implementaciones)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-workouts') {
        event.waitUntil(syncWorkouts());
    }
});

async function syncWorkouts() {
    // Aquí iría la lógica para sincronizar con un servidor
    console.log('[Service Worker] Sincronizando entrenamientos...');
    // Por ahora solo usamos localStorage, pero esto permitiría
    // sincronizar con una base de datos en la nube en el futuro
}
