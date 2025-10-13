# Setup Guide for @billing-system/types

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd types
pnpm install
```

### Step 2: Build Types

```bash
pnpm build
```

This will compile TypeScript files to JavaScript and generate `.d.ts` declaration files in the `dist/` folder.

### Step 3: Link to Backend and Frontend

#### Option A: Using pnpm link (Development)

```bash
# In types directory
pnpm link

# In backend directory
cd ../backend
pnpm link @billing-system/types

# In frontend directory
cd ../frontend
pnpm link @billing-system/types
```

#### Option B: Using pnpm Workspace (Recommended)

Create `pnpm-workspace.yaml` in root directory:

```yaml
packages:
  - 'backend'
  - 'frontend'
  - 'types'
```

Then in `backend/package.json` and `frontend/package.json`:

```json
{
  "dependencies": {
    "@billing-system/types": "workspace:*"
  }
}
```

Run from root:
```bash
pnpm install
```

#### Option C: Publish to npm (Production)

```bash
# Login to npm
npm login

# Publish package
npm publish --access public
```

Then install in backend/frontend:
```bash
pnpm add @billing-system/types
```

---

## Usage Examples

### Backend Usage

#### Sequelize Model

```typescript
// backend/src/models/User.ts
import { Model, DataTypes } from 'sequelize';
import { User as IUser, UserRole, UserStatus } from '@billing-system/types';

export class User extends Model implements IUser {
  declare id: string;
  declare email: string;
  declare password: string;
  declare role: UserRole;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare status: UserStatus;
  declare providerId?: string | null;
  declare twoFactorEnabled: boolean;
  declare twoFactorSecret?: string | null;
  declare resetToken?: string | null;
  declare resetTokenExpiry?: Date | null;
  declare lastLoginAt?: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
  },
  // ... other fields
}, {
  sequelize,
  tableName: 'users',
});
```

#### tRPC Router

```typescript
// backend/src/trpc/routers/user.ts
import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { 
  UserPublic, 
  CreateUserInput, 
  UpdateUserInput,
  UserRole,
  UserStatus 
} from '@billing-system/types';

export const userRouter = router({
  create: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      role: z.nativeEnum(UserRole),
    }))
    .mutation(async ({ input }): Promise<UserPublic> => {
      const user = await User.create(input);
      return user.toJSON() as UserPublic;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      status: z.nativeEnum(UserStatus).optional(),
    }))
    .mutation(async ({ input }): Promise<UserPublic> => {
      const user = await User.findByPk(input.id);
      await user.update(input);
      return user.toJSON() as UserPublic;
    }),
});
```

#### Service Layer

```typescript
// backend/src/services/BillingService.ts
import { 
  BillingRecord as IBillingRecord,
  CreateBillingRecordInput,
  BillingStatus 
} from '@billing-system/types';

export class BillingService {
  async createBillingRecord(input: CreateBillingRecordInput): Promise<IBillingRecord> {
    const record = await BillingRecord.create({
      ...input,
      previousBalance: 0,
      totalDue: input.amount,
      amountPaid: 0,
      remainingBalance: input.amount,
      status: BillingStatus.PENDING,
    });
    
    return record.toJSON() as IBillingRecord;
  }
}
```

---

### Frontend Usage

#### Redux Slice

```typescript
// frontend/src/store/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPublic, UserRole } from '@billing-system/types';

interface UserState {
  users: UserPublic[];
  currentUser: UserPublic | null;
  loading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserPublic>) => {
      state.currentUser = action.payload;
    },
  },
});
```

#### React Component

```typescript
// frontend/src/components/UserList.tsx
import { UserPublic, UserRole, UserStatus } from '@billing-system/types';
import { Card, Badge } from '@heroui/react';

interface UserListProps {
  users: UserPublic[];
}

export const UserList = ({ users }: UserListProps) => {
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'danger';
      case UserRole.PROVIDER:
        return 'primary';
      case UserRole.CUSTOMER:
        return 'success';
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Badge color={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
              <Badge color={user.status === UserStatus.ACTIVE ? 'success' : 'warning'}>
                {user.status}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
```

#### tRPC Client

```typescript
// frontend/src/hooks/useUsers.ts
import { trpc } from '@/lib/trpc';
import { UserRole, UserStatus } from '@billing-system/types';

export const useUsers = () => {
  const { data: users, isLoading } = trpc.user.list.useQuery({
    role: UserRole.CUSTOMER,
    status: UserStatus.ACTIVE,
    page: 1,
    limit: 20,
  });

  const createUser = trpc.user.create.useMutation();

  return {
    users: users?.users || [],
    isLoading,
    createUser: createUser.mutate,
  };
};
```

---

## Development Workflow

### Watch Mode

For active development, run watch mode in types package:

```bash
cd types
pnpm watch
```

This will automatically rebuild types when you make changes.

### Making Changes

1. Edit files in `types/src/`
2. Types automatically rebuild (if watch mode is running)
3. Backend and frontend automatically get updated types
4. TypeScript compiler will catch any breaking changes

### Adding New Types

1. Create new file in appropriate directory:
   - Models: `src/models/NewModel.ts`
   - Enums: `src/enums/NewEnum.ts`

2. Export from index file:
   ```typescript
   // src/models/index.ts
   export * from './NewModel';
   ```

3. Rebuild:
   ```bash
   pnpm build
   ```

---

## Troubleshooting

### Types not updating

```bash
# Unlink and relink
cd types
pnpm unlink

cd ../backend
pnpm unlink @billing-system/types
pnpm link ../types

cd ../frontend
pnpm unlink @billing-system/types
pnpm link ../types
```

### Build errors

```bash
# Clean and rebuild
cd types
pnpm clean
pnpm build
```

### Import errors

Make sure you're importing from the package name:
```typescript
// ✅ Correct
import { User } from '@billing-system/types';

// ❌ Wrong
import { User } from '../types/src/models/User';
```

---

## Best Practices

1. **Always use enums** instead of string literals
2. **Create input/output types** for API operations
3. **Use Omit/Pick** for derived types (e.g., `UserPublic`)
4. **Keep types in sync** with database schema
5. **Document complex types** with JSDoc comments
6. **Version your types** when making breaking changes
