# Dependency Rules

## Purpose

Keep feature ownership clear and prevent circular or hidden dependencies.

## Allowed Dependency Direction

```text
app shell → layouts
app shell → features
features/pages → features/ui
features/pages → features/data-access
features/ui → features/models
features/data-access → features/models
features/* → shared
core → shared
```

## Forbidden Dependencies

```text
shared → feature
core → feature
feature A internal file → feature B internal file
UI component → API service
data-access → page component
```

## Cross-Feature Access

A feature must not import another feature's internal files.

When cross-feature reuse is required:

1. Confirm the code is genuinely reusable.
2. Move business-agnostic code into `shared/`.
3. Expose a deliberate public entry point when feature integration is unavoidable.
4. Prefer route-level composition over direct feature coupling.

## Barrel Files

Use barrel files only at deliberate public boundaries. Avoid broad `index.ts` files that hide dependency origins or create circular imports.

## Dependency Injection

- Use `inject()` consistently where it improves readability.
- Provide services and stores at the narrowest valid scope.
- Use root providers only for true application singletons.
- Use injection tokens for configuration and replaceable implementations.
