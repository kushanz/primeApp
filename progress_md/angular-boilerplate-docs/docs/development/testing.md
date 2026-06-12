# Testing

## Testing Strategy

Prefer focused tests that protect behavior and architecture.

## Unit Tests

Test:

- Pure utilities
- Mappers
- Computed state
- Store methods
- Validation rules
- UI behavior with meaningful inputs

## Component Tests

Verify:

- Rendered behavior
- User interaction
- Inputs and outputs
- Loading, empty, error and success states
- Accessibility-critical behavior

## Store Tests

Verify:

- Initial state
- State transitions
- Derived state
- Successful requests
- Failed requests
- Concurrency/cancellation behavior when RxJS is used

## Avoid

- Testing private implementation details
- Snapshot-only testing for complex behavior
- Brittle CSS-selector tests
- Huge integration tests for every small branch
- Mocking Angular itself

## Required Input Signals

Set required inputs before the first change-detection cycle in tests. Prefer a host component or the testing API supported by the project's Angular version.

## Zoneless Compatibility

Tests should exercise the same notification mechanisms used in production: signals, inputs, outputs, template events and framework-managed async APIs.
