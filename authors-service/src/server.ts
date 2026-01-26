import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

// ============================================
// INICIALIZAR BASE DE DATOS Y SERVIDOR
// ============================================

async function startServer() {
  try {
    console.log("í´„ Connecting to database...");

    // Inicializar conexiÃ³n TypeORM
    await AppDataSource.initialize();

    console.log("âœ… Database connected successfully!");
    console.log(`í³Š Database: ${process.env.DB_NAME}`);
    console.log(`í´Œ Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log("\níº€ Server is running!");
      console.log(`í³¡ Port: ${PORT}`);
      console.log(`í¼ URL: http://localhost:${PORT}`);
      console.log(`í¿¥ Health: http://localhost:${PORT}/health`);
      console.log(`\nâ° Started at: ${new Date().toLocaleString()}`);
      console.log("======================================\n");
    });
  } catch (error) {
    console.error("âŒ Error starting server:", error);
    process.exit(1);
  }
}

// Manejo de cierre graceful
process.on("SIGINT", async () => {
  console.log("\ní»‘ Shutting down gracefully...");

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("âœ… Database connection closed");
  }

  process.exit(0);
});

// Iniciar servidor
startServer();
