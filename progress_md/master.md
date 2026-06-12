# Project Master Index

This file is the central index for documentation and development workflow in `primeApp`.

## Project Identity

- App type: Angular standalone frontend with PrimeNG UI
- Purpose: reusable development boilerplate evolving into a feature-based application
- Style direction: modern Angular patterns, PrimeNG components, signals-first thinking, clear feature structure

## Documentation Order

Read documents in this order before making major changes:

1. `master instruction.md`
2. `../PROJECT_ARCHITECTURE_GUIDE.md`
3. `README.md`
4. Relevant files under `angular-boilerplate-docs/docs/`
5. `progress-tracker.md`
6. `user-story.md`

## Project Rules Summary

- Keep standalone Angular component architecture
- Preserve PrimeNG + theme system unless explicitly changed
- Prefer latest Angular patterns already used in the codebase
- Use feature-based structure already established in `src/app`
- Every feature should have a state-management plan
- For complex/shared state, add a store under `src/app/store`
- Every new store must be recorded in `user-story.md`
- Every completed task must update `progress-tracker.md`

## State-Management Direction

- Shared or cross-cutting state: `signalStore`
- Feature-local lightweight state: component `signal`, `computed`, `effect`
- Feature-local API listing/filter patterns: service signals + `rxResource`
- New features should explicitly decide their state-management approach before implementation

## PrimeNG / Angular Development Expectations

- Reuse PrimeNG components before introducing custom UI behavior
- Follow current template + SCSS patterns already present in the app
- Keep services typed and environment-based
- Keep DTOs/models under `src/app/dto`
- Keep feature pages under `src/app/components/pages/<feature>`
- Keep reusable app-shell parts under `src/app/layout`

## Tracking Discipline

- Add completed items to `progress-tracker.md`
- Add pending follow-ups to `progress-tracker.md`
- Record newly introduced feature stores, routes, and architectural decisions in `user-story.md`

## Reference Links

- `README.md`
- `master instruction.md`
- `progress-tracker.md`
- `user-story.md`
- `../PROJECT_ARCHITECTURE_GUIDE.md`
- `angular-boilerplate-docs/README.md`
