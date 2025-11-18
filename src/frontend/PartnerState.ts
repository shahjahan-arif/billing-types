/**
 * Partner State Management Types
 * 
 * Comprehensive TypeScript types for Redux state management in the partner
 * portal including authentication, dashboard, earnings, and profile states.
 * Provides type safety for state management and loading/error handling.
 * 
 * @fileoverview Partner Redux state type definitions
 * @version 1.0.0
 */

import { PartnerData } from '../models/PartnerAuth';
import { PartnerDashboardData } from '../models/PartnerDashboard';
import { PartnerEarningDetail, PartnerDistribution, EarningsAnalytics } from '../models/PartnerEarnings';
import { PartnerProfile } from '../models/PartnerProfile';
import { EarningsFilters } from '../utils/Filters';

/**
 * Partner authentication state
 * 
 * Complete authentication state including partner data, session information,
 * loading states, and security tracking for login attempts.
 * 
 * @example
 * ```typescript
 * const authState: PartnerAuthState = {
 *   partner: { id: 'p1', email: 'partner@example.com', ... },
 *   isAuthenticated: true,
 *   isLoading: false,
 *   error: null,
 *   session: {
 *     token: 'jwt-token-here',
 *     expiresAt: new Date('2025-11-02T10:00:00Z')
 *   },
 *   loginAttempts: 0,
 *   lastLoginAttempt: null
 * };
 * ```
 */
export interface PartnerAuthState {
  /** Current partner data */
  partner: PartnerData | null;
  /** Authentication status */
  isAuthenticated: boolean;
  /** Loading state for auth operations */
  isLoading: boolean;
  /** Authentication error message */
  error: string | null;
  /** Session information */
  session: {
    /** Session token */
    token: string | null;
    /** Session expiration */
    expiresAt: Date | null;
  };
  /** Number of failed login attempts */
  loginAttempts: number;
  /** Timestamp of last login attempt */
  lastLoginAttempt: Date | null;
}

/**
 * Partner dashboard state
 * 
 * Dashboard state management with granular loading and error states
 * for different dashboard sections and auto-refresh configuration.
 * 
 * @example
 * ```typescript
 * const dashboardState: PartnerDashboardState = {
 *   data: { overview: {...}, recentEarnings: [...], ... },
 *   loading: {
 *     overview: false,
 *     earnings: false,
 *     partnerships: false,
 *     distributions: false,
 *     notifications: false
 *   },
 *   error: {
 *     overview: null,
 *     earnings: null,
 *     partnerships: null,
 *     distributions: null,
 *     notifications: null
 *   },
 *   lastUpdated: new Date(),
 *   refreshInterval: 300000
 * };
 * ```
 */
export interface PartnerDashboardState {
  /** Dashboard data */
  data: PartnerDashboardData | null;
  /** Loading states for different sections */
  loading: {
    /** Overview metrics loading */
    overview: boolean;
    /** Earnings data loading */
    earnings: boolean;
    /** Partnerships data loading */
    partnerships: boolean;
    /** Distributions data loading */
    distributions: boolean;
    /** Notifications loading */
    notifications: boolean;
  };
  /** Error states for different sections */
  error: {
    /** Overview metrics error */
    overview: string | null;
    /** Earnings data error */
    earnings: string | null;
    /** Partnerships data error */
    partnerships: string | null;
    /** Distributions data error */
    distributions: string | null;
    /** Notifications error */
    notifications: string | null;
  };
  /** Last data update timestamp */
  lastUpdated: Date | null;
  /** Auto-refresh interval in milliseconds */
  refreshInterval: number;
}

/**
 * Partner earnings state
 * 
 * Comprehensive earnings state with data, filters, pagination,
 * analytics, and granular loading/error states for different
 * earnings-related operations.
 * 
 * @example
 * ```typescript
 * const earningsState: PartnerEarningsState = {
 *   earnings: [...],
 *   distributions: [...],
 *   analytics: { totalEarnings: 45000, averageMonthlyEarnings: 3750, ... },
 *   filters: { year: 2025, status: ShareStatus.PAID },
 *   pagination: { page: 1, limit: 20, total: 150, totalPages: 8 },
 *   selectedDistribution: null,
 *   loading: { earnings: false, distributions: false, analytics: false },
 *   error: { earnings: null, distributions: null, analytics: null }
 * };
 * ```
 */
export interface PartnerEarningsState {
  /** Earnings data array */
  earnings: PartnerEarningDetail[];
  /** Distributions data array */
  distributions: PartnerDistribution[];
  /** Analytics data */
  analytics: EarningsAnalytics | null;
  /** Current filters applied */
  filters: EarningsFilters;
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
  };
  /** Currently selected distribution */
  selectedDistribution: PartnerDistribution | null;
  /** Loading states */
  loading: {
    /** Earnings data loading */
    earnings: boolean;
    /** Distributions data loading */
    distributions: boolean;
    /** Analytics data loading */
    analytics: boolean;
  };
  /** Error states */
  error: {
    /** Earnings data error */
    earnings: string | null;
    /** Distributions data error */
    distributions: string | null;
    /** Analytics data error */
    analytics: string | null;
  };
}

/**
 * Partner profile state
 * 
 * Profile management state with edit mode, loading states,
 * unsaved changes tracking, and form management.
 * 
 * @example
 * ```typescript
 * const profileState: PartnerProfileState = {
 *   profile: { id: 'p1', firstName: 'John', lastName: 'Doe', ... },
 *   isEditing: false,
 *   loading: { profile: false, update: false },
 *   error: { profile: null, update: null },
 *   unsavedChanges: false,
 *   lastSaved: new Date('2025-11-01T09:30:00Z')
 * };
 * ```
 */
export interface PartnerProfileState {
  /** Partner profile data */
  profile: PartnerProfile | null;
  /** Whether profile is in edit mode */
  isEditing: boolean;
  /** Loading states */
  loading: {
    /** Profile data loading */
    profile: boolean;
    /** Profile update loading */
    update: boolean;
  };
  /** Error states */
  error: {
    /** Profile data error */
    profile: string | null;
    /** Profile update error */
    update: string | null;
  };
  /** Whether there are unsaved changes */
  unsavedChanges: boolean;
  /** Last successful save timestamp */
  lastSaved: Date | null;
}

/**
 * Partner notifications state
 * 
 * Notification management state with unread count tracking,
 * filtering, and real-time update capabilities.
 * 
 * @example
 * ```typescript
 * const notificationsState: PartnerNotificationsState = {
 *   notifications: [...],
 *   unreadCount: 5,
 *   filters: { type: 'DISTRIBUTION_AVAILABLE', isRead: false },
 *   loading: { notifications: false, markAsRead: false },
 *   error: { notifications: null, markAsRead: null },
 *   lastFetched: new Date(),
 *   realTimeEnabled: true
 * };
 * ```
 */
export interface PartnerNotificationsState {
  /** Notifications array */
  notifications: PartnerNotification[];
  /** Count of unread notifications */
  unreadCount: number;
  /** Notification filters */
  filters: {
    /** Filter by notification type */
    type?: PartnerNotificationType;
    /** Filter by read status */
    isRead?: boolean;
    /** Date range filter */
    dateRange?: {
      /** Start date */
      startDate: Date;
      /** End date */
      endDate: Date;
    };
  };
  /** Loading states */
  loading: {
    /** Notifications loading */
    notifications: boolean;
    /** Mark as read operation loading */
    markAsRead: boolean;
  };
  /** Error states */
  error: {
    /** Notifications error */
    notifications: string | null;
    /** Mark as read error */
    markAsRead: string | null;
  };
  /** Last fetch timestamp */
  lastFetched: Date | null;
  /** Whether real-time updates are enabled */
  realTimeEnabled: boolean;
}

/**
 * Partner UI state
 * 
 * UI-specific state management for modals, sidebars, themes,
 * and other interface elements.
 * 
 * @example
 * ```typescript
 * const uiState: PartnerUIState = {
 *   modals: {
 *     profileEdit: false,
 *     distributionDetails: false,
 *     confirmDialog: false
 *   },
 *   sidebar: { isOpen: true, collapsed: false },
 *   theme: 'light',
 *   notifications: { position: 'top-right', autoHide: true, duration: 5000 }
 * };
 * ```
 */
export interface PartnerUIState {
  /** Modal visibility states */
  modals: {
    /** Profile edit modal */
    profileEdit: boolean;
    /** Distribution details modal */
    distributionDetails: boolean;
    /** Confirmation dialog */
    confirmDialog: boolean;
    /** Settings modal */
    settings: boolean;
  };
  /** Sidebar state */
  sidebar: {
    /** Whether sidebar is open */
    isOpen: boolean;
    /** Whether sidebar is collapsed */
    collapsed: boolean;
  };
  /** Current theme */
  theme: 'light' | 'dark' | 'auto';
  /** Notification display settings */
  notifications: {
    /** Notification position */
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Auto-hide notifications */
    autoHide: boolean;
    /** Auto-hide duration in milliseconds */
    duration: number;
  };
}

/**
 * Complete partner application state
 * 
 * Root state interface combining all partner-related state slices
 * for comprehensive type safety across the application.
 * 
 * @example
 * ```typescript
 * const rootState: PartnerRootState = {
 *   auth: { partner: {...}, isAuthenticated: true, ... },
 *   dashboard: { data: {...}, loading: {...}, ... },
 *   earnings: { earnings: [...], analytics: {...}, ... },
 *   profile: { profile: {...}, isEditing: false, ... },
 *   notifications: { notifications: [...], unreadCount: 5, ... },
 *   ui: { modals: {...}, sidebar: {...}, ... }
 * };
 * ```
 */
export interface PartnerRootState {
  /** Authentication state */
  auth: PartnerAuthState;
  /** Dashboard state */
  dashboard: PartnerDashboardState;
  /** Earnings state */
  earnings: PartnerEarningsState;
  /** Profile state */
  profile: PartnerProfileState;
  /** Notifications state */
  notifications: PartnerNotificationsState;
  /** UI state */
  ui: PartnerUIState;
}

// Import PartnerNotification and PartnerNotificationType for completeness
import { PartnerNotification } from '../models/PartnerDashboard';
import { PartnerNotificationType } from '../enums/PartnerEnums';