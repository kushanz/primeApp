import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() { }

  search = signal<string>('');
  userResource = httpResource<any>(() => `${environment.baseUrl}/users`);
  allUsersSignal = computed(() => this.userResource.value ?? []);
  // userResource = httpResource<any>(() => `http://localhost:3000/api/users?search=${this.search()}`);

  // userResource2 = httpResource<any>(() =>  ({
  //   url: `http://localhost:3000/api/users`,
  //   method: 'GET',
  //   params: { search: this.search() },
  //   headers: { 'Accept': 'application/json' },
  // }))

  allUSers() {
    return this.http.get<any[]>(`${environment.baseUrl}/users`);
  }
}
