# Authors Service

Microservicio para la gestión de autores del sistema editorial.

## Desarrollador
**Wladymir Escobar** – [@Wladyes](https://github.com/Wladyes)

## Descripción
Servicio independiente que administra el ciclo de vida de autores mediante una API REST. Implementa arquitectura en capas, principios SOLID y patrones de diseño.

## Tecnologías
* Node.js 20 + Express
* TypeORM
* PostgreSQL 15
* TypeScript

## Endpoints
**Base URL:** http://localhost:3000

GET /authors Listar autores
GET /authors/:id Obtener autor
POST /authors Crear autor
PUT /authors/:id Actualizar autor
DELETE /authors/:id Eliminar autor
GET /health Health check


## Modelo de Datos
* Clase base abstracta: Author
* Clases derivadas: ScientificAuthor, LiteraryAuthor

## Patrones Implementados
* Repository Pattern – Abstracción del acceso a datos
* Factory Pattern – Creación de tipos de autores
* DTO Pattern – Validación y transferencia de datos

## Ejecución

### Docker Compose
docker compose up authors-service db-authors


### Local
npm install
npm run dev


## Configuración
Variables de entorno:
PORT=3000
DATABASE_URL=postgresql://admin:admin123@localhost:5432/authors_db


## Arquitectura
Separación por capas:
* Controller
* Service
* Repository
* Entity

Principios SOLID aplicados:
* Responsabilidad única
* DTOs para entrada y salida
* Inyección de dependencias
* Uso de interfaces

## Documentación Relacionada
* README principal
* Publications Service
* Frontend

## Licencia
Este proyecto es software de código abierto bajo la Licencia MIT.