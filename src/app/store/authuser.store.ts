import { computed, effect, inject } from '@angular/core';
import {getState, patchState, signalStore, withComputed, withHooks, withMethods,withProps ,withState} from '@ngrx/signals'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

type loggedUserState = {
  loggedUser: any;
  isLoggedIn: boolean;
  token: string;
  loading: boolean;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: loggedUserState = {
  loggedUser: {},
  isLoggedIn: false,
  token: '',
  loading: false,
  accessToken: '',
  refreshToken: ''

}

export const authUserStore = signalStore(
  {providedIn: 'root'}, 

  withState(initialState),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({

    // register(registerUser:any) {
    //   patchState(store,(state) => ({...state, loading: true}));
    //   authService.userRegister(registerUser).subscribe({
    //     next: (res) => {
    //       localStorage.setItem('auth_user', JSON.stringify(res));
    //       patchState(store,(state) => ({...state, loggedUser: res, isLoggedIn: true, loading: false}));
    //     }
    //   })
    // },
    getUser() {
      const state = getState(store);
      return computed(() => state.loggedUser);
    },
    getAccessToken() {
      const state = getState(store);
      return computed(() => state.accessToken);
    },

    setuser(user:any):any {
      // save localstorage user object without token for security
      const {token, ...userdata} = user;
      localStorage.setItem('auth_user', JSON.stringify(userdata));
      patchState(store,(state) => ({...state, loggedUser: user, isLoggedIn: true, loading: false}));
  
    },

    removeuser() {
      // Call logout API to clear server-side cookies
      authService.logout().subscribe({
        next: () => {
          localStorage.removeItem('auth_user');
          patchState(store,(state) => ({...state, loggedUser: {}, isLoggedIn: false}));
          router.navigate(['/login']);
        },
        error: () => {
          // Even if API fails, clear local state
          localStorage.removeItem('auth_user');
          patchState(store,(state) => ({...state, loggedUser: {}, isLoggedIn: false}));
          router.navigate(['/login']);
        }
      });
    },
    updateLoading(loading:boolean) {
      patchState(store,(state) => ({...state, loading: loading}));
    }

  })),

  withHooks({
    onInit: (store,authService = inject(AuthService)) => {
      const authUserFromLS = JSON.parse(localStorage.getItem('auth_user') || '{}');

      patchState(store, (state) => ({
        ...state,
        loggedUser: authUserFromLS,
        isLoggedIn: !!authUserFromLS?.token,
        token: authUserFromLS?.token || '',
      }))

      effect(() => {
        const state = getState(store)
        localStorage.setItem('auth_user', JSON.stringify(state.loggedUser));
      })

      // authService.userRegister({}).subscribe((res) => {
        
      // })
      // const token = localStorage.getItem('token');
      // if (token) {
      //   patchState({isLoggedIn: true, token: token});
      // }
    },
  })
)