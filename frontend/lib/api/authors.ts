import axios from 'axios';

// Configurar la URL base de la API de autores
const API_URL = process.env.NEXT_PUBLIC_AUTHORS_API || 'http://localhost:3000';

// Definición de la interfaz Author y DTOs
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
  birthDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTO para crear un nuevo autor
export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
}

// DTO para actualizar un autor existente
export interface UpdateAuthorDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  biography?: string;
  nationality?: string;
}

// API de autores con métodos para interactuar con el backend
export const authorsApi = {
  getAll: async (): Promise<Author[]> => {
    const response = await axios.get(`${API_URL}/authors`);
    const data = response.data;
    
    // Manejar formato { data: [...], meta: {...} }
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // Manejar array directo
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  },
  // Obtener un autor por ID
  getById: async (id: number): Promise<Author> => {
    const { data } = await axios.get(`${API_URL}/authors/${id}`);
    return data;
  },

  // Crear un nuevo autor (POST)
  create: async (dto: CreateAuthorDto): Promise<Author> => {
    const { data } = await axios.post(`${API_URL}/authors`, dto);
    return data;
  },
  
  //Actualizar autor (PATCH)
  update: async (id: number, dto: UpdateAuthorDto): Promise<Author> => {
    const { data } = await axios.patch(`${API_URL}/authors/${id}`, dto);
    return data;
  },

  // Eliminar autor (DELETE)
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/authors/${id}`);
  },
};
