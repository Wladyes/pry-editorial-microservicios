import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { AuthorController } from "./controllers/AuthorController";
import { swaggerSpec } from "./config/swagger.config";

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app: Application = express();

// ============================================
// MIDDLEWARES
// ============================================

// Seguridad HTTP headers
app.use(helmet());

// CORS (permitir frontend)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3001",
    credentials: true,
  })
);

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de requests
app.use(morgan("dev"));

// ============================================
// SWAGGER DOCUMENTATION
// ============================================

/**
 * @swagger
 * /:
 *   get:
 *     summary: Información de la API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Información del servicio
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Authors Service API - Swagger",
}));

// ============================================
// RUTAS
// ============================================

// Ruta de prueba (health check)
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Authors Service API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
    documentation: "http://localhost:3000/api-docs",
    endpoints: {
      health: "GET /health",
      swagger: "GET /api-docs",
      authors: "GET /authors",
      createAuthor: "POST /authors",
      getAuthor: "GET /authors/:id",
      updateAuthor: "PATCH /authors/:id",
      deleteAuthor: "DELETE /authors/:id",
    },
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check del servicio
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 125.456
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 database:
 *                   type: string
 *                   example: connected
 */
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: "connected",
  });
});

// Registrar rutas de Authors
const authorController = new AuthorController();
app.use("/authors", authorController.router);

// ============================================
// MANEJO DE ERRORES
// ============================================

// Ruta no encontrada (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Manejador de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err);

  res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
