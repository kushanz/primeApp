# Error Handling

## Principles

- Never silently swallow failures.
- Keep technical details out of user-facing messages.
- Preserve enough context for logs and diagnostics.
- Handle errors at the layer that can make a meaningful decision.
- Do not convert every failure into an empty array.

## Layers

### HTTP interceptor

Handles cross-cutting concerns:

- Authentication failures
- Correlation IDs
- Standard transport error mapping
- Global telemetry

### Data-access service

Handles endpoint-specific response mapping.

### Store/page orchestration

Decides whether to retry, show fallback state or keep stale data.

### UI

Displays actionable, accessible feedback.

## Request State

Prefer a state that cannot represent impossible combinations:

```typescript
type RequestState<T> =
  | { status: 'idle'; data: T | null }
  | { status: 'loading'; data: T | null }
  | { status: 'success'; data: T }
  | { status: 'error'; data: T | null; message: string };
```

## Logging

Do not log:

- Access tokens
- Refresh tokens
- Passwords
- OTP values
- Full identity documents
- Sensitive personal data
