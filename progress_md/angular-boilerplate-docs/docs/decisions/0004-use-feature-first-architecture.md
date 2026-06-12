# ADR 0004: Use Feature-First Architecture

- Status: Accepted
- Date: 2026-06-10
- Decision owners: Frontend team

## Context

Type-first top-level folders lose ownership as an application grows and make changes span unrelated directories.

## Decision

Organize business code under feature folders containing pages, UI, data access, models and utilities. Keep `core`, `layouts` and `shared` business-agnostic.

## Consequences

### Positive

- Clear ownership
- Easier lazy loading
- Better code locality
- Easier feature deletion and extraction

### Negative

- Some reusable code may initially be duplicated
- Teams must resist premature movement into `shared`
- Cross-feature integration requires explicit boundaries

## Alternatives Considered

- Type-first folders
- One flat application folder
- Package-per-technical-layer
