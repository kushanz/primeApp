import { inject } from '@angular/core';
import {getState, patchState, signalStore, withComputed, withHooks, withMethods,withProps ,withState} from '@ngrx/signals'
import { AuthService } from '../services/auth.service';

type loggedUserState = {
  loggedUser: any;
  isLoggedIn: boolean;
  token: string;
  loading: boolean;
}

const initialState: loggedUserState = {
  loggedUser: {},
  isLoggedIn: false,
  token: '',
  loading: false,
}

export const authUserStore = signalStore(
  {providedIn: 'root'}, 

  withState(initialState),

  withMethods((store, authService = inject(AuthService)) => ({

    // register(registerUser:any) {
    //   patchState(store,(state) => ({...state, loading: true}));
    //   authService.userRegister(registerUser).subscribe({
    //     next: (res) => {
    //       localStorage.setItem('auth_user', JSON.stringify(res));
    //       patchState(store,(state) => ({...state, loggedUser: res, isLoggedIn: true, loading: false}));
    //     }
    //   })
    // },

    async login(user:any) {
      patchState(store,(state) => ({...state, loading: true}));
      authService.userLogin(user).subscribe({
        next: (res) => {
          localStorage.setItem('auth_user', JSON.stringify(res));
          patchState(store,(state) => ({...state, loggedUser: res, isLoggedIn: true, loading: false}));
        },
        error: (err) => {
          console.error(err);
          patchState(store,(state) => ({...state, loading: false}));
        }
      })    
    },

    logout() {
      localStorage.removeItem('auth_user');
      patchState(store,(state) => ({...state, loggedUser: {}, isLoggedIn: false}));
    },

  })),

  withHooks({
    onInit: (store,authService = inject(AuthService)) => {

      // authService.userRegister({}).subscribe((res) => {
        
      // })
      // const token = localStorage.getItem('token');
      // if (token) {
      //   patchState({isLoggedIn: true, token: token});
      // }
    },
  })
)