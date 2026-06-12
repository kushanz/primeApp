# Getting Started

## Prerequisites

- Supported Node.js LTS version
- Package manager selected by the project
- Angular CLI compatible with the project Angular version
- Access to required backend environments

## Setup

```bash
git clone <repository-url>
cd <repository>
npm ci
npm start
```

## Required Checks

```bash
npm run lint
npm test
npm run build
```

## First Feature

1. Create a folder under `src/app/features/`.
2. Add lazy-loaded routes.
3. Create a page component.
4. Add feature UI components.
5. Add a data-access service.
6. Introduce a SignalStore only when state is shared or behavior warrants it.
7. Add unit tests.
8. Update documentation when introducing a new pattern.

## New Component Checklist

- Standalone
- OnPush
- Typed inputs and outputs
- Accessible markup
- Local signals kept private/readonly
- No direct API calls in presentational UI
- Tests for behavior, not implementation trivia
