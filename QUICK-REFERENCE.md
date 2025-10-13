# Quick Reference Guide

## Common Imports

```typescript
// User types
import { 
  User, 
  UserPublic, 
  UserRole, 
  UserStatus,
  CreateUserInput,
  UpdateUserInput 
} from '@billing-system/types';

// Billing types
import { 
  BillingRecord, 
  BillingStatus,
  CreateBillingRecordInput 
} from '@billing-system/types';

// Payment types
import { 
  Payment, 
  PaymentMethod, 
  PaymentStatus,
  SubmitPaymentInput 
} from '@billing-system/types';

// Notification types
import { 
  Notification, 
  NotificationType, 
  NotificationChannel 
} from '@billing-system/types';

// All enums
import { 
  UserRole, 
  UserStatus, 
  BillingStatus, 
  PaymentStatus,
  PaymentMethod,
  NotificationType,
  TicketStatus,
  EquipmentStatus 
} from '@billing-system/types';
```

## Type Hierarchy

```
User (full with password)
  └── UserPublic (without sensitive fields)

BillingRecord
  └── BillingRecordWithUser (includes user relation)

Payment
  └── PaymentWithRelations (includes user, billing, verifier)

Ticket
  └── TicketWithRelations (includes user, assignee, messages)
```

## Input/Output Patterns

```typescript
// Create operations
CreateUserInput → User
CreateBillingRecordInput → BillingRecord
SubmitPaymentInput → Payment

// Update operations
UpdateUserInput → UserPublic
VerifyPaymentInput → Payment

// List operations
BillingRecordListQuery → BillingRecordListResponse
PaymentListQuery → PaymentListResponse
```

## Enum Values

```typescript
// UserRole
UserRole.ADMIN
UserRole.PROVIDER
UserRole.CUSTOMER

// UserStatus
UserStatus.PENDING
UserStatus.ACTIVE
UserStatus.SUSPENDED
UserStatus.INACTIVE
UserStatus.REJECTED

// BillingStatus
BillingStatus.PENDING
BillingStatus.PARTIAL
BillingStatus.PAID
BillingStatus.OVERDUE

// PaymentMethod
PaymentMethod.CASH
PaymentMethod.BANK_TRANSFER
PaymentMethod.ONLINE
PaymentMethod.CRYPTO

// PaymentStatus
PaymentStatus.PENDING
PaymentStatus.VERIFIED
PaymentStatus.REJECTED
```

## Common Patterns

### Type Guards

```typescript
import { UserRole } from '@billing-system/types';

function isAdmin(user: UserPublic): boolean {
  return user.role === UserRole.ADMIN;
}

function isProvider(user: UserPublic): boolean {
  return user.role === UserRole.PROVIDER;
}
```

### Filtering by Enum

```typescript
import { UserStatus } from '@billing-system/types';

const activeUsers = users.filter(u => u.status === UserStatus.ACTIVE);
```

### Type-safe API Calls

```typescript
import { CreateUserInput, UserPublic } from '@billing-system/types';

async function createUser(input: CreateUserInput): Promise<UserPublic> {
  return await trpc.user.create.mutate(input);
}
```
