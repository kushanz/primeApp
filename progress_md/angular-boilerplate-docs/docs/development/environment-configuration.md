# Environment Configuration

## Principles

- Build-time configuration is public once shipped to the browser.
- Never store secrets in Angular environment files.
- Prefer runtime configuration when one build must serve multiple environments.
- Validate required configuration during application startup.

## Suggested Model

```typescript
export interface AppConfig {
  apiBaseUrl: string;
  identityBaseUrl: string;
  production: boolean;
}
```

Provide configuration through an injection token.

## Environment Separation

Typical environments:

```text
local
development
qa
staging
production
```

Do not scatter environment checks throughout features. Centralize configuration and expose meaningful capabilities.
