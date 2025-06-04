FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de construcción
RUN apk add --no-cache python3 make g++ ffmpeg

# Copiar archivos de proyecto
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY src/ ./src/

# Compilar TypeScript
RUN npm run build

# Limpiar dependencias de desarrollo
RUN npm prune --production

CMD ["npm", "start"]
