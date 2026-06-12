# Pull Request Checklist

## Scope

- [ ] The PR has one clear purpose.
- [ ] Unrelated refactoring is excluded.
- [ ] The description explains the user or engineering impact.

## Architecture

- [ ] Feature boundaries are respected.
- [ ] No forbidden dependencies were introduced.
- [ ] State management choice is justified.
- [ ] New global state is genuinely global.
- [ ] New abstractions have multiple proven use cases.

## Angular

- [ ] Components are standalone.
- [ ] Components use OnPush.
- [ ] Signals are readonly/private where appropriate.
- [ ] Derived state uses `computed()`.
- [ ] Subscriptions are framework-managed or cleaned up.
- [ ] Lists use stable tracking keys.

## UX and Quality

- [ ] Loading, empty, error and success states are handled.
- [ ] Accessibility was checked.
- [ ] Tests were added or updated.
- [ ] Lint, test and build pass.
- [ ] No secrets or sensitive data are exposed.
