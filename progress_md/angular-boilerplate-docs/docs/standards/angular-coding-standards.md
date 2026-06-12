# Angular Coding Standards

## Components

- Use standalone components.
- Set `ChangeDetectionStrategy.OnPush`.
- Keep components focused.
- Prefer signal inputs and outputs where supported by the project target.
- Use `inject()` consistently.
- Avoid logic-heavy templates.
- Use `track` in control-flow loops.
- Prefer built-in control flow.

```typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = output<string>();
}
```

## Templates

Prefer:

```html
@if (user(); as currentUser) {
  <h2>{{ currentUser.name }}</h2>
} @else {
  <app-empty-state />
}

@for (item of items(); track item.id) {
  <app-item-card [item]="item" />
}
```

Avoid function calls in templates when they perform non-trivial work.

## Services

- Keep services single-purpose.
- Separate API transport from domain mapping.
- Return typed values.
- Do not expose mutable internal state.
- Avoid generic `UtilityService` or `CommonService` classes.

## TypeScript

- Enable strict mode.
- Avoid `any`.
- Prefer discriminated unions for state.
- Prefer `unknown` at unsafe boundaries.
- Use readonly properties where applicable.
- Do not use non-null assertions to silence design problems.
- Model nullable values explicitly.
- Keep DTOs separate from domain models when shapes differ.

## Imports

- Prefer direct imports.
- Avoid large barrels.
- Keep import boundaries visible.
- Use path aliases only when they improve ownership clarity.

## Immutability

Never mutate state-held arrays or objects in place.

```typescript
patchState(store, {
  users: [...store.users(), createdUser],
});
```
