# Master Instructions

These are the permanent guard rails for future development in this project.

## Non-Negotiables

- Always follow the existing Angular standalone architecture
- Always preserve the current folder hierarchy unless explicitly asked to restructure it
- Always preserve the PrimeNG-based UI direction unless a task explicitly changes it
- Always preserve the shared style direction already established in the app
- Always use typed models/interfaces for API-facing data where practical
- Always keep project progress updated in `progress-tracker.md`
- Always document new feature stores in `user-story.md`

## Architecture Guard Rails

- Feature pages belong in `src/app/components/pages/<feature>`
- Reusable layout/shell pieces belong in `src/app/layout`
- API communication belongs in `src/app/services`
- Shared DTOs and models belong in `src/app/dto`
- Shared feature or cross-cutting state belongs in `src/app/store`
- Environment-specific configuration belongs in `src/environments`

## Angular Rules

- Prefer standalone components
- Prefer `inject(...)` over constructor DI where consistent with the codebase
- Prefer signals-based local state for component UI state
- Prefer latest Angular patterns already used in the app
- Keep routes centralized in `src/app/app.routes.ts`
- Use lazy route components for feature pages where possible

## PrimeNG Rules

- Prefer PrimeNG components before custom component behavior
- Keep PrimeNG usage stylistically consistent with current implementation
- Reuse current app patterns for forms, toasts, drawers, tables, and popovers
- Keep the existing theme preset and style pipeline intact unless explicitly changed

## State Management Rules

- Every new feature must define its state approach
- If state is shared, long-lived, or cross-feature, create a store under `src/app/store`
- If a new store is created, record it in `user-story.md`
- If feature state is simple and local, prefer signals in the component or service
- Do not add ad-hoc global state without documentation

## API Integration Rules

- Build URLs from environment configuration
- Keep request/response typing in the service layer
- Keep response shaping and backend mapping inside services/stores where practical
- Document any contract changes in `progress-tracker.md`

## Documentation Rules

- Update `progress-tracker.md` whenever a task is completed
- Update `progress-tracker.md` when known pending work is identified
- Update `user-story.md` when:
  - a feature is added
  - a route is added
  - a store is added
  - a major architectural pattern changes

## Collaboration Rules For Future Sessions

- Start by reading `progress_md/README.md`
- Follow `master instruction.md` before making changes
- Review `progress-tracker.md` before starting work
- Add a concise record of completed work before closing a task
- Keep decisions consistent with the referenced Angular boilerplate docs

## Reference Docs

- `../PROJECT_ARCHITECTURE_GUIDE.md`
- `README.md`
- `master.md`
- `progress-tracker.md`
- `user-story.md`
- `angular-boilerplate-docs/docs/architecture/state-management.md`
- `angular-boilerplate-docs/docs/standards/angular-coding-standards.md`
- `angular-boilerplate-docs/docs/standards/component-guidelines.md`
