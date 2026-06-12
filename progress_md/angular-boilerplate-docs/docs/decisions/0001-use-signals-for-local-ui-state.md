# ADR 0001: Use Signals for Local UI State

- Status: Accepted
- Date: 2026-06-10
- Decision owners: Frontend team

## Context

Angular provides signals as a synchronous reactive primitive that integrates directly with templates and change detection.

## Decision

Use `signal()` for component-owned synchronous state and `computed()` for derived state. Writable signals should remain private whenever possible.

## Consequences

### Positive

- Direct and readable state access
- Fine-grained reactive updates
- Simple derived state
- Strong Angular integration

### Negative

- Teams must avoid duplicating state
- Effects can be misused as synchronization machinery
- Mutable objects still require immutable update discipline

## Alternatives Considered

- RxJS `BehaviorSubject`
- Plain mutable component properties
- A SignalStore for every component
