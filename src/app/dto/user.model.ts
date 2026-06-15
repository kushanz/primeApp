export interface UserCreateModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UsersMeta {
  current_page: number;
  per_page: number;
  search: string | null;
  total: number;
  last_page: number;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: UserModel[];
  meta: UsersMeta;
}

export type UserRole = 'admin' | 'user' | 'manager' | 'customer';
