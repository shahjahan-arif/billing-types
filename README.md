# @mikromanage/types

Shared TypeScript types for Billing Management & Notification System.

## Installation

### Local Development (pnpm link)

```bash
# In types directory
pnpm install
pnpm build
pnpm link

# In backend directory
pnpm link @mikromanage/types

# In frontend directory
pnpm link @mikromanage/types
```

### Using pnpm Workspace

```yaml
# pnpm-workspace.yaml (in root)
packages:
  - 'backend'
  - 'frontend'
  - 'types'
```

Then in backend/frontend package.json:
```json
{
  "dependencies": {
    "@mikromanage/types": "workspace:*"
  }
}
```

## Usage

### Backend

```typescript
import { User, UserRole, CreateUserInput } from '@mikromanage/types';

export class UserModel extends Model implements User {
  declare id: string;
  declare email: string;
  // ... other fields
}
```

### Frontend

```typescript
import { User, UserRole, PaymentStatus } from '@mikromanage/types';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};
```

## Development

```bash
# Build types
pnpm build

# Watch mode (auto-rebuild on changes)
pnpm watch

# Clean build artifacts
pnpm clean
```

## Structure

```
types/
├── src/
│   ├── models/          # Domain models
│   ├── enums/           # Enumerations
│   ├── api/             # API request/response types
│   ├── utils/           # Utility types
│   └── index.ts         # Main export
├── package.json
├── tsconfig.json
└── README.md
```
