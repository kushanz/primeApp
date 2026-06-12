# Reactive Programming

## Purpose

Define when to use Angular signals and when to use RxJS.

## Mental Model

- Signals represent the current value.
- RxJS represents events and asynchronous values over time.

This is a default rule, not a religious boundary.

## Use Signals For

- Synchronous component state
- Store state
- Derived values
- Selected values
- Template-facing state
- Signal inputs, outputs and queries
- Loading/error state after orchestration is complete

## Use RxJS For

- HTTP request composition
- Cancellation
- Debouncing and throttling
- Polling
- WebSocket or SignalR streams
- Retry and timeout behavior
- Multiple asynchronous sources
- Sequential or concurrent workflows
- Temporal event processing

## Boundary Pattern

```text
Template event
    ↓
Signal
    ↓
toObservable()
    ↓
RxJS pipeline
    ↓
toSignal()
    ↓
Template
```

Convert at clear boundaries. Do not repeatedly bounce between signals and Observables.

## Search Example

```typescript
readonly searchTerm = signal('');

private readonly searchTerm$ = toObservable(this.searchTerm);

readonly results = toSignal(
  this.searchTerm$.pipe(
    map(term => term.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term =>
      term
        ? this.usersApi.search(term).pipe(
            catchError(() => of([])),
          )
        : of([]),
    ),
  ),
  { initialValue: [] },
);
```

## Operator Selection

| Business behavior | Operator |
|---|---|
| Cancel previous operation | `switchMap` |
| Ignore new triggers while busy | `exhaustMap` |
| Process sequentially | `concatMap` |
| Process concurrently | `mergeMap` |
| Combine latest values | `combineLatest` |
| Wait for all one-time requests | `forkJoin` |
| Recover | `catchError` |
| Retry transient failure | `retry` |
| Share/cache | `shareReplay` with an explicit policy |

Do not select flattening operators by habit.

## Subscription Policy

Prefer:

- `toSignal()`
- `AsyncPipe`
- `takeUntilDestroyed()`
- SignalStore RxJS integration
- Framework-managed subscriptions

Use manual `subscribe()` only for a real side effect.

```typescript
private readonly destroyRef = inject(DestroyRef);

startListening(): void {
  this.events$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(event => this.handleEvent(event));
}
```

## Effects

Use `effect()` for imperative synchronization with an external system:

- Browser storage
- Logging/analytics
- Non-reactive third-party widgets
- Imperative browser APIs

Do not use `effect()` for derived state.

Avoid:

```typescript
effect(() => {
  this.fullName.set(`${this.firstName()} ${this.lastName()}`);
});
```

Use:

```typescript
readonly fullName = computed(
  () => `${this.firstName()} ${this.lastName()}`,
);
```

## Reactive Smells

- Nested subscriptions
- Public Subjects
- `BehaviorSubject` for trivial local state
- Repeated `toSignal()` for the same source
- `shareReplay()` without cache-lifetime reasoning
- Returning empty arrays for every error and hiding failures
- Long pipelines that mix transport, mapping, state and UI side effects
