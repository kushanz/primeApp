# ADR 0002: Use NgRx SignalStore for Shared Feature State

- Status: Accepted
- Date: 2026-06-10
- Decision owners: Frontend team

## Context

Features need structured shared state without forcing all application state into a global action/reducer architecture.

## Decision

Use NgRx SignalStore for meaningful state shared across components in a feature. Scope stores to feature routes by default and use root scope only for genuinely global state.

## Consequences

### Positive

- Native signal-based state
- Clear feature ownership
- Declarative composition
- Lower ceremony for many feature-state scenarios

### Negative

- Developers must choose scope correctly
- Trivial state can be over-engineered
- Complex async workflows still require RxJS reasoning

## Alternatives Considered

- Plain services with signals
- NgRx Store
- RxJS Subjects
