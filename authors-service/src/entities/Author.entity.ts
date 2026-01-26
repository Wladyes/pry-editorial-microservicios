import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./Person.entity";

/**
 * Clase derivada Author que extiende Person
 * 
 * Representa un autor en el sistema editorial.
 * Hereda atributos básicos de Person (id, firstName, lastName, email)
 * y agrega atributos específicos de un autor.
 * 
 * @Entity: Decorador TypeORM que mapea esta clase a la tabla "authors"
 */
@Entity("authors")
export class Author extends Person {
  @Column({ type: "text", nullable: true })
  biography?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  nationality?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  /**
   * Implementación del método abstracto de Person
   * @returns Nombre completo del autor (firstName + lastName)
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Método adicional específico de Author
   * @returns Presentación completa del autor
   */
  getAuthorPresentation(): string {
    const nationality = this.nationality ? ` (${this.nationality})` : "";
    return `${this.getFullName()}${nationality}`;
  }
}
