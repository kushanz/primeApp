# User Story / Feature Record

Use this document to track implemented features, feature scope, and all state-store additions.

## Rules

- Record every new feature added to the app
- Record every new route added to the app
- Record every new store created under `src/app/store`
- Record important changes to auth, layout, or shared architecture

## Current Features

### Shared UI / Angular Patterns

- Standalone Angular components are the default component model
- `ChangeDetectionStrategy.OnPush` is the default component change-detection pattern for the app
- PrimeNG-based UI patterns should stay consistent across future features
- New feature development should define and maintain a clear state-management approach

### Authentication

- Routes:
  - `/login`
  - `/register`
- Current auth pattern:
  - login returns token
  - `/me` is the source of truth for authenticated user data
  - logout clears local auth state and calls backend logout

### Dashboard Area

- Base route: `/dashboard`
- Child routes:
  - `/dashboard/home`
  - `/dashboard/users`

### User Management

- Current user listing screen exists under `/dashboard/users`
- Current app uses feature-level service state plus shared auth state

## Store Registry

### Existing Stores

- `src/app/store/authuser.store.ts`
  - Purpose: authenticated user session, token state, `/me` hydration, logout cleanup
- `src/app/store/user.store.ts`
  - Purpose: user-list state scaffold for user management

## Change Log Template

### Feature Entry

- Feature:
- Route:
- Service(s):
- Store(s):
- UI pattern:
- Notes:

### Store Entry

- Store file:
- Feature:
- Reason for using store:
- Shared state handled:
- Date added:
