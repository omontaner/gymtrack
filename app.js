/* ================================================
   GymTrack Pro - JavaScript Principal
   Aplicación completa de seguimiento de gimnasio
   ================================================ */

// ===== Estado de la Aplicación =====
const app = {
    workouts: [],
    exerciseTypes: ['Fuerza', 'Cardio', 'Estiramientos', 'Mixto'],
    routineDays: ['Push', 'Pull', 'Legs', 'Upper', 'Lower', 'Full Body'],
    currentFilter: { type: '', day: '', search: '' },
    editingId: null,
    charts: {},
    settings: {
        dailyReminder: false,
        reminderTime: '09:00',
        theme: 'auto' // 'light', 'dark', 'auto'
    }
};

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadData();
    setupEventListeners();
    setupTheme();
    updateUI();
    updateQuickStats();
    
    // Solicitar permisos de notificación si están habilitados los recordatorios
    if (app.settings.dailyReminder && 'Notification' in window) {
        Notification.requestPermission();
    }
}

// ===== Gestión de Datos (localStorage) =====
function loadData() {
    // Cargar entrenamientos
    const savedWorkouts = localStorage.getItem('gymtrack_workouts');
    if (savedWorkouts) {
        app.workouts = JSON.parse(savedWorkouts);
    }
    
    // Cargar tipos de ejercicio personalizados
    const savedTypes = localStorage.getItem('gymtrack_exercise_types');
    if (savedTypes) {
        app.exerciseTypes = JSON.parse(savedTypes);
    }
    
    // Cargar días de rutina personalizados
    const savedDays = localStorage.getItem('gymtrack_routine_days');
    if (savedDays) {
        app.routineDays = JSON.parse(savedDays);
    }
    
    // Cargar configuración
    const savedSettings = localStorage.getItem('gymtrack_settings');
    if (savedSettings) {
        app.settings = JSON.parse(savedSettings);
        document.getElementById('dailyReminder').checked = app.settings.dailyReminder;
        document.getElementById('reminderTime').value = app.settings.reminderTime;
    }
}

function saveData() {
    localStorage.setItem('gymtrack_workouts', JSON.stringify(app.workouts));
    localStorage.setItem('gymtrack_exercise_types', JSON.stringify(app.exerciseTypes));
    localStorage.setItem('gymtrack_routine_days', JSON.stringify(app.routineDays));
    localStorage.setItem('gymtrack_settings', JSON.stringify(app.settings));
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Navegación de tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Formulario de entrenamiento
    document.getElementById('workoutForm').addEventListener('submit', handleWorkoutSubmit);
    
    // Botones para agregar tipos personalizados
    document.getElementById('addExerciseType').addEventListener('click', addCustomExerciseType);
    document.getElementById('addRoutineDay').addEventListener('click', addCustomRoutineDay);
    
    // Filtros de historial
    document.getElementById('filterType').addEventListener('change', applyFilters);
    document.getElementById('filterDay').addEventListener('change', applyFilters);
    document.getElementById('searchExercise').addEventListener('input', applyFilters);
    
    // Configuración
    document.getElementById('dailyReminder').addEventListener('change', handleReminderToggle);
    document.getElementById('reminderTime').addEventListener('change', handleReminderTimeChange);
    document.getElementById('exportData').addEventListener('click', exportData);
    document.getElementById('importData').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);
    document.getElementById('clearData').addEventListener('click', confirmClearData);
    
    // Modal
    document.getElementById('modalCancel').addEventListener('click', hideModal);
    document.getElementById('modalConfirm').addEventListener('click', executeModalAction);
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// ===== Gestión de Tabs =====
function switchTab(tabName) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Actualizar datos si es necesario
    if (tabName === 'history') {
        renderHistory();
    } else if (tabName === 'stats') {
        updateStatistics();
        renderCharts();
    }
}

// ===== Gestión de Entrenamientos =====
function handleWorkoutSubmit(e) {
    e.preventDefault();
    
    const editingId = document.getElementById('editingId').value;
    const formData = {
        id: editingId || Date.now().toString(),
        exerciseType: document.getElementById('exerciseType').value,
        exerciseName: document.getElementById('exerciseName').value,
        routineDay: document.getElementById('routineDay').value,
        reps: parseInt(document.getElementById('reps').value),
        weight: parseFloat(document.getElementById('weight').value),
        sets: parseInt(document.getElementById('sets').value),
        notes: document.getElementById('notes').value,
        timestamp: editingId ? 
            app.workouts.find(w => w.id === editingId).timestamp : 
            new Date().toISOString()
    };
    
    // Calcular volumen total
    formData.volume = formData.reps * formData.weight * formData.sets;
    
    if (editingId) {
        // Editar existente
        const index = app.workouts.findIndex(w => w.id === editingId);
        app.workouts[index] = formData;
        showToast('✅ Registro actualizado correctamente');
    } else {
        // Nuevo registro
        app.workouts.push(formData);
        
        // Verificar si es récord personal
        if (isPersonalRecord(formData)) {
            showToast('🎉 ¡Nuevo récord personal! ' + formData.weight + ' kg');
        } else {
            showToast('✅ Registro guardado correctamente');
        }
    }
    
    saveData();
    resetForm();
    updateUI();
    updateQuickStats();
    
    // Animación de éxito
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('loading');
    setTimeout(() => submitBtn.classList.remove('loading'), 500);
}

function isPersonalRecord(workout) {
    const sameExercise = app.workouts.filter(w => 
        w.exerciseName.toLowerCase() === workout.exerciseName.toLowerCase() &&
        w.id !== workout.id
    );
    
    if (sameExercise.length === 0) return true;
    
    const maxWeight = Math.max(...sameExercise.map(w => w.weight));
    return workout.weight > maxWeight;
}

function resetForm() {
    document.getElementById('workoutForm').reset();
    document.getElementById('editingId').value = '';
    document.getElementById('submitBtn').querySelector('.btn-text').textContent = 'Guardar Registro';
    document.getElementById('sets').value = '1';
}

function editWorkout(id) {
    const workout = app.workouts.find(w => w.id === id);
    if (!workout) return;
    
    document.getElementById('exerciseType').value = workout.exerciseType;
    document.getElementById('exerciseName').value = workout.exerciseName;
    document.getElementById('routineDay').value = workout.routineDay;
    document.getElementById('reps').value = workout.reps;
    document.getElementById('weight').value = workout.weight;
    document.getElementById('sets').value = workout.sets;
    document.getElementById('notes').value = workout.notes || '';
    document.getElementById('editingId').value = id;
    document.getElementById('submitBtn').querySelector('.btn-text').textContent = 'Actualizar Registro';
    
    // Cambiar a la tab de entrenamiento
    switchTab('workout');
    
    // Scroll al formulario
    document.getElementById('workoutForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteWorkout(id) {
    showModal(
        'Eliminar Registro',
        '¿Estás seguro de que quieres eliminar este registro?',
        () => {
            app.workouts = app.workouts.filter(w => w.id !== id);
            saveData();
            renderHistory();
            updateQuickStats();
            showToast('🗑️ Registro eliminado');
        }
    );
}

// ===== Tipos Personalizados =====
function addCustomExerciseType() {
    const newType = prompt('Introduce un nuevo tipo de ejercicio:');
    if (newType && newType.trim() && !app.exerciseTypes.includes(newType.trim())) {
        app.exerciseTypes.push(newType.trim());
        saveData();
        updateExerciseTypeSelect();
        showToast('✅ Tipo de ejercicio añadido');
    }
}

function addCustomRoutineDay() {
    const newDay = prompt('Introduce un nuevo día de rutina:');
    if (newDay && newDay.trim() && !app.routineDays.includes(newDay.trim())) {
        app.routineDays.push(newDay.trim());
        saveData();
        updateRoutineDaySelect();
        showToast('✅ Día de rutina añadido');
    }
}

function updateExerciseTypeSelect() {
    const select = document.getElementById('exerciseType');
    const currentValue = select.value;
    select.innerHTML = app.exerciseTypes.map(type => 
        `<option value="${type}">${type}</option>`
    ).join('');
    if (app.exerciseTypes.includes(currentValue)) {
        select.value = currentValue;
    }
    
    // Actualizar filtros también
    const filterSelect = document.getElementById('filterType');
    filterSelect.innerHTML = '<option value="">Todos</option>' + 
        app.exerciseTypes.map(type => 
            `<option value="${type}">${type}</option>`
        ).join('');
}

function updateRoutineDaySelect() {
    const select = document.getElementById('routineDay');
    const currentValue = select.value;
    select.innerHTML = app.routineDays.map(day => 
        `<option value="${day}">${day}</option>`
    ).join('');
    if (app.routineDays.includes(currentValue)) {
        select.value = currentValue;
    }
    
    // Actualizar filtros también
    const filterSelect = document.getElementById('filterDay');
    filterSelect.innerHTML = '<option value="">Todos</option>' + 
        app.routineDays.map(day => 
            `<option value="${day}">${day}</option>`
        ).join('');
}

// ===== Historial =====
function renderHistory() {
    const historyList = document.getElementById('historyList');
    
    // Aplicar filtros
    let filteredWorkouts = app.workouts.filter(workout => {
        const typeMatch = !app.currentFilter.type || workout.exerciseType === app.currentFilter.type;
        const dayMatch = !app.currentFilter.day || workout.routineDay === app.currentFilter.day;
        const searchMatch = !app.currentFilter.search || 
            workout.exerciseName.toLowerCase().includes(app.currentFilter.search.toLowerCase());
        
        return typeMatch && dayMatch && searchMatch;
    });
    
    // Ordenar por fecha (más reciente primero)
    filteredWorkouts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (filteredWorkouts.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📋</span>
                <p>No se encontraron registros</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = filteredWorkouts.map(workout => {
        const date = new Date(workout.timestamp);
        const isRecord = isPersonalRecord(workout);
        
        return `
            <div class="history-item ${isRecord ? 'record' : ''}" data-id="${workout.id}">
                <div class="history-header">
                    <div>
                        <h3 class="history-title">${workout.exerciseName}</h3>
                        <span class="history-badge badge-${workout.exerciseType.toLowerCase().replace(' ', '-')}">
                            ${workout.exerciseType}
                        </span>
                    </div>
                    ${isRecord ? '<span class="record-badge">⭐ Récord</span>' : ''}
                </div>
                
                <div class="history-details">
                    <div class="history-detail">
                        <span class="detail-label">Día de Rutina</span>
                        <span class="detail-value">${workout.routineDay}</span>
                    </div>
                    <div class="history-detail">
                        <span class="detail-label">Series</span>
                        <span class="detail-value">${workout.sets}</span>
                    </div>
                    <div class="history-detail">
                        <span class="detail-label">Repeticiones</span>
                        <span class="detail-value">${workout.reps}</span>
                    </div>
                    <div class="history-detail">
                        <span class="detail-label">Peso</span>
                        <span class="detail-value">${workout.weight} kg</span>
                    </div>
                    <div class="history-detail">
                        <span class="detail-label">Volumen</span>
                        <span class="detail-value">${workout.volume} kg</span>
                    </div>
                </div>
                
                ${workout.notes ? `<div class="history-notes">💭 ${workout.notes}</div>` : ''}
                
                <div class="history-meta">
                    <span class="history-date">
                        📅 ${formatDate(date)}
                    </span>
                    <div class="history-actions">
                        <button class="btn-edit" onclick="editWorkout('${workout.id}')" title="Editar">
                            ✏️
                        </button>
                        <button class="btn-delete" onclick="deleteWorkout('${workout.id}')" title="Eliminar">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function applyFilters() {
    app.currentFilter.type = document.getElementById('filterType').value;
    app.currentFilter.day = document.getElementById('filterDay').value;
    app.currentFilter.search = document.getElementById('searchExercise').value;
    renderHistory();
}

// ===== Quick Stats =====
function updateQuickStats() {
    // Entrenamientos esta semana
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weeklyWorkouts = app.workouts.filter(w => 
        new Date(w.timestamp) >= weekStart
    ).length;
    
    document.getElementById('weeklyWorkouts').textContent = weeklyWorkouts;
    
    // Peso máximo
    const maxWeight = app.workouts.length > 0 ? 
        Math.max(...app.workouts.map(w => w.weight)) : 0;
    
    document.getElementById('maxWeight').textContent = maxWeight + ' kg';
}

// ===== Estadísticas =====
function updateStatistics() {
    // Total entrenamientos
    document.getElementById('totalWorkouts').textContent = app.workouts.length;
    
    // Total repeticiones
    const totalReps = app.workouts.reduce((sum, w) => sum + (w.reps * w.sets), 0);
    document.getElementById('totalReps').textContent = totalReps.toLocaleString();
    
    // Volumen total
    const totalVolume = app.workouts.reduce((sum, w) => sum + w.volume, 0);
    document.getElementById('totalVolume').textContent = totalVolume.toLocaleString();
    
    // Peso máximo
    const maxWeight = app.workouts.length > 0 ? 
        Math.max(...app.workouts.map(w => w.weight)) : 0;
    document.getElementById('statMaxWeight').textContent = maxWeight + ' kg';
}

function renderCharts() {
    renderWeeklyProgressChart();
    renderExerciseTypeChart();
    renderRoutineDistributionChart();
}

function renderWeeklyProgressChart() {
    const ctx = document.getElementById('weeklyProgressChart');
    
    // Destruir chart existente
    if (app.charts.weeklyProgress) {
        app.charts.weeklyProgress.destroy();
    }
    
    // Obtener datos de las últimas 7 semanas
    const weeks = [];
    const volumes = [];
    
    for (let i = 6; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const weekWorkouts = app.workouts.filter(w => {
            const date = new Date(w.timestamp);
            return date >= weekStart && date <= weekEnd;
        });
        
        const weekVolume = weekWorkouts.reduce((sum, w) => sum + w.volume, 0);
        
        weeks.push(`Semana ${i === 0 ? 'actual' : '-' + i}`);
        volumes.push(weekVolume);
    }
    
    app.charts.weeklyProgress = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeks,
            datasets: [{
                label: 'Volumen (kg)',
                data: volumes,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderExerciseTypeChart() {
    const ctx = document.getElementById('exerciseTypeChart');
    
    if (app.charts.exerciseType) {
        app.charts.exerciseType.destroy();
    }
    
    // Calcular volumen por tipo
    const typeData = {};
    app.exerciseTypes.forEach(type => {
        const typeWorkouts = app.workouts.filter(w => w.exerciseType === type);
        typeData[type] = typeWorkouts.reduce((sum, w) => sum + w.volume, 0);
    });
    
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
    
    app.charts.exerciseType = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(typeData),
            datasets: [{
                label: 'Volumen (kg)',
                data: Object.values(typeData),
                backgroundColor: colors.slice(0, Object.keys(typeData).length)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderRoutineDistributionChart() {
    const ctx = document.getElementById('routineDistributionChart');
    
    if (app.charts.routineDistribution) {
        app.charts.routineDistribution.destroy();
    }
    
    // Contar entrenamientos por día de rutina
    const dayData = {};
    app.routineDays.forEach(day => {
        dayData[day] = app.workouts.filter(w => w.routineDay === day).length;
    });
    
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
    
    app.charts.routineDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(dayData),
            datasets: [{
                data: Object.values(dayData),
                backgroundColor: colors.slice(0, Object.keys(dayData).length)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ===== Configuración =====
function handleReminderToggle(e) {
    app.settings.dailyReminder = e.target.checked;
    saveData();
    
    if (app.settings.dailyReminder && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showToast('✅ Recordatorios activados');
                scheduleReminder();
            } else {
                showToast('⚠️ Permiso de notificaciones denegado');
                e.target.checked = false;
                app.settings.dailyReminder = false;
                saveData();
            }
        });
    } else if (!app.settings.dailyReminder) {
        showToast('🔕 Recordatorios desactivados');
    }
}

function handleReminderTimeChange(e) {
    app.settings.reminderTime = e.target.value;
    saveData();
    if (app.settings.dailyReminder) {
        scheduleReminder();
        showToast('⏰ Hora del recordatorio actualizada');
    }
}

function scheduleReminder() {
    // En una PWA real, esto se manejaría con el Service Worker
    // Por ahora, solo mostramos una notificación de prueba
    if ('Notification' in window && Notification.permission === 'granted') {
        console.log('Recordatorio programado para ' + app.settings.reminderTime);
    }
}

// ===== Exportar/Importar Datos =====
function exportData() {
    const dataStr = JSON.stringify({
        workouts: app.workouts,
        exerciseTypes: app.exerciseTypes,
        routineDays: app.routineDays,
        settings: app.settings,
        exportDate: new Date().toISOString()
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gymtrack-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showToast('📤 Datos exportados correctamente');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (data.workouts) app.workouts = data.workouts;
            if (data.exerciseTypes) app.exerciseTypes = data.exerciseTypes;
            if (data.routineDays) app.routineDays = data.routineDays;
            if (data.settings) app.settings = data.settings;
            
            saveData();
            updateUI();
            updateQuickStats();
            updateExerciseTypeSelect();
            updateRoutineDaySelect();
            
            showToast('✅ Datos importados correctamente');
        } catch (error) {
            showToast('❌ Error al importar datos');
            console.error('Error:', error);
        }
    };
    reader.readAsText(file);
    
    // Reset input
    e.target.value = '';
}

function confirmClearData() {
    showModal(
        '⚠️ Borrar Todos los Datos',
        'Esta acción eliminará todos tus entrenamientos y configuración. No se puede deshacer.',
        () => {
            app.workouts = [];
            saveData();
            updateUI();
            updateQuickStats();
            renderHistory();
            showToast('🗑️ Todos los datos han sido eliminados');
        }
    );
}

// ===== Tema (Modo Oscuro/Claro) =====
function setupTheme() {
    const savedTheme = localStorage.getItem('gymtrack_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-icon').textContent = '☀️';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.querySelector('.theme-icon').textContent = '🌙';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    document.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('gymtrack_theme', isDark ? 'dark' : 'light');
    
    // Recrear gráficos con nuevo tema
    if (document.getElementById('statsTab').classList.contains('active')) {
        renderCharts();
    }
}

// ===== UI Helpers =====
function updateUI() {
    updateExerciseTypeSelect();
    updateRoutineDaySelect();
    renderHistory();
}

function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        return 'Hoy, ' + date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
        return 'Ayer, ' + date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
        return `Hace ${days} días`;
    } else {
        return date.toLocaleDateString('es', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Modal =====
let modalCallback = null;

function showModal(title, message, callback) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modalCallback = callback;
    modal.classList.add('show');
}

function hideModal() {
    document.getElementById('modal').classList.remove('show');
    modalCallback = null;
}

function executeModalAction() {
    if (modalCallback) {
        modalCallback();
    }
    hideModal();
}

// ===== Funciones Globales (para onClick en HTML) =====
window.editWorkout = editWorkout;
window.deleteWorkout = deleteWorkout;
