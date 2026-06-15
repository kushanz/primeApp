# Progress Tracker

Use this file as the running task ledger for the project.

## Rules

- Update this file whenever a task is completed
- Update this file whenever a new pending task is identified
- Keep entries short, dated, and easy to scan

## Current Status

### Completed

- `2026-06-13` — Added auth flow updates for Laravel token-based login, logout, and `/me` hydration
- `2026-06-13` — Established `progress_md` documentation hierarchy and linked Angular boilerplate reference docs
- `2026-06-13` — Updated app components to use `ChangeDetectionStrategy.OnPush` as the default component change-detection pattern
- `2026-06-13` — Refreshed the login page visual style with modern typography, softer glass-card styling, and improved spacing/colors
- `2026-06-13` — Refreshed the register page to match the updated auth-screen visual system and layout style
- `2026-06-13` — Refined topbar profile loading UI so `/me` loading state uses a compact icon spinner without overflow
- `2026-06-13` — Switched the topbar profile trigger from `p-button` to the native topbar action button so the loading icon fits the existing layout correctly
- `2026-06-14` — Updated user DTOs, service mapping, and user-list bindings for the new `/api/users` response shape with `data` and `meta`

### In Progress

- None recorded

### Pending

- Align remaining protected feature APIs with bearer-token auth where needed
- Audit `user.service.ts` and related feature APIs for consistency with the current auth model
- Review remaining component files and future additions to keep `OnPush` as the default pattern
- Continue documenting each new feature, route, and store as development expands

## Update Template

### Completed

- `YYYY-MM-DD` — Short summary

### In Progress

- `YYYY-MM-DD` — Short summary

### Pending

- Short summary
