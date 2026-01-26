import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  Length, 
  IsDateString 
} from "class-validator";

/**
 * CreateAuthorDto
 * 
 * Data Transfer Object para crear un autor.
 * Define la estructura de datos de entrada y sus validaciones.
 * 
 * BUENA PRÁCTICA: Uso de DTOs (no exponer entidades directamente)
 * PATRÓN: DTO Pattern
 */
export class CreateAuthorDto {
  @IsString({ message: "firstName debe ser una cadena de texto" })
  @Length(1, 100, { message: "firstName debe tener entre 1 y 100 caracteres" })
  firstName!: string;

  @IsString({ message: "lastName debe ser una cadena de texto" })
  @Length(1, 100, { message: "lastName debe tener entre 1 y 100 caracteres" })
  lastName!: string;

  @IsEmail({}, { message: "email debe ser un correo electrónico válido" })
  email!: string;

  @IsOptional()
  @IsString({ message: "biography debe ser una cadena de texto" })
  biography?: string;

  @IsOptional()
  @IsString({ message: "nationality debe ser una cadena de texto" })
  @Length(1, 100, { message: "nationality debe tener entre 1 y 100 caracteres" })
  nationality?: string;

  @IsOptional()
  @IsDateString({}, { message: "birthDate debe ser una fecha válida (ISO 8601)" })
  birthDate?: string;
}
