# @billing-system/types - Complete Structure

## 📁 Directory Structure

```
types/
├── src/
│   ├── models/              # Domain models (13 files)
│   │   ├── User.ts          # User, UserPublic, CreateUserInput, UpdateUserInput
│   │   ├── Session.ts       # Session, SessionPublic
│   │   ├── BillingRecord.ts # BillingRecord, BillingRecordWithUser
│   │   ├── Payment.ts       # Payment, PaymentWithRelations
│   │   ├── MikroTikUser.ts  # MikroTikUser, ConnectionStatus, BandwidthUsage
│   │   ├── Notification.ts  # Notification, CreateNotificationInput
│   │   ├── Ticket.ts        # Ticket, TicketMessage, TicketWithRelations
│   │   ├── Equipment.ts     # Equipment, EquipmentWithRelations
│   │   ├── UserGroup.ts     # UserGroup, UserGroupWithMembers
│   │   ├── Analytics.ts     # RevenueTrend, PaymentBehavior, DashboardStats
│   │   ├── AuditLog.ts      # AuditLog, AuditLogQuery
│   │   ├── Solana.ts        # SolanaWallet, VerifyTransactionInput
│   │   └── index.ts         # Export all models
│   │
│   ├── enums/               # Enumerations (8 files)
│   │   ├── UserRole.ts      # UserRole, UserStatus
│   │   ├── BillingStatus.ts # BillingStatus
│   │   ├── PaymentStatus.ts # PaymentMethod, PaymentStatus
│   │   ├── NotificationType.ts # NotificationType, NotificationChannel, NotificationStatus
│   │   ├── TicketStatus.ts  # TicketStatus, TicketPriority, TicketCategory
│   │   ├── EquipmentStatus.ts # EquipmentType, EquipmentStatus
│   │   ├── MikroTikStatus.ts # MikroTikStatus, UserGroupType
│   │   └── index.ts         # Export all enums
│   │
│   ├── api/                 # API request/response types
│   │   └── index.ts         # Re-export all API types from models
│   │
│   ├── utils/               # Utility types
│   │   ├── Pagination.ts    # PaginationQuery, PaginationResponse
│   │   ├── ApiResponse.ts   # ApiSuccessResponse, ApiErrorResponse
│   │   └── index.ts         # Export all utilities
│   │
│   └── index.ts             # Main entry point (exports everything)
│
├── package.json             # Package configuration
├── tsconfig.json            # TypeScript configuration
├── .gitignore               # Git ignore rules
├── .npmignore               # npm ignore rules
├── README.md                # Package documentation
├── SETUP.md                 # Setup and usage guide
├── QUICK-REFERENCE.md       # Quick reference for common types
└── STRUCTURE.md             # This file
```

## 📊 Statistics

- **Total Files**: 30+
- **Models**: 13
- **Enums**: 8 files (20+ enum types)
- **Utilities**: 2
- **Documentation**: 4 files

## 🎯 Key Features

### 1. Complete Type Coverage
- ✅ All database models
- ✅ All API inputs/outputs
- ✅ All enumerations
- ✅ Utility types (pagination, API responses)

### 2. Type Safety
- ✅ Strict TypeScript configuration
- ✅ No `any` types
- ✅ Proper null handling
- ✅ Enum-based constants

### 3. Developer Experience
- ✅ Clear naming conventions
- ✅ Comprehensive documentation
- ✅ Easy to import and use
- ✅ Auto-completion support

### 4. Maintainability
- ✅ Organized by domain
- ✅ Single source of truth
- ✅ Easy to extend
- ✅ Version controlled

## 📦 Exported Types Summary

### Models (50+ types)
- User, UserPublic, CreateUserInput, UpdateUserInput, LoginInput, LoginResponse
- Session, SessionPublic
- BillingRecord, BillingRecordWithUser, CreateBillingRecordInput
- Payment, PaymentWithRelations, SubmitPaymentInput, VerifyPaymentInput
- MikroTikUser, ConnectionStatus, BandwidthUsage
- Notification, CreateNotificationInput, SendBulkNotificationInput
- Ticket, TicketMessage, TicketWithRelations, CreateTicketInput
- Equipment, EquipmentWithRelations, CreateEquipmentInput
- UserGroup, UserGroupWithMembers, CreateUserGroupInput
- Analytics types (RevenueTrend, PaymentBehavior, DashboardStats, etc.)
- AuditLog, AuditLogQuery
- Solana types (SolanaWallet, VerifyTransactionInput, etc.)

### Enums (20+ enums)
- UserRole, UserStatus
- BillingStatus
- PaymentMethod, PaymentStatus
- NotificationType, NotificationChannel, NotificationStatus
- TicketStatus, TicketPriority, TicketCategory
- EquipmentType, EquipmentStatus
- MikroTikStatus, UserGroupType

### Utilities
- PaginationQuery, PaginationResponse, createPaginationResponse()
- ApiSuccessResponse, ApiErrorResponse, createSuccessResponse(), createErrorResponse()

## 🚀 Usage Patterns

### Backend
```typescript
import { User, UserRole, CreateUserInput } from '@billing-system/types';

// Sequelize model implements interface
export class UserModel extends Model implements User { ... }

// Service uses input types
async createUser(input: CreateUserInput): Promise<User> { ... }
```

### Frontend
```typescript
import { UserPublic, UserRole } from '@billing-system/types';

// Component props
interface UserListProps {
  users: UserPublic[];
}

// Type-safe enum usage
const isAdmin = user.role === UserRole.ADMIN;
```

### tRPC (Automatic)
```typescript
// Backend exports AppRouter
export type AppRouter = typeof appRouter;

// Frontend gets automatic types
const { data } = trpc.user.list.useQuery();
// data is automatically typed as UserPublic[]
```

## 🔄 Update Workflow

1. Edit types in `src/`
2. Run `pnpm build` (or `pnpm watch`)
3. Types automatically available in backend/frontend
4. TypeScript catches breaking changes

## 📝 Naming Conventions

- **Models**: PascalCase (e.g., `User`, `BillingRecord`)
- **Enums**: PascalCase (e.g., `UserRole`, `PaymentStatus`)
- **Interfaces**: PascalCase (e.g., `CreateUserInput`)
- **Input types**: `Create*Input`, `Update*Input`, `*Query`
- **Response types**: `*Response`, `*WithRelations`
- **Public types**: `*Public` (without sensitive fields)

## 🎓 Best Practices

1. **Always use enums** instead of string literals
2. **Create separate input types** for create/update operations
3. **Use Omit/Pick** for derived types
4. **Keep types in sync** with database schema
5. **Document complex types** with JSDoc
6. **Version breaking changes** properly

## 🔗 Related Files

- Backend models: `backend/src/models/`
- Frontend types: `frontend/src/types/`
- tRPC routers: `backend/src/trpc/routers/`
- Database schema: `docs/architecture.md` (Section 10)
