import { UserRole, UserStatus } from '../enums';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
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
export interface UserPublic extends Omit<User, 'password' | 'twoFactorSecret' | 'resetToken' | 'resetTokenExpiry'> {}

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
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: UserStatus;
}

// Login input
export interface LoginInput {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  user: UserPublic;
  sessionToken: string;
}

// Password reset request
export interface PasswordResetRequestInput {
  email: string;
}

// Password reset
export interface PasswordResetInput {
  token: string;
  newPassword: string;
}

// Customer Management Types
// Note: Import ServiceType, SubscriptionStatus, MikroTikStatus from their respective files

/**
 * Create customer input
 * Used for creating new customers with subscriptions and MikroTik integration
 */
export interface CreateCustomerInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  subscriptions?: Array<{
    monthlyRate: number;
    serviceType: any; // ServiceType enum - use any to avoid circular dependency
    packageId?: string;
    notes?: string;
    status?: any; // SubscriptionStatus enum
  }>;
  mikrotik?: {
    username: string;
    password: string;
    profile: string;
    routerId: string;
  };
  status?: UserStatus;
  createBilling?: boolean;
}

/**
 * Update unified customer input
 * Used for atomic updates of customer data, subscriptions, and MikroTik settings
 */
export interface UpdateUnifiedCustomerInput {
  customerId: string;
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string; // Optional: Update customer password
    status?: UserStatus;
  };
  subscriptions?: Array<{
    id?: string;
    monthlyRate: number;
    serviceType: any; // ServiceType enum
    status?: any; // SubscriptionStatus enum
    action?: 'create' | 'update' | 'delete';
  }>;
  mikrotik?: {
    profile?: string;
    status?: any; // MikroTikStatus enum
  };
}

/**
 * Activate customer input
 * Used for activating pending customers (PENDING → ACTIVE)
 */
export interface ActivateCustomerInput {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscriptions?: Array<{
    id: string;
    monthlyRate: number;
  }>;
}

/**
 * Customer list filters
 */
export interface CustomerListFilters {
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Unified customer response
 * Complete customer data with all related entities
 */
export interface UnifiedCustomerResponse {
  user: UserPublic;
  subscriptions?: any[]; // Subscription[]
  billing?: any[]; // BillingRecord[]
  payments?: any[]; // Payment[]
  mikrotik?: any; // MikroTikUser
  equipment?: any[]; // Equipment[]
  monthlyTotal?: number;
  paymentStats?: {
    totalPaid: number;
    totalPending: number;
    lastPaymentDate?: Date;
  };
}

/**
 * Customer list response
 */
export interface CustomerListResponse {
  customers: UnifiedCustomerResponse[];
  count: number;
  totalPages: number;
}

/**
 * Customer statistics response
 * Used for customer dashboard stats
 */
export interface CustomerStatsResponse {
  totalPendingAmount: number; // Total accumulated unpaid balance
  currentStatus: UserStatus; // Customer account status
  currentBillDueDate: Date | null; // Current month bill due date
  monthlyAmount: number; // Regular monthly subscription amount
}
