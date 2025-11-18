/**
 * tRPC Integration Types
 * 
 * Comprehensive TypeScript types for tRPC router definitions, procedure types,
 * client-side hooks, and error handling. Provides end-to-end type safety
 * from frontend to backend through tRPC procedures.
 * 
 * @fileoverview tRPC integration type definitions
 * @version 1.0.0
 */

import { PartnerLoginInput, PartnerLoginResponse, PartnerRegistrationInput, PartnerRegistrationResponse, PartnerSessionData, PartnerData } from '../models/PartnerAuth';
import { PartnerDashboardData } from '../models/PartnerDashboard';
import { PartnerEarningsResponse } from '../models/PartnerEarnings';
import { PartnerAnalyticsData } from '../models/PartnerAnalytics';
import { UpdatePartnerProfileInput } from '../models/PartnerAuth';
import { PartnershipVerificationResponse, CustomerPartnershipEarningsResponse } from './PartnershipVerification';
import { EarningsFilters } from '../utils/Filters';

/**
 * tRPC partner authentication router types
 * 
 * Type definitions for all partner authentication procedures
 * including login, registration, session verification, and logout.
 * 
 * @example
 * ```typescript
 * // Backend router implementation
 * export const partnerAuthRouter = router({
 *   login: publicProcedure
 *     .input(z.custom<PartnerAuthRouterTypes['login']['input']>())
 *     .mutation(async ({ input }): Promise<PartnerAuthRouterTypes['login']['output']> => {
 *       // Implementation
 *     }),
 * });
 * ```
 */
export interface PartnerAuthRouterTypes {
  login: {
    input: PartnerLoginInput;
    output: PartnerLoginResponse;
  };
  register: {
    input: PartnerRegistrationInput;
    output: PartnerRegistrationResponse;
  };
  verifySession: {
    input: { sessionToken: string };
    output: PartnerSessionData | null;
  };
  logout: {
    input: { sessionToken: string };
    output: { success: boolean; message: string };
  };
  refreshSession: {
    input: { sessionToken: string };
    output: { sessionToken: string; expiresAt: Date };
  };
}

/**
 * tRPC partner data router types
 * 
 * Type definitions for partner data procedures including
 * dashboard, earnings, analytics, and profile management.
 * 
 * @example
 * ```typescript
 * // Backend router implementation
 * export const partnerDataRouter = router({
 *   getDashboard: partnerProcedure
 *     .input(z.custom<PartnerDataRouterTypes['getDashboard']['input']>())
 *     .query(async ({ ctx }): Promise<PartnerDataRouterTypes['getDashboard']['output']> => {
 *       // Implementation
 *     }),
 * });
 * ```
 */
export interface PartnerDataRouterTypes {
  getDashboard: {
    input: {
      includeNotifications?: boolean;
      notificationLimit?: number;
    };
    output: PartnerDashboardData;
  };
  getMyEarnings: {
    input: { 
      filters?: EarningsFilters;
      includeAnalytics?: boolean;
    };
    output: PartnerEarningsResponse;
  };
  getMyAnalytics: {
    input: { 
      timeRange?: '3M' | '6M' | '1Y' | '2Y' | 'ALL';
      includeComparisons?: boolean;
    };
    output: PartnerAnalyticsData;
  };
  updateProfile: {
    input: UpdatePartnerProfileInput;
    output: { 
      success: boolean; 
      message: string;
      updatedProfile: PartnerData;
    };
  };
  getProfile: {
    input: {};
    output: PartnerData;
  };
}

/**
 * tRPC partnership verification router types
 * 
 * Type definitions for partnership verification procedures
 * including customer-partner verification and earnings lookup.
 * 
 * @example
 * ```typescript
 * // Backend router implementation
 * export const partnershipVerificationRouter = router({
 *   checkPartnerByEmail: publicProcedure
 *     .input(z.custom<PartnershipVerificationRouterTypes['checkPartnerByEmail']['input']>())
 *     .query(async ({ input }): Promise<PartnershipVerificationRouterTypes['checkPartnerByEmail']['output']> => {
 *       // Implementation
 *     }),
 * });
 * ```
 */
export interface PartnershipVerificationRouterTypes {
  checkPartnerByEmail: {
    input: { email: string };
    output: PartnershipVerificationResponse;
  };
  getMyPartnershipEarnings: {
    input: { 
      filters?: EarningsFilters;
      includeAnalytics?: boolean;
    };
    output: CustomerPartnershipEarningsResponse;
  };
  verifyPartnershipAccess: {
    input: { 
      partnershipId: string;
      email: string;
    };
    output: { 
      hasAccess: boolean;
      partnership: any | null;
    };
  };
}

/**
 * tRPC error types
 * 
 * Comprehensive error type definitions for tRPC procedures
 * including error codes, messages, and additional data.
 * 
 * @example
 * ```typescript
 * const error: TRPCError = {
 *   code: 'UNAUTHORIZED',
 *   message: 'Invalid session token',
 *   data: {
 *     httpStatus: 401,
 *     zodError: null,
 *     stack: 'Error stack trace...'
 *   }
 * };
 * ```
 */
export interface TRPCError {
  /** tRPC error code */
  code: 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'METHOD_NOT_SUPPORTED' | 'TIMEOUT' | 'CONFLICT' | 'PRECONDITION_FAILED' | 'PAYLOAD_TOO_LARGE' | 'UNPROCESSABLE_CONTENT' | 'TOO_MANY_REQUESTS' | 'CLIENT_CLOSED_REQUEST' | 'INTERNAL_SERVER_ERROR';
  /** Error message */
  message: string;
  /** Additional error data */
  data?: {
    /** HTTP status code */
    httpStatus: number;
    /** Validation errors */
    zodError?: {
      /** Field path */
      path: (string | number)[];
      /** Error message */
      message: string;
      /** Error code */
      code: string;
    }[];
    /** Stack trace */
    stack?: string;
    /** Additional context */
    context?: Record<string, any>;
  };
}

/**
 * tRPC client hook types for partner authentication
 * 
 * Type definitions for React hooks generated by tRPC client
 * for partner authentication procedures.
 * 
 * @example
 * ```typescript
 * // Frontend hook usage
 * const { mutate: login, isLoading, error } = trpc.partnerAuth.login.useMutation();
 * 
 * const handleLogin = async (credentials: PartnerLoginInput) => {
 *   try {
 *     const result = await login(credentials);
 *     // Handle success
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 * ```
 */
export interface PartnerAuthHooks {
  useLogin: () => {
    mutate: (input: PartnerLoginInput) => Promise<PartnerLoginResponse>;
    mutateAsync: (input: PartnerLoginInput) => Promise<PartnerLoginResponse>;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    reset: () => void;
  };
  useRegister: () => {
    mutate: (input: PartnerRegistrationInput) => Promise<PartnerRegistrationResponse>;
    mutateAsync: (input: PartnerRegistrationInput) => Promise<PartnerRegistrationResponse>;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    reset: () => void;
  };
  useVerifySession: (sessionToken: string, options?: { enabled?: boolean }) => {
    data: PartnerSessionData | null | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useLogout: () => {
    mutate: (input: { sessionToken: string }) => Promise<{ success: boolean; message: string }>;
    mutateAsync: (input: { sessionToken: string }) => Promise<{ success: boolean; message: string }>;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    reset: () => void;
  };
}

/**
 * tRPC client hook types for partner data
 * 
 * Type definitions for React hooks generated by tRPC client
 * for partner data procedures.
 * 
 * @example
 * ```typescript
 * // Frontend hook usage
 * const { data: dashboard, isLoading, error, refetch } = trpc.partnerData.getDashboard.useQuery({
 *   includeNotifications: true,
 *   notificationLimit: 10
 * });
 * ```
 */
export interface PartnerDataHooks {
  useDashboard: (input?: { includeNotifications?: boolean; notificationLimit?: number }, options?: { enabled?: boolean }) => {
    data: PartnerDashboardData | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useEarnings: (input?: { filters?: EarningsFilters; includeAnalytics?: boolean }, options?: { enabled?: boolean }) => {
    data: PartnerEarningsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useAnalytics: (input?: { timeRange?: string; includeComparisons?: boolean }, options?: { enabled?: boolean }) => {
    data: PartnerAnalyticsData | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useUpdateProfile: () => {
    mutate: (input: UpdatePartnerProfileInput) => Promise<{ success: boolean; message: string; updatedProfile: PartnerData }>;
    mutateAsync: (input: UpdatePartnerProfileInput) => Promise<{ success: boolean; message: string; updatedProfile: PartnerData }>;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    reset: () => void;
  };
  useProfile: (options?: { enabled?: boolean }) => {
    data: PartnerData | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
}

/**
 * tRPC client hook types for partnership verification
 * 
 * Type definitions for React hooks generated by tRPC client
 * for partnership verification procedures.
 * 
 * @example
 * ```typescript
 * // Frontend hook usage
 * const { data: verification, isLoading } = trpc.partnershipVerification.checkPartnerByEmail.useQuery({
 *   email: 'customer@example.com'
 * }, {
 *   enabled: !!email
 * });
 * ```
 */
export interface PartnershipVerificationHooks {
  useCheckPartnerByEmail: (input: { email: string }, options?: { enabled?: boolean }) => {
    data: PartnershipVerificationResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useMyPartnershipEarnings: (input?: { filters?: EarningsFilters; includeAnalytics?: boolean }, options?: { enabled?: boolean }) => {
    data: CustomerPartnershipEarningsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
  useVerifyPartnershipAccess: (input: { partnershipId: string; email: string }, options?: { enabled?: boolean }) => {
    data: { hasAccess: boolean; partnership: any | null } | undefined;
    isLoading: boolean;
    isError: boolean;
    error: TRPCError | null;
    refetch: () => void;
    isFetching: boolean;
  };
}

/**
 * Complete tRPC client type definition
 * 
 * Combined type definition for the complete tRPC client
 * including all routers and their procedures.
 * 
 * @example
 * ```typescript
 * // tRPC client usage
 * const trpc: TRPCClient = createTRPCReact<AppRouter>();
 * 
 * // In component
 * const { data, isLoading } = trpc.partnerData.getDashboard.useQuery();
 * ```
 */
export interface TRPCClient {
  partnerAuth: {
    login: {
      useMutation: PartnerAuthHooks['useLogin'];
    };
    register: {
      useMutation: PartnerAuthHooks['useRegister'];
    };
    verifySession: {
      useQuery: PartnerAuthHooks['useVerifySession'];
    };
    logout: {
      useMutation: PartnerAuthHooks['useLogout'];
    };
  };
  partnerData: {
    getDashboard: {
      useQuery: PartnerDataHooks['useDashboard'];
    };
    getMyEarnings: {
      useQuery: PartnerDataHooks['useEarnings'];
    };
    getMyAnalytics: {
      useQuery: PartnerDataHooks['useAnalytics'];
    };
    updateProfile: {
      useMutation: PartnerDataHooks['useUpdateProfile'];
    };
    getProfile: {
      useQuery: PartnerDataHooks['useProfile'];
    };
  };
  partnershipVerification: {
    checkPartnerByEmail: {
      useQuery: PartnershipVerificationHooks['useCheckPartnerByEmail'];
    };
    getMyPartnershipEarnings: {
      useQuery: PartnershipVerificationHooks['useMyPartnershipEarnings'];
    };
    verifyPartnershipAccess: {
      useQuery: PartnershipVerificationHooks['useVerifyPartnershipAccess'];
    };
  };
}

/**
 * tRPC context type
 * 
 * Context type for tRPC procedures including user session,
 * request metadata, and database connections.
 * 
 * @example
 * ```typescript
 * // Backend procedure context
 * const procedure = publicProcedure.use(async ({ ctx, next }) => {
 *   // Access context
 *   const { user, db, req } = ctx;
 *   return next({ ctx });
 * });
 * ```
 */
export interface TRPCContext {
  /** Current user session */
  user?: PartnerData;
  /** Database connection */
  db: any;
  /** HTTP request object */
  req: any;
  /** HTTP response object */
  res: any;
  /** Session token */
  sessionToken?: string;
  /** Request metadata */
  requestId: string;
  /** Client IP address */
  clientIP: string;
  /** User agent */
  userAgent: string;
}