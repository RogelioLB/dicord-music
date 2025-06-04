# Bot de Música para Discord usando DisTube

Un bot de Discord escrito en TypeScript que reproduce música usando la librería DisTube.

## Características

- Reproduce música de YouTube
- Cola de reproducción
- Comandos para controlar la reproducción (play, stop, skip)
- Archivo de configuración para cambiar el prefijo y el token

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

## Desarrollo

Si quieres añadir más comandos, simplemente crea un nuevo archivo en la carpeta `src/commands` siguiendo la estructura de los comandos existentes.
