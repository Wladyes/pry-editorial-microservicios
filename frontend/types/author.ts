export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
}

export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  email: string;
  biography?: string;
  nationality?: string;
}
