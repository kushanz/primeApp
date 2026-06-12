# Folder Structure

## Purpose

Define where code belongs and prevent the project from becoming a type-based dumping ground.

## Recommended Structure

```text
src/
├── app/
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   │
│   ├── core/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── http/
│   │   ├── logging/
│   │   └── guards/
│   │
│   ├── layouts/
│   │   ├── authenticated-layout/
│   │   └── public-layout/
│   │
│   ├── shared/
│   │   ├── ui/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── utils/
│   │   └── models/
│   │
│   └── features/
│       ├── authentication/
│       ├── users/
│       └── documents/
│
├── assets/
├── environments/
├── main.ts
└── styles.scss
```

## Feature Structure

```text
features/users/
├── users.routes.ts
├── pages/
│   ├── users-list-page/
│   └── user-details-page/
├── ui/
│   ├── user-card/
│   └── user-filter/
├── data-access/
│   ├── users-api.service.ts
│   ├── users.store.ts
│   ├── users.dto.ts
│   └── users.mapper.ts
├── models/
│   └── user.model.ts
└── utils/
    └── user-name.util.ts
```

## Folder Responsibilities

### `core/`

Application-wide infrastructure that should normally have one instance:

- Authentication infrastructure
- HTTP interceptors
- Global guards
- Runtime configuration
- Logging and monitoring

`core/` must not contain feature business logic.

### `layouts/`

Application shells such as public and authenticated layouts.

### `shared/`

Reusable, business-agnostic building blocks.

Code belongs here only when at least two features genuinely need it. Do not move code into `shared/` because it might be useful someday.

### `features/`

Business capabilities with their own routes, pages, UI, state and data access.

## Placement Rules

- Route-entry components belong in `pages/`.
- Reusable feature components belong in `ui/`.
- API services, DTOs and stores belong in `data-access/`.
- Domain-facing models belong in `models/`.
- Pure feature helpers belong in `utils/`.
- Globally reusable UI belongs in `shared/ui/`.

## Avoid

```text
app/
├── components/
├── services/
├── models/
├── pages/
└── stores/
```

This structure looks simple initially but destroys feature ownership as the application grows.
