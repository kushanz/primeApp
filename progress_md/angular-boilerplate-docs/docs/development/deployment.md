# Deployment

## Build

```bash
npm ci
npm run lint
npm test
npm run build
```

## Deployment Checks

- Production configuration is present.
- Source maps follow the security policy.
- Static hosting rewrites routes to `index.html`.
- API URLs target the correct environment.
- CSP and security headers are configured at the hosting layer.
- Cache headers distinguish hashed assets from `index.html`.
- Monitoring and release version metadata are available.
- Bundle budgets pass.
- Authentication cookies use production-safe attributes.

## Rollback

Every release process must define:

- The previously known-good version
- How to restore it
- Whether database/API compatibility allows rollback
- How frontend cache invalidation is handled
