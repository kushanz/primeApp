# Angular Boilerplate

A production-oriented Angular boilerplate documentation pack using:

- Standalone Angular APIs
- Signals for synchronous UI state
- `ChangeDetectionStrategy.OnPush` for components
- Zoneless-compatible design
- NgRx SignalStore for shared feature state
- RxJS for complex asynchronous streams
- Typed Reactive Forms
- Feature-first architecture
- Lazy-loaded routes
- Immutable update patterns

> This repository intentionally documents architectural rules separately from implementation code. Keep the root README short and use the files under `docs/` as the engineering source of truth.

## Documentation Map

### Architecture

- [Architecture overview](docs/architecture/overview.md)
- [Folder structure](docs/architecture/folder-structure.md)
- [Dependency rules](docs/architecture/dependency-rules.md)
- [State management](docs/architecture/state-management.md)
- [Reactive programming](docs/architecture/reactive-programming.md)
- [Application data flow](docs/architecture/data-flow.md)

### Engineering Standards

- [Angular coding standards](docs/standards/angular-coding-standards.md)
- [Component guidelines](docs/standards/component-guidelines.md)
- [Naming conventions](docs/standards/naming-conventions.md)
- [Error handling](docs/standards/error-handling.md)
- [Accessibility](docs/standards/accessibility.md)
- [Security](docs/standards/security.md)

### Development

- [Getting started](docs/development/getting-started.md)
- [Environment configuration](docs/development/environment-configuration.md)
- [API integration](docs/development/api-integration.md)
- [Authentication](docs/development/authentication.md)
- [Testing](docs/development/testing.md)
- [Deployment](docs/development/deployment.md)

### Architecture Decisions

- [Use signals for local UI state](docs/decisions/0001-use-signals-for-local-ui-state.md)
- [Use NgRx SignalStore](docs/decisions/0002-use-ngrx-signal-store.md)
- [Use RxJS for complex asynchronous streams](docs/decisions/0003-use-rxjs-for-complex-streams.md)
- [Use feature-first architecture](docs/decisions/0004-use-feature-first-architecture.md)

## Core Decision Guide

| Scenario | Default choice |
|---|---|
| Local synchronous UI state | `signal()` |
| Derived synchronous state | `computed()` |
| Shared feature state | NgRx SignalStore |
| Complex async/event stream | RxJS |
| Form state | Typed Reactive Forms |
| One-time API request | Data-access service |
| Template async rendering | Signal or `AsyncPipe` |
| Imperative side effect | `effect()` only when justified |

## Non-Negotiable Rules

1. Do not create a store for trivial component state.
2. Do not use RxJS Subjects as general-purpose mutable state.
3. Do not expose writable signals outside their owner.
4. Do not call HTTP APIs directly from presentational components.
5. Do not mutate arrays or objects held in signals or stores.
6. Do not use `effect()` to derive state that belongs in `computed()`.
7. Do not create abstractions without a proven repeated use case.
