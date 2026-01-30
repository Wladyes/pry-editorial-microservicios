# Sistema Editorial - Arquitectura de Microservicios

Sistema de gestión editorial basado en microservicios para la administración de autores y publicaciones, implementando principios SOLID y patrones de diseño.

## Equipo de Desarrollo

| Desarrollador | Rol | GitHub |
|--------------|-----|--------|
| Wladymir Escobar | Desarrollador Microservicio Autores | [@Wladyes] |
| Sandy Mariño | Desarrolladora Microservicio Publicaciones | [@Jessy-sylve] |
| Margarita Fajardo | Desarrolladora Frontend | [@MFajardo2812] |

## Descripción

El sistema permite gestionar el ciclo de vida de autores y publicaciones en una editorial digital. Está compuesto por dos microservicios independientes que se comunican mediante APIs REST y un frontend web para la interacción con usuarios.

**Características principales:**
- Gestión completa de autores (CRUD)
- Gestión de publicaciones con estados editoriales
- Validación de dependencias entre microservicios
- Proceso editorial modelado en BPMN
- Despliegue con Docker Compose

## Arquitectura

El sistema implementa una arquitectura de microservicios con las siguientes características:

**Authors Service (Node.js)**
- Gestión de autores
- Base de datos PostgreSQL independiente
- API REST para operaciones CRUD

**Publications Service (.NET)**
- Gestión de publicaciones y estados editoriales
- Base de datos MySQL independiente
- Validación de autores mediante comunicación con Authors Service
- Estados: DRAFT, INREVIEW, APPROVED, PUBLISHED, REJECTED

**Frontend (Next.js)**
- Interfaz web para usuarios finales
- Consumo de APIs de ambos microservicios
- Gestión de autores y publicaciones

## Tecnologías

**Backend:**
- Authors Service: Node.js 20, Express, TypeORM, PostgreSQL 15
- Publications Service: .NET 8, Entity Framework Core, MySQL 8.0

**Frontend:**
- Next.js 14 con App Router
- TypeScript
- Tailwind CSS

**Infraestructura:**
- Docker y Docker Compose
- Redes bridge para comunicación entre servicios
- Volúmenes persistentes para bases de datos

## Estructura del Proyecto

pry-editorial-microservicios/ ├── docker-compose.yml ├── README.md ├── bpmn/ │ ├── proceso-editorial.bpmn │ └── capturas/ ├── authors-service/ │ ├── Dockerfile │ ├── README.md │ └── src/ ├── PublicationsService/ │ ├── Dockerfile │ ├── README.md │ └── Controllers/ └── frontend/ ├── Dockerfile ├── README.md └── app


## Ejecución

### Prerequisitos

- Docker Desktop instalado y en ejecución
- Puertos disponibles: 3000, 3001, 3306, 5432, 8080

### Instalación

```bash
git clone https://github.com/Wladyes/pry-editorial-microservicios.git
cd pry-editorial-microservicios
docker compose up --build
Acceso a Servicios
Servicio	URL
Frontend	http://localhost:3001
Authors API	http://localhost:3000
Publications API	http://localhost:8080

Export as CSV
Endpoints Principales
Authors Service

GET    /authors          Listar autores
GET    /authors/:id      Obtener autor por ID
POST   /authors          Crear nuevo autor
PUT    /authors/:id      Actualizar autor
DELETE /authors/:id      Eliminar autor
Publications Service

GET    /publications              Listar publicaciones
GET    /publications/:id          Obtener publicación por ID
POST   /publications              Crear publicación
PATCH  /publications/:id/status   Cambiar estado editorial
Modelado BPMN
El proceso editorial está modelado en BPMN 2.0 utilizando Camunda Modeler. El modelo incluye:
Participantes: Autor, Editor, Revisor
Flujo completo: Desde creación de borrador hasta publicación o rechazo
Decisiones editoriales: Implementadas mediante gateways exclusivos
Simulación validada: Token Simulation con tres escenarios completos
Los archivos BPMN y las capturas de simulación están disponibles en la carpeta bpmn/
Principios de Diseño
Arquitectura por Capas
Cada microservicio implementa separación de responsabilidades mediante capas:

Controller (Presentación) → Service (Lógica de Negocio) → Repository (Acceso a Datos) → Entity (Dominio)
Patrones de Diseño Aplicados
Repository Pattern: Abstracción del acceso a datos en ambos microservicios
Adapter Pattern: Cliente HTTP para comunicación entre Publications y Authors
Strategy Pattern: Gestión de transiciones de estados editoriales
Factory Pattern: Creación de entidades especializadas
Principios SOLID
Responsabilidad única por clase y módulo
Uso de interfaces y clases abstractas
DTOs para entrada y salida de datos
Inyección de dependencias
Manejo centralizado de errores
Gestión
Detener Servicios

docker compose down
Ver Logs

docker compose logs -f
Documentación Adicional
Cada módulo contiene su propio README con información específica:
Authors Service README
Publications Service README
Frontend README
Información Académica
Institución: Universidad de las Fuerzas Armadas ESPE
Departamento: Ciencias de la Computación
Asignatura: Arquitectura de Software
Año: 2026
Licencia
Este proyecto es software de código abierto bajo la Licencia MIT.
Copyright (c) 2026 Wladymir Escobar, Sandy Mariño, Margarita Fajardo
