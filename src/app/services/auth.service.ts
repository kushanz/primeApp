import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }


  userLogin(user:any) {
    const url = `${environment.baseUrl}/auth/login`;
    return this.http.post(url, user,{withCredentials: true}).pipe(delay(2000));
  }

  userRegister(user:any) {
    const url = `${environment.baseUrl}/auth/register`;
    return this.http.post(url, user)
  }
}
