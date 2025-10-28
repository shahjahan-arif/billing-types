/**
 * MikroTik Router API Types
 * Type definitions for router management
 */

import { MikroTikRouterStatus } from './MikroTik';

/**
 * Create MikroTik Router Input
 */
export interface CreateMikroTikRouterInput {
  name: string;
  host: string;
  port?: number;
  username: string;
  password: string;
}

/**
 * Update MikroTik Router Input
 */
export interface UpdateMikroTikRouterInput {
  name?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  status?: MikroTikRouterStatus;
  lastSync?: Date;
  lastError?: string | null;
}

/**
 * Test Router Connection Input
 */
export interface TestRouterConnectionInput {
  host: string;
  port?: number;
  username: string;
  password: string;
}

/**
 * Router List Query
 */
export interface RouterListQuery {
  status?: MikroTikRouterStatus;
  page?: number;
  limit?: number;
}

/**
 * Router List Response
 */
export interface RouterListResponse {
  routers: Array<{
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
  }>;
  count: number;
}
