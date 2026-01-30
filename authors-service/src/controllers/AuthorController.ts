import { Router, Request, Response, NextFunction } from "express";
import { AuthorService } from "../services/AuthorService";
import { CreateAuthorDto } from "../dtos/create-author.dto";

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       $ref: '#/components/schemas/Author'
 *     CreateAuthorDto:
 *       $ref: '#/components/schemas/CreateAuthorDto'
 *     ErrorResponse:
 *       $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * AuthorController
 * 
 * Controlador Express que expone endpoints REST para Authors.
 */

export class AuthorController {
  public router: Router;
  private authorService: AuthorService;
  // Inicializar rutas y servicios
  constructor() {
    this.router = Router();
    this.authorService = new AuthorService();
    this.initializeRoutes();
  }
   //
  private initializeRoutes(): void {
    this.router.post("/", this.createAuthor.bind(this));
    this.router.get("/", this.getAllAuthors.bind(this));
    this.router.get("/:id", this.getAuthorById.bind(this));
    this.router.patch("/:id", this.updateAuthor.bind(this));
    this.router.delete("/:id", this.deleteAuthor.bind(this));
  }

  /**
   * @swagger
   * /authors:
   *   post:
   *     summary: Crear un nuevo autor
   *     tags: [Authors]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAuthorDto'
   *     responses:
   *       201:
   *         description: Autor creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Author'
   *       400:
   *         description: Error de validación o email duplicado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Error interno del servidor
   */
  // Crear un nuevo autor
  private async createAuthor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createAuthorDto: CreateAuthorDto = req.body;
      const author = await this.authorService.createAuthor(createAuthorDto);
      res.status(201).json(author);
    } catch (error: any) {
      if (
        error.message.includes("Validation failed") ||
        error.message.includes("already exists")
      ) {
        res.status(400).json({
          statusCode: 400,
          message: error.message,
          error: "Bad Request",
        });
      } else {
        next(error);
      }
    }
  }

  /**
   * @swagger
   * /authors/{id}:
   *   get:
   *     summary: Obtener autor por ID
   *     tags: [Authors]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del autor
   *     responses:
   *       200:
   *         description: Autor encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Author'
   *       400:
   *         description: ID inválido
   *       404:
   *         description: Autor no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // Obtener autor por ID
  private async getAuthorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid author ID",
          error: "Bad Request",
        });
        return;
      }

      const author = await this.authorService.getAuthorById(id);
      res.status(200).json(author);
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({
          statusCode: 404,
          message: error.message,
          error: "Not Found",
        });
      } else {
        next(error);
      }
    }
  }

  /**
   * @swagger
   * /authors:
   *   get:
   *     summary: Listar autores con paginación
   *     tags: [Authors]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Número de página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Cantidad de resultados por página
   *     responses:
   *       200:
   *         description: Lista de autores
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedAuthors'
   */
  // Listar autores con paginación
  private async getAllAuthors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.authorService.getAllAuthors(page, limit);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * @swagger
   * /authors/{id}:
   *   patch:
   *     summary: Actualizar un autor
   *     tags: [Authors]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del autor
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               biography:
   *                 type: string
   *               nationality:
   *                 type: string
   *     responses:
   *       200:
   *         description: Autor actualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Author'
   *       404:
   *         description: Autor no encontrado
   */
  // Actualizar un autor
  private async updateAuthor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid author ID",
          error: "Bad Request",
        });
        return;
      }

      const updateData = req.body;
      const author = await this.authorService.updateAuthor(id, updateData);
      res.status(200).json(author);
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({
          statusCode: 404,
          message: error.message,
          error: "Not Found",
        });
      } else if (error.message.includes("already exists")) {
        res.status(400).json({
          statusCode: 400,
          message: error.message,
          error: "Bad Request",
        });
      } else {
        next(error);
      }
    }
  }

  /**
   * @swagger
   * /authors/{id}:
   *   delete:
   *     summary: Eliminar un autor
   *     tags: [Authors]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del autor
   *     responses:
   *       204:
   *         description: Autor eliminado exitosamente
   *       404:
   *         description: Autor no encontrado
   */
  // Eliminar un autor
  private async deleteAuthor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid author ID",
          error: "Bad Request",
        });
        return;
      }

      await this.authorService.deleteAuthor(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("not found")) {
        res.status(404).json({
          statusCode: 404,
          message: error.message,
          error: "Not Found",
        });
      } else {
        next(error);
      }
    }
  }
}
