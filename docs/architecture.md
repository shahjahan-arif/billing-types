# Shared Types Package Architecture Document

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-22 | 1.0 | Initial shared types architecture documentation | Winston (Architect) |

## Overview

Shared TypeScript types package for the Billing Management System monorepo. Provides type definitions, interfaces, and enums used across frontend, backend, and Solana contract integration.

### Core Purpose

- **Type Consistency**: Single source of truth for all types
- **Type Safety**: End-to-end type safety across frontend and backend
- **DRY Principle**: Avoid duplicating type definitions
- **tRPC Integration**: Export AppRouter type for frontend tRPC client
- **Developer Experience**: Autocomplete and type checking in all packages

### Key Benefits

- ✅ **Single Source of Truth**: All types defined once
- ✅ **Compile-Time Safety**: Catch type errors before runtime
- ✅ **Refactoring Safety**: Change types in one place
- ✅ **IDE Support**: Full autocomplete and IntelliSense
- ✅ **Documentation**: Types serve as documentation
- ✅ **Monorepo Integration**: Seamless workspace integration

## Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Language** | TypeScript | 5.3+ | Type definitions | Industry standard for type safety |
| **Build Tool** | tsc | 5.3+ | TypeScript compiler | Official TypeScript compiler |
| **Package Manager** | pnpm | 8+ | Workspace management | Fast, efficient, monorepo support |
| **Module System** | CommonJS | - | Module format | Compatible with Node.js backend |
| **Declaration Files** | .d.ts | - | Type declarations | Enables type checking in consumers |

### Key Architectural Decisions

1. **CommonJS Module**: Compatible with Node.js backend
2. **Declaration Maps**: Enable "Go to Definition" in IDEs
3. **Strict Mode**: Maximum type safety
4. **Workspace Protocol**: pnpm workspace integration
5. **Separate Concerns**: Models, enums, API types organized separately

## Project Structure

```
types/
├── src/
│   ├── models/                   # Domain models
│   │   ├── User.ts               # User types
│   │   ├── BillingRecord.ts      # Billing types
│   │   ├── Payment.ts            # Payment types
│   │   ├── MikroTik.ts           # MikroTik types
│   │   ├── MikroTikRouter.ts     # Router types
│   │   ├── MikroTikUser.ts       # MikroTik user types
│   │   ├── Notification.ts       # Notification types
│   │   ├── Ticket.ts             # Support ticket types
│   │   ├── Equipment.ts          # Equipment types
│   │   ├── Session.ts            # Session types
│   │   ├── Solana.ts             # Solana blockchain types
│   │   ├── EscrowReference.ts    # Escrow tracking types
│   │   ├── AuditLog.ts           # Audit log types
│   │   ├── Analytics.ts          # Analytics types
│   │   ├── UserGroup.ts          # User group types
│   │   ├── Cache.ts              # Cache types
│   │   └── index.ts              # Model exports
│   │
│   ├── enums/                    # Enumerations
│   │   ├── UserRole.ts           # User roles & status
│   │   ├── PaymentStatus.ts      # Payment statuses
│   │   ├── BillingStatus.ts      # Billing statuses
│   │   ├── TicketStatus.ts       # Ticket statuses
│   │   ├── NotificationType.ts   # Notification types
│   │   ├── EquipmentStatus.ts    # Equipment statuses
│   │   ├── MikroTikStatus.ts     # MikroTik statuses
│   │   └── index.ts              # Enum exports
│   │
│   ├── api/                      # API request/response types
│   │   └── index.ts              # API type exports
│   │
│   ├── backend/                  # Backend-specific types
│   │   ├── AppRouter.ts          # tRPC AppRouter type
│   │   └── index.ts              # Backend exports
│   │
│   ├── utils/                    # Utility types
│   │   ├── ApiResponse.ts        # Standard API response
│   │   ├── Pagination.ts         # Pagination types
│   │   └── index.ts              # Utility exports
│   │
│   └── index.ts                  # Main entry point
│
├── dist/                         # Compiled output
│   ├── index.js                  # Compiled JavaScript
│   ├── index.d.ts                # Type declarations
│   └── index.d.ts.map            # Declaration source maps
│
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Package documentation
```

### Key Components

1. **models/**: Domain entity types (User, Payment, etc.)
2. **enums/**: Enumeration types (UserRole, PaymentStatus, etc.)
3. **api/**: API request/response types
4. **backend/**: Backend-specific types (AppRouter)
5. **utils/**: Utility types (ApiResponse, Pagination)

## Type Categories

### 1. Domain Models

**Purpose**: Define structure of domain entities

**Example - User Model**:

```typescript
// models/User.ts
import { UserRole, UserStatus } from '../enums';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  mikrotikUsername?: string | null;
  monthlyAmount?: number | null;
  solanaWallet?: string | null;
  status: UserStatus;
  providerId?: string | null;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Public user (without sensitive fields)
export interface UserPublic extends Omit<User, 'password' | 'twoFactorSecret' | 'resetToken'> {}

// Create user input
export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  providerId?: string;
  status?: UserStatus;
}

// Update user input
export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  monthlyAmount?: number;
  status?: UserStatus;
}
```

**Pattern**:
- Base interface (full entity)
- Public interface (without sensitive fields)
- Create input (required fields for creation)
- Update input (optional fields for updates)

### 2. Enumerations

**Purpose**: Define fixed sets of values

**Example - User Enums**:

```typescript
// enums/UserRole.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED',
}
```

**Available Enums**:
- `UserRole` - ADMIN, PROVIDER, CUSTOMER
- `UserStatus` - PENDING, ACTIVE, SUSPENDED, INACTIVE, REJECTED
- `PaymentStatus` - PENDING, COMPLETED, FAILED, REFUNDED
- `BillingStatus` - PENDING, PAID, OVERDUE, CANCELLED
- `TicketStatus` - OPEN, IN_PROGRESS, RESOLVED, CLOSED
- `NotificationType` - SYSTEM, PAYMENT, BILLING, TICKET
- `EquipmentStatus` - AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED
- `MikroTikStatus` - CONNECTED, DISCONNECTED, ERROR

### 3. API Types

**Purpose**: Define API request/response structures

**Example - API Response**:

```typescript
// utils/ApiResponse.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### 4. Backend Types

**Purpose**: Export backend tRPC router type

```typescript
// backend/AppRouter.ts
export type AppRouter = {
  auth: any;
  user: any;
  admin: any;
  billing: any;
  payment: any;
  mikrotik: any;
  notification: any;
  ticket: any;
  userGroup: any;
  equipment: any;
  analytics: any;
  solana: any;
  cacheMonitoring: any;
  auditLog: any;
};
```

**Note**: The actual AppRouter type is generated by tRPC from the backend router definitions. This is a placeholder for development.

### 5. Utility Types

**Purpose**: Reusable utility types

```typescript
// utils/Pagination.ts
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

## Usage Examples

### Backend Usage

```typescript
// backend/src/models/User.ts
import { Model, DataTypes } from 'sequelize';
import { User as IUser, UserRole, UserStatus } from '@billing-system/types';

export class User extends Model<IUser> implements IUser {
  declare id: string;
  declare email: string;
  declare password: string;
  declare role: UserRole;
  declare firstName: string;
  declare lastName: string;
  // ... other fields
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      defaultValue: UserStatus.PENDING,
    },
    // ... other fields
  },
  { sequelize, tableName: 'users' }
);
```

### Frontend Usage

```typescript
// frontend/components/UserList.tsx
import { User, UserRole, UserStatus } from '@billing-system/types';

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Role: {user.role}</p>
          <p>Status: {user.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### tRPC Usage

```typescript
// frontend/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@billing-system/types';

export const trpc = createTRPCReact<AppRouter>();

// Usage in component
const { data: users } = trpc.user.list.useQuery();
// users is fully typed!
```

## Monorepo Integration

### pnpm Workspace Configuration

```yaml
# pnpm-workspace.yaml (root)
packages:
  - 'frontend'
  - 'backend'
  - 'solana-contract'
  - 'types'
```

### Package Dependencies

**Backend package.json**:
```json
{
  "dependencies": {
    "@billing-system/types": "workspace:*"
  }
}
```

**Frontend package.json**:
```json
{
  "dependencies": {
    "@billing-system/types": "workspace:*"
  }
}
```

### Installation

```bash
# From root directory
pnpm install

# Types package is automatically linked to frontend and backend
```

## Development Workflow

### Building Types

```bash
# Navigate to types directory
cd types

# Build types
pnpm build

# Watch mode (auto-rebuild on changes)
pnpm watch

# Clean build artifacts
pnpm clean
```

### Adding New Types

1. **Create type file**:
   ```bash
   # Create new model
   touch src/models/NewModel.ts
   ```

2. **Define types**:
   ```typescript
   // src/models/NewModel.ts
   export interface NewModel {
     id: string;
     name: string;
     createdAt: Date;
   }

   export interface CreateNewModelInput {
     name: string;
   }
   ```

3. **Export from index**:
   ```typescript
   // src/models/index.ts
   export * from './NewModel';
   ```

4. **Rebuild**:
   ```bash
   pnpm build
   ```

5. **Use in other packages**:
   ```typescript
   import { NewModel } from '@billing-system/types';
   ```

### Type Changes

When modifying types:

1. **Update type definition** in `types/src/`
2. **Rebuild types**: `pnpm build`
3. **TypeScript will catch errors** in frontend/backend
4. **Fix errors** in consuming packages
5. **Commit changes** together

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,           // Generate .d.ts files
    "declarationMap": true,        // Generate .d.ts.map files
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,                // Enable all strict checks
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Key Settings

- **declaration**: Generate `.d.ts` type declaration files
- **declarationMap**: Enable "Go to Definition" in IDEs
- **strict**: Maximum type safety
- **outDir**: Compiled output directory
- **rootDir**: Source directory

## Best Practices

### 1. Type Organization

```typescript
// ✅ Good: Organized by domain
models/
  User.ts
  Payment.ts
  BillingRecord.ts

// ❌ Bad: All types in one file
types.ts
```

### 2. Naming Conventions

```typescript
// ✅ Good: Clear, descriptive names
export interface User { }
export interface CreateUserInput { }
export interface UpdateUserInput { }
export interface UserPublic { }

// ❌ Bad: Unclear names
export interface UserData { }
export interface UserDTO { }
export interface UserModel { }
```

### 3. Optional vs Required

```typescript
// ✅ Good: Clear optionality
export interface User {
  id: string;                    // Required
  email: string;                 // Required
  phone?: string;                // Optional
  lastLoginAt?: Date | null;     // Optional, can be null
}

// ❌ Bad: Unclear optionality
export interface User {
  id: string;
  email: string;
  phone: string | undefined;     // Use ? instead
}
```

### 4. Enum Usage

```typescript
// ✅ Good: String enums
export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER',
}

// ❌ Bad: Numeric enums (harder to debug)
export enum UserRole {
  ADMIN,
  PROVIDER,
  CUSTOMER,
}
```

### 5. Type Reuse

```typescript
// ✅ Good: Reuse with Omit/Pick
export interface User {
  id: string;
  email: string;
  password: string;
  // ... other fields
}

export interface UserPublic extends Omit<User, 'password'> {}

// ❌ Bad: Duplicate definitions
export interface UserPublic {
  id: string;
  email: string;
  // ... duplicated fields
}
```

## Type Safety Benefits

### 1. Compile-Time Errors

```typescript
// Backend
const user: User = {
  id: '123',
  email: 'test@example.com',
  // TypeScript error: Missing required fields
};

// Frontend
<UserCard user={user} />
// TypeScript error if user doesn't match User type
```

### 2. Autocomplete

```typescript
// IDE provides autocomplete for all User fields
const email = user.email;
const role = user.role; // Autocomplete suggests: ADMIN, PROVIDER, CUSTOMER
```

### 3. Refactoring Safety

```typescript
// Change User interface
export interface User {
  id: string;
  email: string;
  fullName: string; // Changed from firstName + lastName
}

// TypeScript catches all places that need updates
// Backend models, frontend components, etc.
```

## Summary

This shared types package provides:

- **Type Consistency**: Single source of truth for all types
- **Type Safety**: Compile-time error detection
- **Developer Experience**: Autocomplete, IntelliSense, Go to Definition
- **Refactoring Safety**: Change types in one place
- **Documentation**: Types serve as living documentation
- **Monorepo Integration**: Seamless pnpm workspace integration
- **tRPC Support**: AppRouter type for frontend tRPC client

The package is organized by domain (models, enums, API types) and follows TypeScript best practices (strict mode, declaration files, clear naming conventions).

**Package Name**: `@billing-system/types`  
**Version**: 1.0.0  
**Module System**: CommonJS  
**TypeScript**: 5.3+ (strict mode)
