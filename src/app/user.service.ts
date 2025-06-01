import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  search = signal<string>('');
  userResource = httpResource<any>(() => `${environment.baseUrl}/users`);
  // userResource = httpResource<any>(() => `http://localhost:3000/api/users?search=${this.search()}`);

  // userResource2 = httpResource<any>(() =>  ({
  //   url: `http://localhost:3000/api/users`,
  //   method: 'GET',
  //   params: { search: this.search() },
  //   headers: { 'Accept': 'application/json' },
  // }))
}
