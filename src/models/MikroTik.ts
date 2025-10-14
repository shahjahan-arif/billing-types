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
