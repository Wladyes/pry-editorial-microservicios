import swaggerJsdoc from "swagger-jsdoc";

/**
 * Configuración de Swagger/OpenAPI
 * 
 * Genera documentación automática de la API REST
 * Accesible en: http://localhost:3000/api-docs
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authors Service API",
      version: "1.0.0",
      description: "Microservicio de gestión de autores para sistema editorial",
      contact: {
        name: "Equipo de Desarrollo",
        email: "support@editorial.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de producción (Docker)",
      },
    ],
    tags: [
      {
        name: "Authors",
        description: "Operaciones sobre autores",
      },
      {
        name: "Health",
        description: "Estado del servicio",
      },
    ],
    components: {
      schemas: {
        Author: {
          type: "object",
          required: ["firstName", "lastName", "email"],
          properties: {
            id: {
              type: "integer",
              description: "ID único del autor",
              example: 1,
            },
            firstName: {
              type: "string",
              description: "Nombre del autor",
              minLength: 1,
              maxLength: 100,
              example: "Gabriel",
            },
            lastName: {
              type: "string",
              description: "Apellido del autor",
              minLength: 1,
              maxLength: 100,
              example: "García Márquez",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email único del autor",
              example: "gabriel@example.com",
            },
            biography: {
              type: "string",
              description: "Biografía del autor",
              example: "Escritor colombiano, Premio Nobel de Literatura 1982",
            },
            nationality: {
              type: "string",
              description: "Nacionalidad del autor",
              maxLength: 100,
              example: "Colombia",
            },
            birthDate: {
              type: "string",
              format: "date",
              description: "Fecha de nacimiento",
              example: "1927-03-06",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación del registro",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        CreateAuthorDto: {
          type: "object",
          required: ["firstName", "lastName", "email"],
          properties: {
            firstName: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Isabel",
            },
            lastName: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Allende",
            },
            email: {
              type: "string",
              format: "email",
              example: "isabel@example.com",
            },
            biography: {
              type: "string",
              example: "Escritora chilena reconocida mundialmente",
            },
            nationality: {
              type: "string",
              maxLength: 100,
              example: "Chile",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1942-08-02",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            statusCode: {
              type: "integer",
              example: 400,
            },
            message: {
              type: "string",
              example: "Validation failed",
            },
            error: {
              type: "string",
              example: "Bad Request",
            },
          },
        },
        PaginatedAuthors: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Author",
              },
            },
            meta: {
              type: "object",
              properties: {
                page: {
                  type: "integer",
                  example: 1,
                },
                limit: {
                  type: "integer",
                  example: 10,
                },
                total: {
                  type: "integer",
                  example: 25,
                },
                totalPages: {
                  type: "integer",
                  example: 3,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/**/*.ts"], // Rutas donde buscar documentación
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
