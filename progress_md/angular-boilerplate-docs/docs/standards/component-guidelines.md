# Component Guidelines

## Component Types

### Page components

May:

- Read route data
- Inject a feature store
- Coordinate data loading
- Connect feature UI components
- Handle navigation

### UI components

Should:

- Receive data through inputs
- Emit user intent through outputs
- Own only local presentation state
- Avoid direct backend access
- Remain reusable within the feature

## Size Rule

A component is too large when it has multiple unrelated reasons to change. Line count is evidence, not the actual rule.

Split when:

- Independent UI areas have independent state.
- A section can be tested meaningfully alone.
- A template has repeated behavior.
- The component coordinates multiple business workflows.

## Input Rules

- Treat inputs as immutable.
- Do not rewrite parent-owned values.
- Use required inputs when absence is invalid.
- Prefer domain-relevant input names.

## Output Rules

Outputs describe user intent:

Good:

```text
saveRequested
userSelected
filterChanged
dialogClosed
```

Weak:

```text
clicked
changed
event
```

## Local State

Use signals for component-owned state:

```typescript
readonly isExpanded = signal(false);
readonly selectedTab = signal<'details' | 'history'>('details');
```

## Change Detection

Explicitly use `ChangeDetectionStrategy.OnPush` until the project's supported Angular version and configuration guarantee the desired default. Do not assume a roadmap item is already implemented.

Signals, input changes, template events and framework-managed async mechanisms should drive updates. Avoid manual change detection unless integrating with an external imperative API.
