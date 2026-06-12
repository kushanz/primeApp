# Contributing

## Before Starting

1. Read the relevant architecture and standards documents.
2. Confirm which feature owns the change.
3. Keep dependencies inside the allowed direction.
4. Prefer the smallest state-management mechanism that solves the problem.
5. Add or update tests with the implementation.

## Branch Naming

```text
feature/<ticket>-short-description
fix/<ticket>-short-description
refactor/<ticket>-short-description
chore/<ticket>-short-description
```

## Commit Style

Use concise imperative messages:

```text
feat(users): add user search filters
fix(auth): prevent duplicate token refresh
refactor(documents): move API calls into data-access
test(users): cover empty search results
```

## Pull Request Requirements

- The feature builds successfully.
- Linting passes.
- Unit tests pass.
- New public behavior is tested.
- No unrelated formatting or refactoring is included.
- State ownership is clear.
- Loading, empty, error and success states are handled.
- Accessibility has been considered.
- Security-sensitive changes are documented.
- Architecture decisions are added when introducing a new project-wide pattern.

See [Pull Request Checklist](docs/templates/pull-request-checklist.md).
