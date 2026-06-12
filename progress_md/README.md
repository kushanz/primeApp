# `progress_md`

This folder is the working documentation hub for the `primeApp` Angular + PrimeNG project.

## Purpose

Use this folder to keep:

- project-level rules and guard rails
- architecture references
- feature and user-story records
- progress tracking for completed and pending tasks

## Core Files

- `master.md` — top-level index for project documentation and development workflow
- `master instruction.md` — permanent project guard rails, coding rules, and collaboration rules
- `progress-tracker.md` — source of truth for completed, in-progress, and pending work
- `user-story.md` — feature/user-story log; every new store created during development must be recorded here

## Working Rules

- Every completed task must update `progress-tracker.md`
- Every new feature must be reflected in `user-story.md`
- Every new store added under `src/app/store` must be documented in `user-story.md`
- New development must follow the Angular architecture, PrimeNG usage, and state-management rules linked below
- This folder should be treated as the project memory for future development sessions

## Current Project Architecture Reference

- `../PROJECT_ARCHITECTURE_GUIDE.md`

## Angular Boilerplate Docs

### Top-Level Docs

- `angular-boilerplate-docs/README.md`
- `angular-boilerplate-docs/FILE-HIERARCHY.md`
- `angular-boilerplate-docs/CHANGELOG.md`
- `angular-boilerplate-docs/CONTRIBUTING.md`

### Architecture

- `angular-boilerplate-docs/docs/architecture/overview.md`
- `angular-boilerplate-docs/docs/architecture/folder-structure.md`
- `angular-boilerplate-docs/docs/architecture/dependency-rules.md`
- `angular-boilerplate-docs/docs/architecture/data-flow.md`
- `angular-boilerplate-docs/docs/architecture/reactive-programming.md`
- `angular-boilerplate-docs/docs/architecture/state-management.md`

### Development

- `angular-boilerplate-docs/docs/development/getting-started.md`
- `angular-boilerplate-docs/docs/development/environment-configuration.md`
- `angular-boilerplate-docs/docs/development/api-integration.md`
- `angular-boilerplate-docs/docs/development/authentication.md`
- `angular-boilerplate-docs/docs/development/testing.md`
- `angular-boilerplate-docs/docs/development/deployment.md`

### Standards

- `angular-boilerplate-docs/docs/standards/angular-coding-standards.md`
- `angular-boilerplate-docs/docs/standards/component-guidelines.md`
- `angular-boilerplate-docs/docs/standards/naming-conventions.md`
- `angular-boilerplate-docs/docs/standards/error-handling.md`
- `angular-boilerplate-docs/docs/standards/security.md`
- `angular-boilerplate-docs/docs/standards/accessibility.md`

### Decisions

- `angular-boilerplate-docs/docs/decisions/0001-use-signals-for-local-ui-state.md`
- `angular-boilerplate-docs/docs/decisions/0002-use-ngrx-signal-store.md`
- `angular-boilerplate-docs/docs/decisions/0003-use-rxjs-for-complex-streams.md`
- `angular-boilerplate-docs/docs/decisions/0004-use-feature-first-architecture.md`

### Templates

- `angular-boilerplate-docs/docs/templates/feature-checklist.md`
- `angular-boilerplate-docs/docs/templates/pull-request-checklist.md`
- `angular-boilerplate-docs/docs/templates/architecture-decision-template.md`

## Recommended Maintenance Flow

1. Read `master instruction.md`
2. Review `master.md`
3. Implement the requested change
4. Update `user-story.md` if feature scope changed or a new store was added
5. Update `progress-tracker.md` before closing the task
