@echo off
REM ================================================
REM GymTrack Pro - Script de inicio del servidor (Windows)
REM ================================================

echo.
echo ========================================
echo   GymTrack Pro - Servidor Local
echo ========================================
echo.
echo Iniciando servidor...
echo.

REM Intentar con Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python encontrado!
    echo.
    echo Servidor iniciado en: http://localhost:8000
    echo.
    echo Abre tu navegador y ve a: http://localhost:8000
    echo En movil, usa la IP de tu ordenador en lugar de localhost
    echo.
    echo Presiona Ctrl+C para detener el servidor
    echo.
    python -m http.server 8000
) else (
    echo Python no encontrado.
    echo.
    echo Por favor instala Python desde: https://www.python.org/downloads/
    echo O abre index.html directamente en tu navegador.
    echo.
    pause
)
