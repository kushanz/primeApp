import { effect, inject } from '@angular/core';
import { getState, patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from '../services/auth.service';

type loggedUserState = {
  loggedUser: AuthUser | null;
  isLoggedIn: boolean;
  token: string;
  loading: boolean;
}

const initialState: loggedUserState = {
  loggedUser: null,
  isLoggedIn: false,
  token: '',
  loading: false,
};

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
    setAuthSession(token: string) {
      localStorage.setItem('auth_token', token);
      patchState(store, (state) => ({ ...state, loggedUser: null, token, isLoggedIn: true, loading: false }));
    },

    loadCurrentUser() {
      const token = localStorage.getItem('auth_token') || getState(store).token;

      if (!token) {
        patchState(store, (state) => ({ ...state, loggedUser: null, token: '', isLoggedIn: false, loading: false }));
        return;
      }

      patchState(store, (state) => ({ ...state, token, isLoggedIn: true, loading: true }));

      authService.me().subscribe({
        next: (res) => {
          localStorage.setItem('auth_user', JSON.stringify(res.data.user));
          patchState(store, (state) => ({
            ...state,
            loggedUser: res.data.user,
            token,
            isLoggedIn: true,
            loading: false,
          }));
        },
        error: () => {
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
          patchState(store, (state) => ({
            ...state,
            loggedUser: null,
            token: '',
            isLoggedIn: false,
            loading: false,
          }));
        }
      });
    },

    setLoggedUser(user: AuthUser) {
      localStorage.setItem('auth_user', JSON.stringify(user));
      patchState(store, (state) => ({ ...state, loggedUser: user, isLoggedIn: !!state.token, loading: false }));
    },

    clearAuthState() {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      patchState(store, (state) => ({ ...state, loggedUser: null, token: '', isLoggedIn: false, loading: false }));
    },

    removeuser() {
      authService.logout().subscribe({
        next: () => {
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
          patchState(store, (state) => ({ ...state, loggedUser: null, token: '', isLoggedIn: false, loading: false }));
          router.navigate(['/login']);
        },
        error: () => {
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
          patchState(store, (state) => ({ ...state, loggedUser: null, token: '', isLoggedIn: false, loading: false }));
          router.navigate(['/login']);
        }
      });
    },
    updateLoading(loading:boolean) {
      patchState(store,(state) => ({...state, loading: loading}));
    }

  })),

  withHooks({
    onInit: (store) => {
      const authUserFromLS = JSON.parse(localStorage.getItem('auth_user') || 'null');
      const authTokenFromLS = localStorage.getItem('auth_token') || '';

      patchState(store, (state) => ({
        ...state,
        loggedUser: authUserFromLS,
        isLoggedIn: !!authTokenFromLS,
        token: authTokenFromLS,
        loading: false,
      }))

      effect(() => {
        const state = getState(store);
        if (state.loggedUser) {
          localStorage.setItem('auth_user', JSON.stringify(state.loggedUser));
        }
        if (state.token) {
          localStorage.setItem('auth_token', state.token);
        }
      });
    },
  })
)
