/**
 * API Error Handling Types
 * 
 * Comprehensive TypeScript types for API error handling, validation errors,
 * success/failure response patterns, and HTTP status code mappings.
 * Provides standardized error handling across all API endpoints.
 * 
 * @fileoverview API error handling type definitions
 * @version 1.0.0
 */

/**
 * API error response structure
 * 
 * Standardized error response structure for all API endpoints
 * with detailed error information and context.
 * 
 * @example
 * ```typescript
 * const error: APIError = {
 *   status: 400,
 *   code: 'VALIDATION_ERROR',
 *   message: 'Invalid input data provided',
 *   details: {
 *     fieldErrors: [
 *       { field: 'email', message: 'Invalid email format', code: 'INVALID_EMAIL', value: 'invalid-email' }
 *     ],
 *     context: { requestId: 'req-123', timestamp: new Date() }
 *   }
 * };
 * ```
 */
export interface APIError {
  /** HTTP status code */
  status: number;
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: {
    /** Field-specific errors */
    fieldErrors?: FieldError[];
    /** Stack trace in development */
    stack?: string;
    /** Request context */
    context?: Record<string, any>;
    /** Suggested actions for resolution */
    suggestions?: string[];
    /** Documentation links */
    documentation?: string[];
  };
}

/**
 * Field-level validation error
 * 
 * Detailed validation error information for specific fields
 * in request data with context and suggested fixes.
 * 
 * @example
 * ```typescript
 * const fieldError: FieldError = {
 *   field: 'ownershipPercentage',
 *   message: 'Ownership percentage must be between 0 and 100',
 *   code: 'OUT_OF_RANGE',
 *   value: 150,
 *   constraints: { min: 0, max: 100 },
 *   suggestion: 'Please enter a value between 0 and 100'
 * };
 * ```
 */
export interface FieldError {
  /** Field name that failed validation */
  field: string;
  /** Validation error message */
  message: string;
  /** Error code for this field */
  code: string;
  /** Invalid value that was provided */
  value?: any;
  /** Validation constraints */
  constraints?: Record<string, any>;
  /** Suggested fix for the error */
  suggestion?: string;
}

/**
 * Standardized success response
 * 
 * Consistent success response structure for all API endpoints
 * with data, metadata, and performance information.
 * 
 * @example
 * ```typescript
 * const success: SuccessResponse<PartnerDashboardData> = {
 *   success: true,
 *   data: {
 *     overview: { totalEarnings: 45000, ... },
 *     recentEarnings: [...],
 *     partnerships: [...]
 *   },
 *   metadata: {
 *     timestamp: new Date(),
 *     processingTime: 150,
 *     version: 'v1.0',
 *     cacheHit: false
 *   }
 * };
 * ```
 */
export interface SuccessResponse<T = any> {
  /** Success status (always true) */
  success: true;
  /** Response data */
  data: T;
  /** Response metadata */
  metadata?: {
    /** Response timestamp */
    timestamp: Date;
    /** Request processing time in ms */
    processingTime: number;
    /** API version */
    version: string;
    /** Whether response was served from cache */
    cacheHit?: boolean;
    /** Cache expiration time */
    cacheExpires?: Date;
  };
}

/**
 * Standardized error response
 * 
 * Consistent error response structure for all API endpoints
 * with error details and debugging information.
 * 
 * @example
 * ```typescript
 * const errorResponse: ErrorResponse = {
 *   success: false,
 *   error: {
 *     status: 401,
 *     code: 'UNAUTHORIZED',
 *     message: 'Invalid session token',
 *     details: {
 *       context: { requestId: 'req-123' },
 *       suggestions: ['Please log in again', 'Check if session has expired']
 *     }
 *   },
 *   metadata: {
 *     timestamp: new Date(),
 *     requestId: 'req-123'
 *   }
 * };
 * ```
 */
export interface ErrorResponse {
  /** Success status (always false) */
  success: false;
  /** Error information */
  error: APIError;
  /** Response metadata */
  metadata?: {
    /** Response timestamp */
    timestamp: Date;
    /** Request identifier */
    requestId: string;
    /** Support ticket reference */
    supportReference?: string;
  };
}

/**
 * HTTP status code mappings
 * 
 * Mapping of common error scenarios to HTTP status codes
 * for consistent API behavior across all endpoints.
 */
export const HTTP_STATUS_CODES = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Common API error codes
 * 
 * Standardized error codes for consistent error handling
 * across all API endpoints and client applications.
 */
export const API_ERROR_CODES = {
  // Authentication Errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // Validation Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  OUT_OF_RANGE: 'OUT_OF_RANGE',
  
  // Business Logic Errors
  PARTNERSHIP_NOT_FOUND: 'PARTNERSHIP_NOT_FOUND',
  PARTNER_NOT_VERIFIED: 'PARTNER_NOT_VERIFIED',
  INSUFFICIENT_EARNINGS: 'INSUFFICIENT_EARNINGS',
  OWNERSHIP_EXCEEDED: 'OWNERSHIP_EXCEEDED',
  
  // System Errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

/**
 * Error severity levels
 * 
 * Classification of errors by severity for logging,
 * monitoring, and alerting purposes.
 */
export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Enhanced error with severity and tracking
 * 
 * Extended error interface with severity classification,
 * tracking information, and resolution guidance.
 * 
 * @example
 * ```typescript
 * const enhancedError: EnhancedAPIError = {
 *   status: 500,
 *   code: 'DATABASE_ERROR',
 *   message: 'Database connection failed',
 *   severity: 'HIGH',
 *   tracking: {
 *     errorId: 'err-123',
 *     occurredAt: new Date(),
 *     userId: 'p1',
 *     endpoint: '/api/partner/dashboard'
 *   },
 *   resolution: {
 *     automated: false,
 *     estimatedTime: '5-10 minutes',
 *     actions: ['Check database connectivity', 'Restart database service']
 *   }
 * };
 * ```
 */
export interface EnhancedAPIError extends APIError {
  /** Error severity level */
  severity: ErrorSeverity;
  /** Error tracking information */
  tracking: {
    /** Unique error identifier */
    errorId: string;
    /** When error occurred */
    occurredAt: Date;
    /** User ID if available */
    userId?: string;
    /** API endpoint where error occurred */
    endpoint: string;
    /** Request method */
    method: string;
  };
  /** Resolution information */
  resolution?: {
    /** Whether error can be resolved automatically */
    automated: boolean;
    /** Estimated resolution time */
    estimatedTime: string;
    /** Suggested resolution actions */
    actions: string[];
    /** Support contact information */
    support?: {
      /** Support email */
      email: string;
      /** Support ticket URL */
      ticketUrl?: string;
    };
  };
}

/**
 * API validation result
 * 
 * Result of API validation operations with detailed
 * error information and success indicators.
 * 
 * @example
 * ```typescript
 * const validationResult: APIValidationResult = {
 *   isValid: false,
 *   errors: [
 *     { field: 'email', message: 'Invalid email format', code: 'INVALID_EMAIL' },
 *     { field: 'phone', message: 'Phone number required', code: 'MISSING_REQUIRED_FIELD' }
 *   ],
 *   warnings: [
 *     { field: 'ownershipPercentage', message: 'High ownership percentage', code: 'HIGH_OWNERSHIP' }
 *   ]
 * };
 * ```
 */
export interface APIValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors */
  errors: FieldError[];
  /** Validation warnings */
  warnings?: FieldError[];
  /** Validation summary */
  summary?: {
    /** Total fields validated */
    totalFields: number;
    /** Fields with errors */
    errorFields: number;
    /** Fields with warnings */
    warningFields: number;
  };
}

/**
 * API operation result
 * 
 * Generic result type for API operations that can
 * succeed or fail with detailed error information.
 * 
 * @example
 * ```typescript
 * const result: APIOperationResult<PartnerData> = {
 *   success: true,
 *   data: { id: 'p1', email: 'partner@example.com', ... },
 *   metadata: { processingTime: 150 }
 * };
 * 
 * // Or for error case:
 * const errorResult: APIOperationResult<PartnerData> = {
 *   success: false,
 *   error: { status: 400, code: 'VALIDATION_ERROR', message: 'Invalid data' }
 * };
 * ```
 */
export type APIOperationResult<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Error handler function type
 * 
 * Type definition for error handler functions used
 * in API clients and middleware.
 * 
 * @example
 * ```typescript
 * const errorHandler: ErrorHandler = (error, context) => {
 *   console.error('API Error:', error);
 *   
 *   if (error.code === 'SESSION_EXPIRED') {
 *     // Redirect to login
 *     window.location.href = '/login';
 *   }
 *   
 *   return {
 *     handled: true,
 *     retry: error.status >= 500,
 *     delay: 1000
 *   };
 * };
 * ```
 */
export type ErrorHandler = (
  error: APIError,
  context: {
    endpoint: string;
    method: string;
    attempt: number;
    maxAttempts: number;
  }
) => {
  /** Whether error was handled */
  handled: boolean;
  /** Whether to retry the request */
  retry?: boolean;
  /** Delay before retry in ms */
  delay?: number;
  /** Custom error message */
  customMessage?: string;
};

/**
 * Error boundary props
 * 
 * Props for React error boundary components
 * handling API errors in the UI.
 * 
 * @example
 * ```typescript
 * const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
 *   error,
 *   onRetry,
 *   onReport,
 *   fallback
 * }) => {
 *   return (
 *     <div className="error-boundary">
 *       <h2>Something went wrong</h2>
 *       <p>{error.message}</p>
 *       {onRetry && <button onClick={onRetry}>Retry</button>}
 *       {onReport && <button onClick={() => onReport(error)}>Report Issue</button>}
 *       {fallback}
 *     </div>
 *   );
 * };
 * ```
 */
export interface ErrorBoundaryProps {
  /** Error to display */
  error: APIError;
  /** Retry handler */
  onRetry?: () => void;
  /** Error reporting handler */
  onReport?: (error: APIError) => void;
  /** Fallback UI component */
  fallback?: any;
  /** Whether to show technical details */
  showDetails?: boolean;
}