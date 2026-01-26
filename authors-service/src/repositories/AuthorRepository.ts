import { AppDataSource } from "../config/data-source";
import { Author } from "../entities/Author.entity";
import { Repository } from "typeorm";

/**
 * AuthorRepository
 * 
 * Implementa el patrón Repository para encapsular
 * el acceso a datos de la entidad Author.
 * 
 * PATRÓN DE DISEÑO: Repository Pattern
 * - Separa la lógica de acceso a datos
 * - Facilita testing (se puede mockear)
 * - Abstrae detalles de TypeORM
 */
export class AuthorRepository {
  private repository: Repository<Author>;

  constructor() {
    this.repository = AppDataSource.getRepository(Author);
  }

  /**
   * Crear y guardar un nuevo autor
   * @param authorData - Datos del autor
   * @returns Author creado con ID
   */
  async create(authorData: Partial<Author>): Promise<Author> {
    const author = this.repository.create(authorData);
    return await this.repository.save(author);
  }

  /**
   * Buscar autor por ID
   * @param id - ID del autor
   * @returns Author o null si no existe
   */
  async findById(id: number): Promise<Author | null> {
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * Buscar autor por email
   * @param email - Email del autor
   * @returns Author o null si no existe
   */
  async findByEmail(email: string): Promise<Author | null> {
    return await this.repository.findOne({ where: { email } });
  }

  /**
   * Listar todos los autores con paginación
   * @param page - Número de página (desde 1)
   * @param limit - Cantidad por página
   * @returns Array de autores y total
   */
  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Author[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return { data, total };
  }

  /**
   * Actualizar un autor
   * @param id - ID del autor
   * @param authorData - Datos a actualizar
   * @returns Author actualizado o null si no existe
   */
  async update(id: number, authorData: Partial<Author>): Promise<Author | null> {
    const author = await this.findById(id);
    if (!author) {
      return null;
    }

    Object.assign(author, authorData);
    return await this.repository.save(author);
  }

  /**
   * Eliminar un autor
   * @param id - ID del autor
   * @returns true si se eliminó, false si no existía
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Verificar si existe un autor por email
   * @param email - Email a verificar
   * @returns true si existe, false si no
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.repository.count({ where: { email } });
    return count > 0;
  }

  /**
   * Buscar autores por nacionalidad
   * @param nationality - Nacionalidad a buscar
   * @returns Array de autores
   */
  async findByNationality(nationality: string): Promise<Author[]> {
    return await this.repository.find({
      where: { nationality },
      order: { lastName: "ASC" },
    });
  }
}
