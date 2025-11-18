/**
 * MikroTik Integration Types
 * Type definitions for MikroTik RouterOS API integration
 *
 * Note: These are different from MikroTikUser model
 * These represent raw RouterOS API responses
 */

/**
 * MikroTik Router Configuration
 * Connection configuration for MikroTik router
 */
export interface MikroTikConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

/**
 * MikroTik RouterOS PPPoE Secret
 * Raw PPPoE secret from RouterOS API
 */
export interface MikroTikRouterOSUser {
  ".id": string;
  name: string;
  password: string;
  service: string;
  profile: string;
  "local-address"?: string;
  "remote-address"?: string;
  disabled?: string; // 'true' or 'false'
}

/**
 * MikroTik Active Connection
 * Active PPPoE connection from RouterOS API
 */
export interface MikroTikActiveConnection {
  ".id": string;
  name: string;
  address: string;
  uptime: string;
  "caller-id": string;
}

/**
 * MikroTik Router Status
 */
export enum MikroTikRouterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERROR = 'ERROR',
}

/**
 * MikroTik Router Model
 * Database model for storing provider's router configurations
 */
export interface MikroTikRouter {
  id: string;
  providerId: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string; // Encrypted
  status: MikroTikRouterStatus;
  lastSync: Date;
  lastError?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * MikroTik Router Public (without sensitive data)
 */
export interface MikroTikRouterPublic {
  id: string;
  providerId: string;
  name: string;
  host: string;
  port: number;
  username: string;
  status: MikroTikRouterStatus;
  lastSync: Date;
  lastError?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * MikroTik User Sync Types
 * Types for manual user sync feature
 */

/**
 * MikroTik User with Status
 * User from router with added/not-added status
 */
export interface MikroTikUserWithStatus {
  username: string;
  password: string;
  profile: string;
  disabled: boolean;
  isAdded: boolean;
  customerId: string | null;
  customerName: string | null;
}

/**
 * Sync Users Response
 * Response from fetchUsers API
 */
export interface SyncUsersResponse {
  users: MikroTikUserWithStatus[];
  total: number;
  added: number;
  notAdded: number;
  page: number;
  totalPages: number;
}

/**
 * Add User Input
 * Input for adding user as customer
 */
export interface AddUserInput {
  username: string;
  mikrotikPassword: string;
  profile: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyRate: number; // Monthly billing amount
  packageId?: string;
}

/**
 * Add Customers Response
 * Response from addUsersAsCustomers API
 */
export interface AddCustomersResponse {
  created: number;
  failed: number;
  customers: any[]; // UserPublic[] - avoiding circular dependency
  errors: Array<{ username: string; error: string }>;
}

/**
 * Fetch Users Input
 * Query parameters for fetchUsers API
 */
export interface FetchUsersInput {
  page?: number;
  limit?: number;
  filter?: 'all' | 'added' | 'notAdded';
  search?: string;
}




/**
 * Bulk Import Types
 */

/**
 * Bulk Import Response
 */
export interface BulkImportResponse {
  imported: number;
  failed: number;
  errors: Array<{ username: string; error: string }>;
}

/**
 * Update Customer Input
 */
export interface UpdateCustomerInput {
  userId: string;
  providerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyRate: number;
}

/**
 * Pending Customer Filters
 */
export interface PendingCustomerFilters {
  page?: number;
  limit?: number;
  search?: string;
  dateFilter?: 'all' | 'today' | 'week' | 'month';
}
