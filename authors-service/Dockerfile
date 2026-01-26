# ============================================
# STAGE 1: Build (compilar TypeScript)
# ============================================
FROM node:18-alpine AS builder

# Metadata
LABEL maintainer="Wladyes <wladyes@example.com>"
LABEL description="Authors Service - Editorial Digital Microservices"

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# ============================================
# STAGE 2: Production (imagen final optimizada)
# ============================================
FROM node:18-alpine

# Metadata
LABEL version="1.0.0"
LABEL description="Authors Service - Production Image"

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo package*.json
COPY package*.json ./

# Instalar SOLO dependencias de producción
RUN npm ci --only=production

# Copiar código compilado desde el stage builder
COPY --from=builder /app/dist ./dist

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Cambiar permisos
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto (se pueden sobreescribir)
ENV NODE_ENV=production
ENV PORT=3000

# Health check (verificar que el servicio responde)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para iniciar el servicio
CMD ["npm", "start"]
