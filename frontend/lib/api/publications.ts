import axios from 'axios';
import { authorsApi } from './authors';

// Configurar la URL base de la API de publicaciones
const API_URL = process.env.NEXT_PUBLIC_PUBLICATIONS_API || 'http://localhost:8080';

// Definición de los tipos y DTOs
export type EditorialStatus = 
  | 'DRAFT' 
  | 'INREVIEW' 
  | 'APPROVED' 
  | 'PUBLISHED' 
  | 'REJECTED';

// Interfaz de Publicación
export interface Publication {
  id: number;
  title: string;
  authorId: number;
  content?: string;
  status: EditorialStatus;
  createdAt: string;
  updatedAt: string;
}

// Publicación con datos del autor (requisito documento)
export interface PublicationWithAuthor extends Publication {
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// DTO para crear una nueva publicación
export interface CreatePublicationDto {
  title: string;
  authorId: number;
  content?: string;
}

// DTO para cambiar el estado editorial
export interface ChangeStatusDto {
  status: EditorialStatus;
}

// API de publicaciones con métodos para interactuar con el backend
export const publicationsApi = {
  // Listar todas las publicaciones
  getAll: async (): Promise<Publication[]> => {
    const { data } = await axios.get(`${API_URL}/api/Publications`);
    return data;
  },

  // Obtener publicación por ID
  getById: async (id: number): Promise<Publication> => {
    const { data } = await axios.get(`${API_URL}/api/Publications/${id}`);
    return data;
  },

  // Obtener publicación con datos del autor (requisito documento)
  getByIdWithAuthor: async (id: number): Promise<PublicationWithAuthor> => {
    const publication = await publicationsApi.getById(id);
    try {
      const author = await authorsApi.getById(publication.authorId);
      return { ...publication, author };
    } catch {
      return publication;
    }
  },

  // Crear nueva publicación (valida autor existe)
  create: async (dto: CreatePublicationDto): Promise<Publication> => {
    const { data } = await axios.post(`${API_URL}/api/Publications`, dto);
    return data;
  },

  // Cambiar estado editorial (requisito documento)
  changeStatus: async (id: number, dto: ChangeStatusDto): Promise<Publication> => {
    const { data } = await axios.patch(
      `${API_URL}/api/Publications/${id}/status`,
      dto
    );
    return data;
  },
};
