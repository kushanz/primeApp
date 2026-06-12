# Security

## Authentication

Prefer secure, `HttpOnly`, `Secure`, appropriately scoped cookies for browser-managed authentication when supported by the backend architecture.

Do not store long-lived authentication tokens in `localStorage`.

## CSRF

Cookie-based authentication requires a deliberate CSRF strategy. Coordinate cookie settings and anti-forgery tokens with the backend.

## XSS

- Do not bypass Angular sanitization without security review.
- Avoid direct `innerHTML`.
- Treat server-provided HTML as untrusted.
- Do not build executable code from user input.
- Keep third-party libraries updated.

## Authorization

Frontend guards improve UX but are not security boundaries. The backend must enforce every permission.

## Sensitive Data

- Avoid placing secrets in environment files bundled into the browser.
- Do not log tokens or personal data.
- Do not expose internal exception details to users.
- Mask sensitive values in UI and telemetry.
- Clear sensitive feature state on logout or tenant change.

## File Uploads

Validate:

- Allowed file type
- File size
- Filename handling
- Backend scanning
- Upload authorization

Client-side validation is not a substitute for server validation.
