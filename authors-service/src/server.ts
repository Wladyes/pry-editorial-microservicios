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
    console.log("Connecting to database...");

    // Inicializar conexión TypeORM
    await AppDataSource.initialize();

    console.log("Database connected successfully!");
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log("\nServer is running!");
      console.log(`Port: ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log(`\nStarted at: ${new Date().toLocaleString()}`);
      console.log("======================================\n");
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Manejo de cierre graceful
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("Database connection closed");
  }

  process.exit(0);
});

// Iniciar servidor
startServer();
