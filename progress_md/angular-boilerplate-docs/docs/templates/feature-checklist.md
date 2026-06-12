# Feature Checklist

## Architecture

- [ ] Feature has a clear business owner.
- [ ] Route is lazy-loaded where appropriate.
- [ ] Dependencies follow the documented direction.
- [ ] Shared code is genuinely business-agnostic.
- [ ] Store scope is the narrowest valid scope.

## State

- [ ] Local state uses signals.
- [ ] Derived state uses `computed()`.
- [ ] SignalStore is used only when justified.
- [ ] RxJS operators match required concurrency behavior.
- [ ] No duplicated state synchronization exists.

## UI

- [ ] Components use OnPush.
- [ ] Loading, empty, error and success states exist.
- [ ] Keyboard operation works.
- [ ] Labels and accessible names exist.
- [ ] Responsive behavior is tested.

## Data

- [ ] HTTP logic is in data-access.
- [ ] DTOs are typed.
- [ ] Mapping is explicit where needed.
- [ ] Errors are not silently swallowed.
- [ ] Cache invalidation is documented.

## Quality

- [ ] Tests cover critical behavior.
- [ ] Lint and build pass.
- [ ] Security-sensitive data is not logged.
- [ ] Documentation is updated.
