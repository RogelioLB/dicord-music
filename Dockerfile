FROM node:18-alpine

WORKDIR /app

# Instalar todas las dependencias necesarias para la compilación
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    ffmpeg \
    opus-dev \
    libc6-compat

# Copiar archivos de proyecto
COPY package*.json ./
COPY tsconfig.json ./

# Establecer variables de entorno para mejorar la compilación de módulos nativos
ENV PYTHONUNBUFFERED=1
ENV NPM_CONFIG_UNSAFE_PERM=true

# Instalar dependencias con manejo específico para @discordjs/opus
RUN npm install --no-audit --no-fund --loglevel=warn

# Copiar código fuente
COPY src/ ./src/

# Compilar TypeScript
RUN npm run build

# Limpiar dependencias de desarrollo manteniendo las necesarias para producción
RUN npm prune --production

# Comando para iniciar el bot
CMD ["npm", "start"]
