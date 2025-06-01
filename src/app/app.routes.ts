import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './services/auth.guard';

export const routes: Routes = [
  {path: 'register',loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)},
  {path: 'login',loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),canActivate: [loginGuard]},
  {path: 'dashboard',loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),canActivate: [authGuard],
    children: [
      {path: 'home',loadComponent: () => import('./components/pages/home/home.component').then(m => m.HomeComponent)},
      {path: 'users',loadComponent: () => import('./components/pages/userlist/userlist.component').then(m => m.UserlistComponent)}
    ]
  },
  {path: '**', redirectTo: 'login'}
];
