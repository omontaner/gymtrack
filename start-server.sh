#!/bin/bash

# ================================================
# GymTrack Pro - Script de inicio del servidor
# ================================================

echo "🚀 Iniciando GymTrack Pro..."
echo ""

# Detectar Python
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 encontrado"
    echo "📡 Servidor iniciado en: http://localhost:8000"
    echo ""
    echo "🔗 Abre tu navegador y ve a: http://localhost:8000"
    echo "📱 En móvil, usa la IP de tu ordenador en lugar de localhost"
    echo ""
    echo "⌨️  Presiona Ctrl+C para detener el servidor"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python 2 encontrado"
    echo "📡 Servidor iniciado en: http://localhost:8000"
    echo ""
    echo "🔗 Abre tu navegador y ve a: http://localhost:8000"
    echo "📱 En móvil, usa la IP de tu ordenador en lugar de localhost"
    echo ""
    echo "⌨️  Presiona Ctrl+C para detener el servidor"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python no encontrado"
    echo ""
    echo "Por favor instala Python o abre index.html directamente en tu navegador"
    echo ""
    echo "Alternativamente, si tienes Node.js:"
    echo "  npx http-server -p 8000"
fi
