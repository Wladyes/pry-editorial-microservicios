# Frontend

Interfaz web para la gestión de autores y publicaciones en el sistema editorial.

## Desarrolladora
**Margarita Fajardo** – [@MFajardo2812](https://github.com/MFajardo2812)

## Descripción
Aplicación web que proporciona la interfaz de usuario para interactuar con los microservicios de Authors y Publications. Permite gestionar autores, publicaciones y controlar el flujo editorial mediante estados.

## Tecnologías
* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Fetch API

## Funcionalidades

### Gestión de Autores
* Listar autores
* Crear nuevo autor
* Ver detalle de autor
* Editar información de autor
* Eliminar autor

### Gestión de Publicaciones
* Listar publicaciones con estado editorial
* Crear publicación asociada a un autor
* Ver detalle de publicación con información del autor
* Cambiar estado editorial

## Rutas Principales
* `/` – Página de inicio
* `/authors` – Listado de autores
* `/authors/new` – Crear autor
* `/authors/[id]` – Detalle de autor
* `/authors/[id]/edit` – Editar autor
* `/publications` – Listado de publicaciones
* `/publications/new` – Crear publicación
* `/publications/[id]` – Detalle de publicación

## Integración con APIs

### Authors Service (`http://localhost:3000`)
* GET `/authors`
* POST `/authors`
* GET `/authors/:id`
* PUT `/authors/:id`
* DELETE `/authors/:id`

### Publications Service (`http://localhost:8080`)
* GET `/publications`
* POST `/publications`
* GET `/publications/:id`
* PATCH `/publications/:id/status`

## Componentes Principales

### Navegación
* `Navigation.tsx` – Barra de navegación principal

### Autores
* `AuthorCard.tsx` – Tarjeta de autor
* Páginas de listado, creación y edición

### Publicaciones
* `PublicationCard.tsx` – Tarjeta de publicación
* `StatusBadge.tsx` – Indicador visual de estado editorial
* Páginas de listado, creación y detalle

## Arquitectura
Separación lógica:
* Pages (`app/`)
* API Layer (`lib/api/`)
* HTTP Client (`fetch`)
* Components (`components/`)
* Types (`types/`)

Principios aplicados:
* Componentes reutilizables
* Separación de lógica y presentación
* Tipado estricto con TypeScript
* Manejo de estado con React Hooks
* Abstracción de llamadas a APIs

## Ejecución

### Docker Compose
docker compose up frontend


### Local
npm install
npm run dev


Acceso: http://localhost:3001

## Configuración
Variables de entorno:
NEXT_PUBLIC_AUTHORS_API=http://localhost:3000
NEXT_PUBLIC_PUBLICATIONS_API=http://localhost:8080
PORT=3001


## Dependencias
El frontend requiere:
* Authors Service (puerto 3000)
* Publications Service (puerto 8080)

## Estados Editoriales
* DRAFT – Gris
* INREVIEW – Amarillo
* APPROVED – Verde
* PUBLISHED – Azul
* REJECTED – Rojo

## Validaciones
* Validación de campos requeridos
* Verificación de autor al crear publicación
* Confirmación antes de eliminar registros
* Manejo de errores de conexión con APIs

## Documentación Relacionada
* README principal
* Authors Service
* Publications Service

## Licencia
Este proyecto es software de código abierto bajo la Licencia MIT.