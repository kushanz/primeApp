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

    setuser(user:any):any {
      localStorage.setItem('auth_user', JSON.stringify(user));
      patchState(store,(state) => ({...state, loggedUser: user, isLoggedIn: true, loading: false}));
  
    },

    removeuser() {
      localStorage.removeItem('auth_user');
      patchState(store,(state) => ({...state, loggedUser: {}, isLoggedIn: false}));
    },
    updateLoading(loading:boolean) {
      patchState(store,(state) => ({...state, loading: loading}));
    }

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