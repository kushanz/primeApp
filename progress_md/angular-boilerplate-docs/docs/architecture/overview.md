# Architecture Overview

## Purpose

Define the default structure and engineering boundaries of the Angular boilerplate.

## Architectural Style

The application uses:

- Standalone components, directives and pipes
- Feature-first organization
- Lazy-loaded routes
- Signals for synchronous state
- NgRx SignalStore for shared feature state
- RxJS for complex asynchronous behavior
- Typed Reactive Forms
- Data-access services for backend communication
- `ChangeDetectionStrategy.OnPush`
- Zoneless-compatible application code
- Immutable state updates

## Main Layers

```text
Application shell
    ↓
Feature routes
    ↓
Page components
    ↓
UI components + feature stores
    ↓
Data-access services
    ↓
HTTP/backend APIs
```

## Responsibilities

### Application shell

Owns global layout, top-level navigation and application-wide providers.

### Feature

Owns a business capability such as authentication, users or documents.

### Page component

Coordinates route state, feature state and user actions.

### UI component

Renders data and emits user intent. It must not own backend orchestration.

### SignalStore

Owns shared feature state, computed state and feature operations.

### Data-access service

Owns HTTP calls, DTO mapping and transport-level concerns.

## Design Rules

- Keep business capabilities isolated by feature.
- Provide dependencies at the narrowest valid scope.
- Keep components thin.
- Keep transport models out of UI components.
- Do not put every state value in a global store.
- Do not let shared code depend on feature code.
- Prefer explicit data flow over hidden cross-feature communication.

## Version Policy

Target the latest stable Angular release supported by the team. Avoid documenting assumptions that depend on unreleased roadmap items. When Angular defaults change, update the boilerplate configuration and ADRs deliberately.
