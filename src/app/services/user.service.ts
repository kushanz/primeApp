import { httpResource,  } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Adjust the path as necessary
import { debounce, debounceTime, delay } from 'rxjs';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop'
import { UserModel } from '../dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() { }   

  search = signal<string>('');
  search$ = toObservable(this.search).pipe(debounceTime(400));
  searchDebounce = toSignal(this.search$, {initialValue: ''});
  // userResource = httpResource<any>(() => `${environment.baseUrl}/users`);
  userResource = rxResource({
  params: this.searchDebounce,
  stream: () => this.http.get<any[]>(`${environment.baseUrl}/users?search=${this.search()}`,{withCredentials: true}),
  defaultValue: [],
  });
  allUsersSignal = linkedSignal(() => this.userResource.value() ?? []);
  userLoading = computed(() => this.userResource.isLoading());
  // userResource = httpResource<any>(() => `http://localhost:3000/api/users?search=${this.search()}`);

  // userResource2 = httpResource<any>(() =>  ({
  //   url: `http://localhost:3000/api/users`,
  //   method: 'GET',
  //   params: { search: this.search() },
  //   headers: { 'Accept': 'application/json' },
  // }))

  saveUser(user: UserModel) {
    let obj = {
      name: user.firstname + ' ' + user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
    }
    const url = `${environment.baseUrl}/users`;
    return this.http.post(url, obj, {withCredentials: true});
  }

  addUser(user: any) {
    this.allUsersSignal.update(currentList => [user,...currentList]);
  }

  allUsers() {
    // delay response with 5 seconds to simulate loading

    return this.http.get<any[]>(`${environment.baseUrl}/users`).pipe(
      delay(5000)
    );
  }
}
