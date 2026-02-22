export interface UserModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
}
export type UserRole = 'admin' | 'user' | 'manager';