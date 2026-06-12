import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, Observable } from 'rxjs';

export interface AuthUser {
  id?: number;
  name: string;
  email: string;
  role?: string;
  email_verified_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  device_name?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_name?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface MessageOnlyResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }


  userLogin(user: LoginRequest) {
    const url = `${environment.baseUrl}/login`;
    return this.http.post<LoginResponse>(url, user).pipe(delay(2000));
  }

  userRegister(user: RegisterRequest) {
    const url = `${environment.baseUrl}/register`;
    return this.http.post<RegisterResponse>(url, user);
  }

  me(): Observable<CurrentUserResponse> {
    const url = `${environment.baseUrl}/me`;
    return this.http.get<CurrentUserResponse>(url);
  }

  logout(): Observable<MessageOnlyResponse> {
    const url = `${environment.baseUrl}/logout`;
    return this.http.post<MessageOnlyResponse>(url, {});
  }
}
