import { Author } from "../entities/Author.entity";

/**
 * AuthorResponseDto
 * 
 * Data Transfer Object para respuestas de autor.
 * Transforma la entidad Author en un formato limpio para el cliente.
 * 
 * BUENA PRÁCTICA: No exponer entidades TypeORM directamente
 * PATRÓN: DTO Pattern
 */

export class AuthorResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;

  constructor(author: Author) {
    this.id = author.id;
    this.firstName = author.firstName;
    this.lastName = author.lastName;
    this.email = author.email;
    this.biography = author.biography;
    this.nationality = author.nationality;
    
    // FIX: Manejar birthDate como string o Date
    this.birthDate = this.formatDate(author.birthDate);
    
    // FIX: Manejar timestamps como string o Date
    this.createdAt = this.formatTimestamp(author.createdAt);
    this.updatedAt = this.formatTimestamp(author.updatedAt);
  }

  /**
   * Formatear fecha (puede venir como Date o string desde TypeORM)
   */
  private formatDate(date: Date | string | undefined): string | undefined {
    if (!date) return undefined;
    
    // Si ya es string, retornar directamente
    if (typeof date === 'string') {
      return date;
    }
    
    // Si es Date, convertir a formato YYYY-MM-DD
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    
    return undefined;
  }

  /**
   * Formatear timestamp (puede venir como Date o string desde TypeORM)
   */
  private formatTimestamp(timestamp: Date | string): string {
    // Si ya es string, retornar directamente
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    
    // Si es Date, convertir a ISO string
    if (timestamp instanceof Date) {
      return timestamp.toISOString();
    }
    
    return new Date().toISOString();
  }

  /**
   * Método estático para convertir múltiples autores
   * @param authors - Array de entidades Author
   * @returns Array de DTOs
   */
  static fromArray(authors: Author[]): AuthorResponseDto[] {
    return authors.map((author) => new AuthorResponseDto(author));
  }

  /**
   * Obtener nombre completo
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
