@frontend/AGENTS.md

# IDN Capital — Agent Instructions

## Project Structure

```
idn_capital/
├── frontend/          # Next.js 16 + React 19
├── Auth-service/      # Express 5 microservice
├── billing-service/   # Express 5 microservice (in development)
└── docker-compose.yaml
```

Each backend service is an independent Node.js + TypeScript application. Do not share code between services — replicate patterns instead.

---

## Backend: Clean Architecture

Every service follows the same four-layer structure. Never skip layers or import across them in the wrong direction.

```
domain/         ← no external dependencies, pure TypeScript
application/    ← depends only on domain
infrastructure/ ← depends on domain + application, implements their interfaces
presentation/   ← depends on application, handles HTTP only
```

### Domain Layer

**Entities** — rich domain models with private properties and public getters:

```typescript
export class User {
  private readonly _id: string;
  private readonly _email: string;

  constructor(props: UserProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._email = props.email;
  }

  get id(): string { return this._id; }
  get email(): string { return this._email; }
}
```

**Repository interfaces** — operate on domain entities, never on ORM models:

```typescript
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
```

**Errors** — extend `DomainError`, pass context in the message:

```typescript
export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`User with email ${email} already exists.`);
  }
}
```

### Application Layer

**Use cases** — one public `execute()` method, constructor injection only:

```typescript
export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async execute(data: CreateUserDto): Promise<RegisterResponse> { ... }
}
```

**DTOs** — Zod schema first, type inferred from schema:

```typescript
export const CreateUserSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(6).max(100),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
```

**Response DTOs** — class with a static `fromEntity()` factory:

```typescript
export class UserResponseDto {
  static fromUser(user: User): UserResponseDto { ... }
}
```

### Infrastructure Layer

**Composition root** — `infrastructure/config/dependencies.ts` is the only place where concrete implementations are instantiated and wired:

```typescript
export const userRepository = new PrismaUserRepository(prisma);
export const hashService = new BcryptHashService(10);
export const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashService,
  tokenService
);
```

**Repository implementations** — always convert between ORM models and domain entities. Never leak Prisma types into the application layer:

```typescript
export class PrismaUserRepository implements IUserRepository {
  private toDomain(record: PrismaUser): User { ... }
  private toPrisma(user: User) { ... }
}
```

### Presentation Layer

**Controllers** — thin. Parse input, call use case, return response. No business logic:

```typescript
export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = CreateUserSchema.parse(req.body);
      const result = await this.registerUserUseCase.execute(dto);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
```

**Error handler** — single global middleware maps domain errors to HTTP status codes:

```typescript
// UserAlreadyExistsError  → 409
// InvalidCredentialsError → 401
// ZodError                → 400
// DomainError             → 400
// Error                   → 500
```

Response shape is always `{ success: boolean, data?: T, error?: { message, code } }`.

---

## Frontend: Next.js + Redux

### State Management

Auth state lives in Redux Toolkit. Access it only through `useAuth`:

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, loading, error, isAuthenticated } = useAppSelector(s => s.auth);
  return { user, loading, error, isAuthenticated, login, register, logout };
}
```

Async API calls use `createAsyncThunk` with `rejectWithValue` for error handling.

### Route Protection

Middleware in `src/middleware.ts` handles redirects at the edge using the `token` cookie. Do not add route protection inside components.

### Folder Conventions

- Route groups with `(name)` — `(auth)`, `(dashboard)` — for logical separation without URL impact
- Tests colocated in `__tests__/` next to the file under test
- Reusable components in `app/components/ui/`, page sections in `app/components/sections/`
- Zod schemas in `lib/validations/`, TypeScript types in `lib/types/`
- API methods in `lib/api/`, Redux in `lib/store/`

### Validation

Mirror backend Zod schemas in the frontend. Use `.pipe()` for chained transforms, `.trim()` and `.toLowerCase()` for normalization.

---

## Testing

Tests live in `__tests__/` colocated with the source file. Use Jest.

**Unit test structure:**

```typescript
describe('RegisterUserUseCase', () => {
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    mockUserRepository = { findByEmail: jest.fn(), create: jest.fn(), ... };
    useCase = new RegisterUserUseCase(mockUserRepository, mockHashService, mockTokenService);
  });

  it('should register a new user successfully', async () => {
    // Arrange
    mockUserRepository.findByEmail.mockResolvedValue(null);
    // Act
    const result = await useCase.execute(validData);
    // Assert
    expect(result.token).toBeDefined();
  });

  it('should throw UserAlreadyExistsError if email is taken', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    await expect(useCase.execute(validData)).rejects.toThrow(UserAlreadyExistsError);
  });
});
```

Always mock at the interface boundary. Test the happy path, error cases, and data transformations.

---

## TypeScript Conventions

- `I` prefix for interfaces (`IUserRepository`, `IHashService`)
- `Schema` suffix for Zod schemas (`CreateUserSchema`)
- `Dto` suffix for data transfer objects (`CreateUserDto`, `UserResponseDto`)
- `private readonly` for injected dependencies in classes
- `_camelCase` for private entity properties, public getters without prefix
- `CONSTANT_CASE` for route constants and configuration keys
- Prefer `interface` for contracts and extensible shapes; `type` for aliases and inferred types

---

## New Services

When creating a new microservice (e.g., `billing-service`):

1. Replicate the exact folder structure from `Auth-service/src/`
2. Create the same scripts in `package.json` (`dev`, `build`, `test`, `lint`, `format`)
3. Add the service to `docker-compose.yaml` with health check and `depends_on`
4. Wire all dependencies in `infrastructure/config/dependencies.ts`
5. Add the service port to the README services section
