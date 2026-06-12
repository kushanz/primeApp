# State Management

## Purpose

Define how application state is selected, owned and updated.

## Core Principle

Use the smallest mechanism that correctly handles the state's scope and lifecycle.

## Selection Guide

| Scenario | Recommended solution |
|---|---|
| Toggle, selected tab, panel state | Local signal |
| Derived value | `computed()` |
| Form values and validation | Typed Reactive Forms |
| Shared feature state | Feature-scoped SignalStore |
| Genuine application-wide state | Root-scoped SignalStore |
| Request cancellation, retry or polling | RxJS |
| One-use server response | Data-access service call |
| Static configuration | Injection token/config service |

## Local State

Use `signal()` for state owned by one component.

```typescript
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly searchTerm = signal('');
  private readonly usersState = signal<User[]>([]);

  readonly users = this.usersState.asReadonly();

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.users().filter(user =>
      user.name.toLowerCase().includes(term),
    );
  });
}
```

## Signal Rules

- Expose readonly signals.
- Keep writable signals private whenever possible.
- Use `computed()` for derived values.
- Update objects and arrays immutably.
- Do not duplicate derivable state.
- Do not use an `effect()` to copy one signal into another.

Avoid:

```typescript
this.users().push(newUser);
```

Use:

```typescript
this.usersState.update(users => [...users, newUser]);
```

## When to Use SignalStore

Use SignalStore when state:

- Is shared by multiple components in a feature.
- Includes loading, success, empty and error states.
- Requires reusable business operations.
- Must survive replacement of individual components.
- Contains an entity collection.
- Needs a clear API and ownership boundary.

Do not create a store merely because a component has state.

## Store Scope

### Feature-scoped

Default for business feature state:

```typescript
export const USERS_ROUTES: Routes = [
  {
    path: '',
    providers: [UsersStore],
    loadComponent: () =>
      import('./pages/users-list-page/users-list-page.component')
        .then(m => m.UsersListPageComponent),
  },
];
```

### Root-scoped

Use only for genuinely global state:

- Authenticated user summary
- Tenant context
- Application permissions
- Global user preferences

## Store Example

```typescript
interface UsersState {
  users: User[];
  selectedUserId: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  status: 'idle',
  error: null,
};

export const UsersStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    selectedUser: computed(() =>
      store.users().find(user => user.id === store.selectedUserId()) ?? null,
    ),
  })),

  withMethods((store, api = inject(UsersApiService)) => ({
    selectUser(userId: string | null): void {
      patchState(store, { selectedUserId: userId });
    },

    async loadUsers(): Promise<void> {
      patchState(store, { status: 'loading', error: null });

      try {
        const users = await firstValueFrom(api.getUsers());
        patchState(store, { users, status: 'success' });
      } catch {
        patchState(store, {
          status: 'error',
          error: 'Unable to load users.',
        });
      }
    },
  })),
);
```

For cancellation, debouncing, polling or multi-source streams, use RxJS integration rather than forcing everything through promises.

## State Smells

- One global store containing every feature
- Store-per-component
- Public writable signals
- Duplicating store state into component signals
- HTTP calls in presentational components
- Subjects used as mutable state containers
- Boolean combinations that permit impossible request states
