import { AuthorRepository } from "../repositories/AuthorRepository";
import { CreateAuthorDto } from "../dtos/create-author.dto";
import { AuthorResponseDto } from "../dtos/author-response.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

/**
 * AuthorService
 * 
 * Capa de servicios que contiene la lógica de negocio.
 * Coordina entre controladores y repositorios.
 * 
 * RESPONSABILIDADES:
 * - Validaciones de negocio
 * - Transformación Entity ↔ DTO
 * - Orquestación de operaciones
 * - Manejo de errores de negocio
 * 
 * PRINCIPIOS SOLID:
 * - Single Responsibility: solo lógica de negocio de autores
 * - Dependency Inversion: depende de abstracciones (Repository)
 */
export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  /**
   * Crear un nuevo autor
   * @param createAuthorDto - Datos del autor a crear
   * @returns AuthorResponseDto o lanza error
   */
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorResponseDto> {
    // 1. Validar DTO
    const dto = plainToClass(CreateAuthorDto, createAuthorDto);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map((error) => Object.values(error.constraints || {})).flat();
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }

    // 2. Validar regla de negocio: email único
    const existingAuthor = await this.authorRepository.findByEmail(createAuthorDto.email);
    if (existingAuthor) {
      throw new Error(`Email ${createAuthorDto.email} already exists`);
    }

    // 3. Crear autor en BD
    const author = await this.authorRepository.create({
      firstName: createAuthorDto.firstName,
      lastName: createAuthorDto.lastName,
      email: createAuthorDto.email,
      biography: createAuthorDto.biography,
      nationality: createAuthorDto.nationality,
      birthDate: createAuthorDto.birthDate ? new Date(createAuthorDto.birthDate) : undefined,
    });

    // 4. Transformar a DTO de respuesta
    return new AuthorResponseDto(author);
  }

  /**
   * Obtener autor por ID
   * @param id - ID del autor
   * @returns AuthorResponseDto o lanza error si no existe
   */
  async getAuthorById(id: number): Promise<AuthorResponseDto> {
    // Validar que ID sea válido
    if (!id || id <= 0) {
      throw new Error("Invalid author ID");
    }

    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }

    return new AuthorResponseDto(author);
  }

  /**
   * Listar autores con paginación
   * @param page - Número de página (desde 1)
   * @param limit - Cantidad por página
   * @returns Objeto con data (array de DTOs) y metadata de paginación
   */
  async getAllAuthors(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    data: AuthorResponseDto[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    // Validar parámetros de paginación
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100; // límite máximo

    const { data, total } = await this.authorRepository.findAll(page, limit);

    return {
      data: AuthorResponseDto.fromArray(data),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Actualizar un autor
   * @param id - ID del autor
   * @param updateData - Datos a actualizar
   * @returns AuthorResponseDto actualizado o lanza error
   */
  async updateAuthor(
    id: number,
    updateData: Partial<CreateAuthorDto>
  ): Promise<AuthorResponseDto> {
    // 1. Validar que el autor existe
    const existingAuthor = await this.authorRepository.findById(id);
    if (!existingAuthor) {
      throw new Error(`Author with id ${id} not found`);
    }

    // 2. Si se actualiza email, validar que no exista otro autor con ese email
    if (updateData.email && updateData.email !== existingAuthor.email) {
      const authorWithEmail = await this.authorRepository.findByEmail(updateData.email);
      if (authorWithEmail) {
        throw new Error(`Email ${updateData.email} already exists`);
      }
    }

    // 3. Actualizar
    const updatedAuthor = await this.authorRepository.update(id, {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      biography: updateData.biography,
      nationality: updateData.nationality,
      birthDate: updateData.birthDate ? new Date(updateData.birthDate) : undefined,
    });

    if (!updatedAuthor) {
      throw new Error(`Failed to update author with id ${id}`);
    }

    return new AuthorResponseDto(updatedAuthor);
  }

  /**
   * Eliminar un autor
   * @param id - ID del autor
   * @returns true si se eliminó exitosamente
   */
  async deleteAuthor(id: number): Promise<boolean> {
    // Validar que el autor existe
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new Error(`Author with id ${id} not found`);
    }

    return await this.authorRepository.delete(id);
  }

  /**
   * Buscar autores por nacionalidad
   * @param nationality - Nacionalidad a buscar
   * @returns Array de AuthorResponseDto
   */
  async getAuthorsByNationality(nationality: string): Promise<AuthorResponseDto[]> {
    if (!nationality || nationality.trim() === "") {
      throw new Error("Nationality is required");
    }

    const authors = await this.authorRepository.findByNationality(nationality);
    return AuthorResponseDto.fromArray(authors);
  }
}
