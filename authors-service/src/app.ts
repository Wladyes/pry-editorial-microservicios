import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { AuthorController } from "./controllers/AuthorController";
import { swaggerSpec } from "./config/swagger.config";

dotenv.config();

const app: Application = express();

// ============================================
// MIDDLEWARES
// ============================================

app.use(helmet());

// ✅ CORS actualizado para frontend
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://192.168.56.1:3001",
      "http://localhost:3000", // temporal
      "http://192.168.56.1:3000" // temporal
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ============================================
// SWAGGER DOCUMENTATION
// ============================================

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Authors Service API - Swagger",
}));

// ============================================
// RUTAS
// ============================================

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

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: "connected",
  });
});

const authorController = new AuthorController();
app.use("/authors", authorController.router);

// ============================================
// MANEJO DE ERRORES
// ============================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

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
