import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { debounceTime, map, tap } from 'rxjs';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserCreateModel, UserModel, UsersMeta, UsersResponse } from '../dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() { }   

  search = signal<string>('');
  search$ = toObservable(this.search).pipe(debounceTime(400));
  searchDebounce = toSignal(this.search$, {initialValue: ''});
  userResource = rxResource({
    params: this.searchDebounce,
    stream: () =>
      this.http
        .get<UsersResponse>(`${environment.baseUrl}/users?search=${this.search()}`)
        .pipe(
          tap((response) => this.usersMeta.set(response.meta)),
          map((response) => response.data)
        ),
    defaultValue: [],
  });
  allUsersSignal = linkedSignal(() => this.userResource.value() ?? []);
  userLoading = computed(() => this.userResource.isLoading());
  usersMeta = signal<UsersMeta | null>(null);

  saveUser(user: UserCreateModel) {
    const url = `${environment.baseUrl}/users`;
    return this.http.post(url, user);
  }

  addUser(user: UserModel) {
    this.allUsersSignal.update(currentList => [user,...currentList]);
  }

  allUsers() {
    return this.http.get<UsersResponse>(`${environment.baseUrl}/users`).pipe(
      map((response) => response.data)
    );
  }
}
