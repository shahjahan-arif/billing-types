/**
 * Partner API Types
 * 
 * Comprehensive TypeScript types for partner portal API requests, responses,
 * and integration patterns. Provides type safety for partner authentication,
 * dashboard data, earnings, analytics, and profile management APIs.
 * 
 * @fileoverview Partner portal API type definitions
 * @version 1.0.0
 */

import { UpdatePartnerProfileInput } from '../models/PartnerAuth';
import { EarningsFilters } from '../utils/Filters';

/**
 * Base partner API request with session token
 * 
 * Base interface for all partner API requests providing
 * common authentication and request metadata.
 * 
 * @example
 * ```typescript
 * const request: PartnerAPIRequest = {
 *   sessionToken: 'jwt-token-here'
 * };
 * ```
 */
export interface PartnerAPIRequest {
  /** Optional session token for authentication */
  sessionToken?: string;
  /** Request unique identifier */
  requestId?: string;
  /** Client information */
  clientInfo?: {
    /** User agent string */
    userAgent: string;
    /** Client IP address */
    ipAddress: string;
    /** Client timezone */
    timezone: string;
  };
}

/**
 * Partner dashboard data request
 * 
 * Request for retrieving complete partner dashboard data
 * including overview metrics, recent earnings, and notifications.
 * 
 * @example
 * ```typescript
 * const request: PartnerDashboardRequest = {
 *   sessionToken: 'jwt-token-here',
 *   includeNotifications: true,
 *   notificationLimit: 10
 * };
 * ```
 */
export interface PartnerDashboardRequest extends PartnerAPIRequest {
  /** Whether to include notifications in response */
  includeNotifications?: boolean;
  /** Maximum number of notifications to include */
  notificationLimit?: number;
  /** Whether to include recent earnings */
  includeRecentEarnings?: boolean;
  /** Maximum number of recent earnings to include */
  recentEarningsLimit?: number;
}

/**
 * Partner earnings data request
 * 
 * Request for retrieving partner earnings data with
 * filtering, pagination, and analytics options.
 * 
 * @example
 * ```typescript
 * const request: PartnerEarningsRequest = {
 *   sessionToken: 'jwt-token-here',
 *   filters: {
 *     year: 2025,
 *     status: ShareStatus.PAID,
 *     page: 1,
 *     limit: 20
 *   },
 *   includeAnalytics: true
 * };
 * ```
 */
export interface PartnerEarningsRequest extends PartnerAPIRequest {
  /** Optional filters for earnings data */
  filters?: EarningsFilters;
  /** Whether to include analytics summary */
  includeAnalytics?: boolean;
  /** Whether to include distribution details */
  includeDistributions?: boolean;
  /** Export format if requesting data export */
  exportFormat?: 'JSON' | 'CSV' | 'PDF';
}

/**
 * Partner analytics data request
 * 
 * Request for retrieving partner analytics data with
 * time range selection and comparison options.
 * 
 * @example
 * ```typescript
 * const request: PartnerAnalyticsRequest = {
 *   sessionToken: 'jwt-token-here',
 *   timeRange: '6M',
 *   includeComparisons: true,
 *   includeForecast: false
 * };
 * ```
 */
export interface PartnerAnalyticsRequest extends PartnerAPIRequest {
  /** Time range for analytics */
  timeRange?: '3M' | '6M' | '1Y' | '2Y' | 'ALL';
  /** Whether to include comparison data */
  includeComparisons?: boolean;
  /** Whether to include forecast data */
  includeForecast?: boolean;
  /** Specific metrics to include */
  metrics?: ('earnings' | 'roi' | 'investment' | 'growth')[];
}

/**
 * Partner profile update request
 * 
 * Request for updating partner profile information
 * with validation and change tracking.
 * 
 * @example
 * ```typescript
 * const request: PartnerProfileUpdateRequest = {
 *   sessionToken: 'jwt-token-here',
 *   profileData: {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     phone: '+1-555-0123',
 *     bankingDetails: {
 *       bankName: 'Example Bank',
 *       accountNumber: '****1234',
 *       routingNumber: '123456789',
 *       accountHolderName: 'John Doe'
 *     }
 *   },
 *   validateOnly: false
 * };
 * ```
 */
export interface PartnerProfileUpdateRequest extends PartnerAPIRequest {
  /** Profile data to update */
  profileData: UpdatePartnerProfileInput;
  /** Whether to only validate without saving */
  validateOnly?: boolean;
  /** Fields to update (if partial update) */
  fieldsToUpdate?: string[];
}

/**
 * Standardized partner API response wrapper
 * 
 * Generic response wrapper providing consistent structure
 * for all partner API responses with error handling and metadata.
 * 
 * @example
 * ```typescript
 * const response: PartnerAPIResponse<PartnerDashboardData> = {
 *   success: true,
 *   data: {
 *     overview: { totalEarnings: 45000, ... },
 *     recentEarnings: [...],
 *     partnerships: [...],
 *     notifications: [...]
 *   },
 *   metadata: {
 *     timestamp: new Date(),
 *     requestId: 'req-123',
 *     processingTime: 150,
 *     version: 'v1.0'
 *   }
 * };
 * ```
 */
export interface PartnerAPIResponse<T = any> {
  /** Success status */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error information if failed */
  error?: {
    /** Error code */
    code: string;
    /** Error message */
    message: string;
    /** Additional error details */
    details?: any;
    /** Field-specific errors */
    fieldErrors?: {
      /** Field name */
      field: string;
      /** Error message */
      message: string;
      /** Error code */
      code: string;
    }[];
  };
  /** Response metadata */
  metadata?: {
    /** Response timestamp */
    timestamp: Date;
    /** Request identifier */
    requestId: string;
    /** Processing time in milliseconds */
    processingTime?: number;
    /** API version */
    version?: string;
    /** Rate limit information */
    rateLimit?: {
      /** Requests remaining */
      remaining: number;
      /** Rate limit reset time */
      resetTime: Date;
      /** Rate limit window */
      limit: number;
    };
  };
}

/**
 * Paginated partner API response
 * 
 * Extended API response for paginated data with
 * pagination metadata and navigation information.
 * 
 * @example
 * ```typescript
 * const response: PaginatedPartnerAPIResponse<PartnerEarningDetail> = {
 *   success: true,
 *   data: [...],
 *   pagination: {
 *     page: 1,
 *     limit: 20,
 *     total: 150,
 *     totalPages: 8,
 *     hasNextPage: true,
 *     hasPreviousPage: false
 *   },
 *   metadata: { ... }
 * };
 * ```
 */
export interface PaginatedPartnerAPIResponse<T = any> extends PartnerAPIResponse<T[]> {
  /** Pagination information */
  pagination: {
    /** Current page number */
    page: number;
    /** Items per page */
    limit: number;
    /** Total items count */
    total: number;
    /** Total pages count */
    totalPages: number;
    /** Whether there is a next page */
    hasNextPage: boolean;
    /** Whether there is a previous page */
    hasPreviousPage: boolean;
  };
}

/**
 * Partner API client configuration
 * 
 * Configuration interface for partner API client
 * including authentication, timeouts, and retry settings.
 * 
 * @example
 * ```typescript
 * const config: PartnerAPIClientConfig = {
 *   baseURL: 'https://api.example.com/partner',
 *   timeout: 30000,
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Accept': 'application/json'
 *   },
 *   sessionToken: 'jwt-token-here',
 *   retry: {
 *     attempts: 3,
 *     delay: 1000,
 *     backoff: 'exponential'
 *   }
 * };
 * ```
 */
export interface PartnerAPIClientConfig {
  /** Base API URL */
  baseURL: string;
  /** Default timeout in milliseconds */
  timeout: number;
  /** Default headers */
  headers: Record<string, string>;
  /** Session token for authentication */
  sessionToken?: string;
  /** Retry configuration */
  retry: {
    /** Number of retry attempts */
    attempts: number;
    /** Delay between retries in ms */
    delay: number;
    /** Backoff strategy */
    backoff?: 'linear' | 'exponential';
  };
  /** Request interceptors */
  interceptors?: {
    /** Request interceptor */
    request?: (config: any) => any;
    /** Response interceptor */
    response?: (response: any) => any;
    /** Error interceptor */
    error?: (error: any) => any;
  };
}

/**
 * API request context
 * 
 * Context information for API requests including
 * user session, request metadata, and tracking information.
 * 
 * @example
 * ```typescript
 * const context: APIRequestContext = {
 *   requestId: 'req-123',
 *   userAgent: 'Mozilla/5.0...',
 *   ipAddress: '192.168.1.100',
 *   timestamp: new Date(),
 *   session: {
 *     token: 'jwt-token-here',
 *     partner: { id: 'p1', email: 'partner@example.com', ... }
 *   },
 *   tracing: {
 *     traceId: 'trace-456',
 *     spanId: 'span-789'
 *   }
 * };
 * ```
 */
export interface APIRequestContext {
  /** Request unique identifier */
  requestId: string;
  /** User agent string */
  userAgent: string;
  /** Client IP address */
  ipAddress: string;
  /** Request timestamp */
  timestamp: Date;
  /** Session information */
  session?: {
    /** Session token */
    token: string;
    /** Partner information */
    partner: {
      /** Partner ID */
      id: string;
      /** Partner email */
      email: string;
      /** Partner name */
      name: string;
    };
  };
  /** Distributed tracing information */
  tracing?: {
    /** Trace ID */
    traceId: string;
    /** Span ID */
    spanId: string;
    /** Parent span ID */
    parentSpanId?: string;
  };
}

/**
 * API health check response
 * 
 * Response structure for API health check endpoints
 * providing system status and performance metrics.
 * 
 * @example
 * ```typescript
 * const health: APIHealthResponse = {
 *   status: 'healthy',
 *   timestamp: new Date(),
 *   version: 'v1.0.0',
 *   uptime: 86400000,
 *   services: {
 *     database: { status: 'healthy', responseTime: 15 },
 *     redis: { status: 'healthy', responseTime: 5 },
 *     external: { status: 'degraded', responseTime: 2500 }
 *   }
 * };
 * ```
 */
export interface APIHealthResponse {
  /** Overall system status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Health check timestamp */
  timestamp: Date;
  /** API version */
  version: string;
  /** System uptime in milliseconds */
  uptime: number;
  /** Individual service statuses */
  services: {
    /** Database status */
    database: {
      /** Service status */
      status: 'healthy' | 'degraded' | 'unhealthy';
      /** Response time in ms */
      responseTime: number;
    };
    /** Redis cache status */
    redis: {
      /** Service status */
      status: 'healthy' | 'degraded' | 'unhealthy';
      /** Response time in ms */
      responseTime: number;
    };
    /** External services status */
    external: {
      /** Service status */
      status: 'healthy' | 'degraded' | 'unhealthy';
      /** Response time in ms */
      responseTime: number;
    };
  };
}