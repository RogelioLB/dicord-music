# Bot de Música para Discord usando DisTube

Un bot de Discord escrito en TypeScript que reproduce música usando la librería DisTube.

## Características

- Reproduce música de YouTube
- Cola de reproducción
- Comandos para controlar la reproducción (play, stop, skip)
- Archivo de configuración para cambiar el prefijo y el token
- Soporte para despliegue con Docker

## Requisitos previos

- Node.js (v16.9.0 o superior)
- npm o yarn
- Un token de bot de Discord

## Instalación

1. Clona este repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Configura el archivo `.env` con tu token y prefijo deseado:
```
DISCORD_TOKEN=tu_token_aquí
PREFIX=!
```

4. Compila el código TypeScript:
```bash
npm run build
```

5. Inicia el bot:
```bash
npm start
```

También puedes usar el modo desarrollo que no requiere compilación previa:
```bash
npm run dev
```

## Comandos disponibles

- `!play <nombre o URL>`: Reproduce una canción
- `!stop`: Detiene la reproducción
- `!skip`: Salta a la siguiente canción
- `!queue`: Muestra la cola de reproducción
- `!help`: Muestra todos los comandos disponibles

## Configuración

Para cambiar el prefijo del bot o actualizar el token, edita el archivo `.env` en la raíz del proyecto.

### YouTube Cookies

Para reproducir música sin restricciones, especialmente cuando el bot se encuentra desplegado en un servidor, necesitas configurar las cookies de YouTube:

1. Inicia sesión en YouTube en tu navegador
2. Utiliza una extensión como Cookie-Editor para exportar las cookies como String
3. Añade las cookies al archivo `.env` como `YOUTUBE_COOKIE=tu_cookie_aquí`

## Despliegue con Docker

### Opción 1: Construir y ejecutar localmente

1. Asegúrate de tener Docker instalado en tu sistema
2. Construye la imagen:

```bash
docker build -t discord-music-bot .
```

3. Ejecuta el contenedor:

```bash
docker run -d --name discord-music-bot --restart unless-stopped -e DISCORD_TOKEN=tu_token -e PREFIX=! -e YOUTUBE_COOKIE=tu_cookie discord-music-bot
```

### Opción 2: Subir a Docker Hub y desplegar

1. Ejecuta el script de despliegue incluido (requiere Docker):

```bash
.\deploy.bat
```

2. Sigue las instrucciones para iniciar sesión, construir y subir la imagen
3. Usa Docker Compose para ejecutar el bot:

```bash
docker-compose up -d
```

### Despliegue en otro servidor

1. Copia los archivos `docker-compose.yml` y `.env` al servidor de destino
2. Ejecuta:

```bash
docker-compose up -d
```

## Desarrollo

Si quieres añadir más comandos, simplemente crea un nuevo archivo en la carpeta `src/commands` siguiendo la estructura de los comandos existentes.
