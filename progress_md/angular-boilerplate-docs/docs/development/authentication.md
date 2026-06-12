# Authentication

## Recommended Flow

```text
Application start
  ↓
Session/bootstrap endpoint
  ↓
Authenticated user store
  ↓
Route access and feature permissions
```

## Rules

- Keep authentication infrastructure in `core/auth/`.
- Keep authenticated-user summary in a narrowly defined global store.
- Do not place every user profile feature in the auth store.
- Let the backend enforce authorization.
- Use guards for navigation UX, not security enforcement.
- Prevent duplicate refresh attempts.
- Clear user-specific stores on logout.
- Avoid exposing tokens to application JavaScript when cookie-based auth is available.

## Interceptor Responsibilities

An authentication interceptor may:

- Include credentials when required.
- Coordinate one refresh flow after an authentication failure.
- Retry the original request once.
- Redirect or reset session state after definitive failure.

It must not create infinite refresh loops.
