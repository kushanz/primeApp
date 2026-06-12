# ADR 0003: Use RxJS for Complex Asynchronous Streams

- Status: Accepted
- Date: 2026-06-10
- Decision owners: Frontend team

## Context

Some application workflows depend on time, cancellation, retries, concurrency, polling or multiple asynchronous sources.

## Decision

Use RxJS for complex asynchronous and event-stream orchestration. Convert to signals at deliberate UI or store boundaries when beneficial.

## Consequences

### Positive

- Mature cancellation and concurrency semantics
- Rich operator ecosystem
- Strong support for polling and real-time streams
- Clear modeling of values over time

### Negative

- Operator misuse can change business behavior
- Long pipelines can become difficult to read
- Unmanaged subscriptions can leak

## Alternatives Considered

- Promises only
- Signals and effects for all async behavior
- Manual event listeners and timers
