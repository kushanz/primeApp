# API Integration

## Data-Access Boundary

All HTTP communication belongs in data-access services.

```typescript
@Injectable()
export class UsersApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${this.config.apiBaseUrl}/users`,
    );
  }
}
```

## DTO Mapping

Do not leak transport-specific fields into UI code.

```typescript
export function mapUserDto(dto: UserDto): User {
  return {
    id: dto.id,
    displayName: `${dto.firstName} ${dto.lastName}`.trim(),
    email: dto.email,
  };
}
```

## Rules

- Type request and response bodies.
- Encode query parameters with `HttpParams`.
- Do not manually concatenate untrusted query strings.
- Centralize cross-cutting headers in interceptors.
- Keep API services free from UI notifications.
- Handle cancellation through RxJS where relevant.
- Define pagination and filtering contracts explicitly.
- Do not cache blindly with `shareReplay()`.

## Cache Questions

Before adding a client cache, answer:

- Who owns invalidation?
- How long is data valid?
- Does tenant/user context affect the key?
- What happens after a write?
- Can stale data cause a security or correctness issue?
