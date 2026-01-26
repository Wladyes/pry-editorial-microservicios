import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Clase abstracta Person
 * 
 * Representa una persona genérica en el sistema.
 * Esta clase NO se mapea directamente a una tabla en la BD,
 * sino que sirve como base para clases derivadas como Author.
 * 
  */
export abstract class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  /**
   * Método abstracto: debe ser implementado por clases derivadas
   * @returns Nombre completo de la persona
   */
  abstract getFullName(): string;

  /**
   * Método concreto: heredado por todas las clases derivadas
   * @returns Información de contacto formateada
   */
  getContactInfo(): string {
    return `${this.getFullName()} - ${this.email}`;
  }
}
