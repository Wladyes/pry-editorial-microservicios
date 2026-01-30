// Definición de la interfaz Author y CreateAuthorDto
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
}

// DTO para crear un nuevo autor
export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
}
