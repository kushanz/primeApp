# Application Data Flow

## Purpose

Describe the expected flow of data and user intent.

## Read Flow

```text
Backend
  ↓
Data-access service
  ↓
DTO mapping
  ↓
SignalStore or page-level stream
  ↓
Computed presentation state
  ↓
Page component
  ↓
UI component
  ↓
Template
```

## Write Flow

```text
User action
  ↓
UI output / page handler
  ↓
Store method or use-case operation
  ↓
Data-access service
  ↓
Backend
  ↓
Store update
  ↓
Computed state
  ↓
UI refresh
```

## Rules

- UI components receive data and emit intent.
- Page components coordinate feature behavior.
- Stores own shared feature state.
- Data-access services own transport concerns.
- DTOs are mapped before reaching presentation code.
- Components do not manually synchronize duplicated state.
- Errors remain visible and typed long enough to be handled correctly.

## Server State

Do not automatically persist every server response in a store.

Store server data when:

- Multiple components consume it.
- It must survive component changes.
- It is updated optimistically.
- It participates in feature-wide derived state.
- Reload behavior must be controlled.

For a one-time page request, a route resolver, resource, Observable or page-level signal may be enough.
