/* ================================================
   GymTrack Pro - Registro del Service Worker
   ================================================ */

// Registrar el Service Worker cuando la página se carga
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
                
                // Verificar actualizaciones periódicamente
                setInterval(() => {
                    registration.update();
                }, 60000); // Cada minuto
            })
            .catch(error => {
                console.error('❌ Error al registrar Service Worker:', error);
            });
    });
    
    // Detectar cuando hay una nueva versión disponible
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Nueva versión disponible');
        
        // Mostrar notificación al usuario
        if (typeof showToast === 'function') {
            showToast('🔄 Nueva versión disponible. Recarga la página.');
        }
    });
}

// Detectar cuando la app se instala
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir el prompt automático
    e.preventDefault();
    
    // Guardar el evento para mostrarlo más tarde
    window.deferredPrompt = e;
    
    console.log('💾 La app puede ser instalada');
    
    // Aquí podrías mostrar un botón personalizado para instalar
    // Por ejemplo:
    // document.getElementById('installButton').style.display = 'block';
});

// Detectar cuando la app se instala exitosamente
window.addEventListener('appinstalled', () => {
    console.log('✅ App instalada exitosamente');
    
    if (typeof showToast === 'function') {
        showToast('✅ ¡GymTrack Pro instalado! Ahora funciona offline.');
    }
    
    window.deferredPrompt = null;
});

// Detectar si la app está corriendo en modo standalone (instalada)
function isStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || 
           (window.navigator.standalone) || 
           document.referrer.includes('android-app://');
}

if (isStandalone()) {
    console.log('📱 App corriendo en modo standalone');
}

// Función auxiliar para solicitar la instalación
function promptInstall() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó instalar la app');
            } else {
                console.log('Usuario rechazó instalar la app');
            }
            window.deferredPrompt = null;
        });
    }
}

// Exportar función para uso global
window.promptInstall = promptInstall;
