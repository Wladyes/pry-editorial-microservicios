# Publications Service

Microservicio para la gestión de publicaciones y estados editoriales del sistema editorial.

## Desarrolladora
**Sandy Mariño** – [@Jessy-sylve](https://github.com/Jessy-sylve)

## Descripción
Servicio encargado de administrar publicaciones y su flujo editorial. Valida la existencia de autores mediante comunicación con Authors Service. Implementa arquitectura en capas, principios SOLID y patrones de diseño.

## Tecnologías
* .NET 8
* Entity Framework Core
* MySQL 8.0
* C#

## Endpoints
**Base URL:** http://localhost:8080

GET /publications Listar publicaciones
GET /publications/:id Obtener publicación
POST /publications Crear publicación
PATCH /publications/:id/status Cambiar estado editorial
GET /health Health check


## Estados Editoriales
* DRAFT – Borrador inicial
* INREVIEW – En revisión
* APPROVED – Aprobado
* PUBLISHED – Publicado
* REJECTED – Rechazado

## Modelo de Datos
* Clase base abstracta: Publication
* Clases derivadas: ScientificPublication, LiteraryPublication

## Patrones Implementados
* Repository Pattern – Abstracción del acceso a datos
* Adapter Pattern – Cliente HTTP para validar autores
* Strategy Pattern – Gestión de transiciones de estados editoriales

## Dependencias
* Authors Service: validación obligatoria de existencia del autor
* Comunicación HTTP REST
* Endpoint consumido: GET http://authors-service:3000/authors/{id}
* Manejo de errores: autor no encontrado, timeout, servicio no disponible

## Ejecución

### Docker Compose
docker compose up publications-service db-publications


### Local
dotnet restore
dotnet run


## Configuración
ConnectionStrings__DefaultConnection=Server=localhost;Database=publications_db;...
AuthorsServiceUrl=http://localhost:3000
ASPNETCORE_URLS=http://+:8080


## Arquitectura
* Controller
* Service
* Repository
* Entity

## Principios SOLID
* Responsabilidad única
* DTOs para entrada y salida
* Inyección de dependencias
* Uso de interfaces
* Manejo centralizado de errores

## Validaciones
* Validar campos requeridos
* Verificar existencia del autor
* Estado inicial: DRAFT
* Transiciones: DRAFT → INREVIEW → APPROVED → PUBLISHED

## Documentación Relacionada
* README principal
* Authors Service
* Frontend

## Licencia
Este proyecto es software de código abierto bajo la Licencia MIT.