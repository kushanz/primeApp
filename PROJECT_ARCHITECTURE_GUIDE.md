# PrimeApp Architecture and Development Guide

## Purpose
This document defines the current project structure and coding patterns that must be preserved when adding new features.
Use this as the source of truth for all future CRUD/auth feature prompts.

## Tech Baseline
- Angular 19 standalone components (no NgModule app structure)
- Zoneless change detection (`provideZonelessChangeDetection`)
- PrimeNG UI + custom theme preset (`MyPreset`)
- Tailwind utility usage in templates + SCSS structure under `src/assets/styles`
- Auth/token flow with Http interceptor + cookie-based refresh

## Folder Structure (Keep As-Is)
- `src/app/components`
  - `login`, `register`, `dashboard`
  - `pages/home`, `pages/user/...` for feature pages
- `src/app/layout`
  - App shell and layout elements (`topbar`, `sidebar`, `menu`, `footer`, etc.)
- `src/app/services`
  - API communication, auth guard, token interceptor
- `src/app/store`
  - `@ngrx/signals` stores for complex/cross-cutting state
- `src/app/dto`
  - Shared TS models and types
- `src/environments`
  - Environment-specific config (`baseUrl` etc.)
- `src/assets/styles`
  - Global styling system and theme variables

Do not reorganize these folders unless explicitly requested.

## Routing Pattern
- Central routes in `src/app/app.routes.ts`
- Use lazy standalone route components:
  - `loadComponent: () => import(...).then(m => m.YourComponent)`
- Protected area under `/dashboard` with child routes
- Guards:
  - `authGuard` for protected routes
  - `loginGuard` to prevent logged-in users from returning to login

## State Management Rules

### 1) Use `signalStore` (`src/app/store`) for complex state
Use store when any of these are true:
- State shared across multiple unrelated components
- Multi-step flows (auth/session, wizard, caching, optimistic updates)
- Complex mutations that need centralized methods
- Lifecycle hooks (`withHooks`) are useful

Pattern:
- `withState` + `withMethods` (+ `withHooks` when required)
- Update state via `patchState`
- Expose minimal getters/computed selectors

### 2) Use service-level Signals + `rxResource` for simple state/API
Use service pattern when:
- CRUD listing/detail state is feature-local
- Simple API fetch + loading + local search/filter state

Current pattern (see `user.service.ts`):
- UI filter/search as `signal`
- Debounce with `toObservable(...).pipe(debounceTime(...))`
- API stream using `rxResource`
- Derived values using `linkedSignal`/`computed`

### 3) Component-local UI state stays in components
Examples:
- Drawer/dialog visibility
- Form submitting flags
- Keyboard shortcut handlers

## Service Conventions
- Services are `providedIn: 'root'`
- Use `inject(HttpClient)` instead of constructor DI for dependencies
- Build URLs from `environment.baseUrl`
- Use `{ withCredentials: true }` for auth-protected endpoints
- Keep data shaping inside service methods where practical

## Auth Conventions
- Auth user snapshot persisted in `localStorage` key: `auth_user`
- Interceptor handles 401/403 token refresh and retries failed requests
- Logout clears local state even if API call fails
- Guards currently check role-based access (`admin`) for dashboard access

## Component Conventions
- Prefer standalone components with local `imports` in `@Component`
- Keep feature page components under `components/pages/<feature>`
- Keep reusable shell/layout components under `layout`
- Use signals for lightweight local state (`signal`, `computed`, `effect`)
- Use reactive forms or Angular Signals Forms consistently per component

## DTO and Types
- Define/update models under `src/app/dto`
- Reuse model interfaces in services/components/store methods
- Avoid anonymous `any` unless temporary during scaffolding

## API + CRUD Feature Addition Checklist
When adding a new feature, keep this sequence:
1. Add/update DTO in `src/app/dto`
2. Add/update API methods in `src/app/services/<feature>.service.ts`
3. Decide state approach:
   - Simple: service `rxResource` + signals
   - Complex/shared: new signal store in `src/app/store`
4. Create page components under `src/app/components/pages/<feature>`
5. Register route in `src/app/app.routes.ts` (usually under `/dashboard`)
6. Add menu entry if needed in `src/app/layout/menu/menu.component.ts`
7. Keep auth/guard/interceptor behavior unchanged unless feature explicitly needs auth changes

## Prompting Guide for Future Changes
When requesting a new feature, include:
- Feature name and route path
- Whether state should be `signalStore` (complex) or service `rxResource` (simple)
- Required API endpoints (method + path + payload + response)
- Role/access requirements (`admin` only or others)
- UI behavior details (table/form/drawer/dialog/toasts)

Example prompt:
"Add `<feature>` under `/dashboard/<feature>`, keep existing folder structure, use `<state style>`, create service + DTO + component files following current patterns, and keep auth/token flow unchanged."

## Non-Negotiables
- Preserve existing folder hierarchy and naming style unless explicitly requested
- Preserve standalone component architecture
- Preserve current auth/token interceptor flow
- Keep visual theme and style system intact

---
Last updated: 2026-02-24
