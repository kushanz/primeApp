# Naming Conventions

## Files

```text
user-card.component.ts
users-api.service.ts
users.store.ts
user.dto.ts
user.model.ts
user.mapper.ts
auth.guard.ts
api-error.interceptor.ts
date-range.util.ts
```

## Classes and Types

```typescript
UserCardComponent
UsersApiService
UserDto
User
CreateUserRequest
UsersState
RequestStatus
```

## Signals

Name signals by the value they expose:

```typescript
readonly users = signal<User[]>([]);
readonly selectedUserId = signal<string | null>(null);
readonly isLoading = computed(() => this.status() === 'loading');
```

Do not add `$` to signals.

## Observables

Use the `$` suffix:

```typescript
readonly users$: Observable<User[]>;
readonly searchResults$: Observable<User[]>;
```

## Methods

Use verbs:

```text
loadUsers
selectUser
clearSelection
submitForm
mapUserDto
```

## Boolean Values

Use affirmative names:

```text
isLoading
hasPermission
canSubmit
shouldRefresh
```

Avoid confusing negative names such as `isNotDisabled`.
