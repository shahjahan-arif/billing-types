/**
 * Backend AppRouter Type
 * 
 * This file provides the AppRouter type structure for frontend use.
 * Defines all available tRPC routers and their procedures.
 * 
 * Note: This is a simplified type definition. The actual type safety
 * comes from tRPC's runtime validation and Zod schemas at runtime.
 * 
 * For full type safety, the backend needs to be built and types exported.
 * This placeholder allows frontend development to proceed.
 */

/**
 * Main AppRouter type
 * 
 * This represents the structure of the backend tRPC router.
 * Each property corresponds to a router in backend/src/trpc/routers/
 * 
 * Available routers:
 * - auth: Authentication & registration
 * - user: User management
 * - admin: Admin operations
 * - billing: Billing records
 * - payment: Payment processing
 * - mikrotik: Router management
 * - notification: Notifications
 * - ticket: Support tickets
 * - userGroup: User groups
 * - equipment: Equipment inventory
 * - analytics: Analytics & reports
 * - solana: Blockchain payments
 * - cacheMonitoring: Cache monitoring
 * - auditLog: Audit logs
 */
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
