// Definición de los tipos y DTOs relacionados con publicaciones
export type EditorialStatus = 
  | 'DRAFT' 
  | 'INREVIEW' 
  | 'APPROVED' 
  | 'PUBLISHED' 
  | 'REJECTED';
// Interfaz Publication
export interface Publication {
  id: number;
  title: string;
  authorId: number;
  content?: string;
  status: EditorialStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PublicationWithAuthor extends Publication {
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    biography?: string;
    nationality?: string;
  };
}

export interface CreatePublicationDto {
  title: string;
  authorId: number;
  content?: string;
}

export interface ChangeStatusDto {
  status: EditorialStatus;
}
