@echo off
setlocal enabledelayedexpansion
echo ===================================
echo    Despliegue de Discord Music Bot
echo ===================================
echo.

:: Solicitar credenciales de Docker Hub
SET /p DOCKER_USERNAME="Ingresa tu nombre de usuario de Docker Hub: "
SET /p DOCKER_PASSWORD="Ingresa tu contraseña de Docker Hub (no se mostrará): "

:: Iniciar sesión en Docker Hub
echo.
echo [1/4] Iniciando sesión en Docker Hub...
echo %DOCKER_PASSWORD% | docker login --username %DOCKER_USERNAME% --password-stdin

IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] No se pudo iniciar sesión en Docker Hub
  pause
  exit /b %ERRORLEVEL%
)

:: Construir la imagen Docker
echo.
echo [2/4] Construyendo la imagen Docker...
docker build -t %DOCKER_USERNAME%/discord-music-bot:latest .

IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] No se pudo construir la imagen Docker
  pause
  exit /b %ERRORLEVEL%
)

:: Subir la imagen a Docker Hub
echo.
echo [3/4] Subiendo la imagen a Docker Hub...
docker push %DOCKER_USERNAME%/discord-music-bot:latest

IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] No se pudo subir la imagen a Docker Hub
  pause
  exit /b %ERRORLEVEL%
)

:: Actualizar docker-compose.yml
echo.
echo [4/4] Actualizando docker-compose.yml...

:: Crear un archivo temporal
type docker-compose.yml | findstr /v "image:" | findstr /v "# image:" > docker-compose.temp

:: Buscar la línea que contiene 'build:' y añadir la línea image antes
for /f "tokens=*" %%a in ('findstr /n /c:"    build:" docker-compose.yml') do (
  set line=%%a
  set linenum=!line:*:=!
)

powershell -Command "(Get-Content docker-compose.temp) | ForEach-Object { $_ -replace '    build:', '    image: %DOCKER_USERNAME%/discord-music-bot:latest\n    # build:' } | Set-Content docker-compose.yml"

:: Eliminar el archivo temporal
del docker-compose.temp

echo.
echo ===========================================
echo    ¡Despliegue completado con éxito!
echo ===========================================
echo.
echo Imagen publicada: %DOCKER_USERNAME%/discord-music-bot:latest
echo.
echo Para ejecutar tu bot en este equipo:
echo    docker-compose up -d
echo.
echo Para ejecutarlo en otro servidor:
echo    1. Copia los archivos docker-compose.yml y .env
 echo    2. Ejecuta: docker-compose up -d
echo.

pause
