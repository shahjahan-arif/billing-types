/**
 * Partner Component Props Types
 * 
 * Comprehensive TypeScript types for React component props in the partner
 * portal including dashboard, earnings, analytics, and form components.
 * Provides type safety for component interfaces and event handlers.
 * 
 * @fileoverview Partner React component props type definitions
 * @version 1.0.0
 */

import { PartnerData, UpdatePartnerProfileInput } from '../models/PartnerAuth';
import { PartnerProfile } from '../models/PartnerProfile';
import { PartnerDashboardData, PartnerNotification, PartnershipDashboardSummary } from '../models/PartnerDashboard';
import { PartnerEarningDetail, PartnerDistribution } from '../models/PartnerEarnings';
import { PartnerTrendData } from '../models/PartnerAnalytics';
import { EarningsFilters } from '../utils/Filters';

/**
 * Partner dashboard component props
 * 
 * Main dashboard component props with partner data and refresh capabilities.
 * Supports auto-refresh and manual refresh functionality.
 * 
 * @example
 * ```typescript
 * function PartnerDashboard({ partner, onRefresh, refreshInterval }: PartnerDashboardProps) {
 *   // Dashboard implementation
 * }
 * ```
 */
export interface PartnerDashboardProps {
  /** Partner data for dashboard */
  partner: PartnerData;
  /** Dashboard data */
  dashboardData?: PartnerDashboardData;
  /** Refresh callback function */
  onRefresh?: () => void;
  /** Auto-refresh interval in milliseconds */
  refreshInterval?: number;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
}

/**
 * Partner earnings table component props
 * 
 * Earnings table component with data, loading states, and event handlers
 * for distribution clicks and filter changes.
 * 
 * @example
 * ```typescript
 * function EarningsTable({ 
 *   earnings, 
 *   loading, 
 *   onDistributionClick,
 *   onFilterChange 
 * }: PartnerEarningsTableProps) {
 *   // Table implementation
 * }
 * ```
 */
export interface PartnerEarningsTableProps {
  /** Earnings data to display */
  earnings: PartnerEarningDetail[];
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Distribution click handler */
  onDistributionClick?: (distribution: PartnerDistribution) => void;
  /** Filter change handler */
  onFilterChange?: (filters: EarningsFilters) => void;
  /** Current filters */
  filters?: EarningsFilters;
  /** Pagination info */
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  /** Page change handler */
  onPageChange?: (page: number) => void;
}

/**
 * Partner analytics chart component props
 * 
 * Chart component for displaying analytics data with different chart types
 * and time range selection capabilities.
 * 
 * @example
 * ```typescript
 * function AnalyticsChart({ 
 *   data, 
 *   type, 
 *   timeRange, 
 *   height 
 * }: PartnerAnalyticsChartProps) {
 *   // Chart implementation
 * }
 * ```
 */
export interface PartnerAnalyticsChartProps {
  /** Trend data for chart */
  data: PartnerTrendData;
  /** Chart type */
  type: 'earnings' | 'roi' | 'investment';
  /** Time range for chart */
  timeRange: string;
  /** Chart height in pixels */
  height?: number;
  /** Chart width in pixels */
  width?: number;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Time range change handler */
  onTimeRangeChange?: (timeRange: string) => void;
}

/**
 * Partnership card component props
 * 
 * Card component for displaying partnership summary information
 * with action handlers for detailed views.
 * 
 * @example
 * ```typescript
 * function PartnershipCard({ 
 *   partnership, 
 *   showDetails, 
 *   onViewDetails,
 *   onViewEarnings 
 * }: PartnershipCardProps) {
 *   // Card implementation
 * }
 * ```
 */
export interface PartnershipCardProps {
  /** Partnership data to display */
  partnership: PartnershipDashboardSummary;
  /** Whether to show detailed information */
  showDetails?: boolean;
  /** View details callback */
  onViewDetails?: (partnershipId: string) => void;
  /** View earnings callback */
  onViewEarnings?: (partnershipId: string) => void;
  /** Loading state */
  loading?: boolean;
  /** Card size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Partner profile form component props
 * 
 * Form component for editing partner profile with save/cancel handlers
 * and loading state management.
 * 
 * @example
 * ```typescript
 * function ProfileForm({ 
 *   profile, 
 *   onSave, 
 *   onCancel, 
 *   isLoading 
 * }: PartnerProfileFormProps) {
 *   // Form implementation
 * }
 * ```
 */
export interface PartnerProfileFormProps {
  /** Current profile data */
  profile: PartnerProfile;
  /** Save handler with updates */
  onSave: (updates: UpdatePartnerProfileInput) => Promise<void>;
  /** Cancel handler */
  onCancel: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Whether form has unsaved changes */
  hasUnsavedChanges?: boolean;
}

/**
 * Partner notification list component props
 * 
 * Notification list component with read/unread management and
 * display configuration options.
 * 
 * @example
 * ```typescript
 * function NotificationList({ 
 *   notifications, 
 *   onMarkAsRead, 
 *   onMarkAllAsRead,
 *   maxItems 
 * }: PartnerNotificationListProps) {
 *   // Notification list implementation
 * }
 * ```
 */
export interface PartnerNotificationListProps {
  /** Notifications to display */
  notifications: PartnerNotification[];
  /** Mark as read handler */
  onMarkAsRead?: (notificationId: string) => void;
  /** Mark all as read handler */
  onMarkAllAsRead?: () => void;
  /** Maximum items to display */
  maxItems?: number;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Show read notifications */
  showRead?: boolean;
}

/**
 * Partner modal component props
 * 
 * Generic modal component props with size variants and
 * close handling capabilities.
 * 
 * @example
 * ```typescript
 * function PartnerModal({ 
 *   isOpen, 
 *   onClose, 
 *   title, 
 *   children, 
 *   size 
 * }: PartnerModalProps) {
 *   // Modal implementation
 * }
 * ```
 */
export interface PartnerModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: any;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether modal can be closed by clicking outside */
  closeOnOverlayClick?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
}

/**
 * Confirmation dialog props
 * 
 * Confirmation dialog component for destructive or important actions
 * with customizable buttons and variants.
 * 
 * @example
 * ```typescript
 * function ConfirmDialog({ 
 *   isOpen, 
 *   title, 
 *   message, 
 *   onConfirm, 
 *   onCancel,
 *   variant 
 * }: PartnerConfirmDialogProps) {
 *   // Dialog implementation
 * }
 * ```
 */
export interface PartnerConfirmDialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Dialog title */
  title: string;
  /** Dialog message */
  message: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm handler */
  onConfirm: () => void;
  /** Cancel handler */
  onCancel: () => void;
  /** Danger variant for destructive actions */
  variant?: 'default' | 'danger';
  /** Loading state for confirm action */
  loading?: boolean;
}

/**
 * Loading state component props
 * 
 * Loading indicator component with customizable size and overlay options.
 * 
 * @example
 * ```typescript
 * function LoadingSpinner({ 
 *   message, 
 *   size, 
 *   overlay 
 * }: PartnerLoadingProps) {
 *   // Loading implementation
 * }
 * ```
 */
export interface PartnerLoadingProps {
  /** Loading message */
  message?: string;
  /** Loading spinner size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show full screen overlay */
  overlay?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Error state component props
 * 
 * Error display component with retry functionality and
 * recovery options.
 * 
 * @example
 * ```typescript
 * function ErrorDisplay({ 
 *   message, 
 *   onRetry, 
 *   recoverable 
 * }: PartnerErrorProps) {
 *   // Error implementation
 * }
 * ```
 */
export interface PartnerErrorProps {
  /** Error message */
  message: string;
  /** Retry handler */
  onRetry?: () => void;
  /** Whether error is recoverable */
  recoverable?: boolean;
  /** Custom className */
  className?: string;
  /** Error title */
  title?: string;
}

/**
 * Partner search component props
 * 
 * Search component for filtering partner data with
 * debounced input and suggestion support.
 * 
 * @example
 * ```typescript
 * function PartnerSearch({ 
 *   onSearch, 
 *   placeholder, 
 *   suggestions 
 * }: PartnerSearchProps) {
 *   // Search implementation
 * }
 * ```
 */
export interface PartnerSearchProps {
  /** Search handler */
  onSearch: (query: string) => void;
  /** Input placeholder */
  placeholder?: string;
  /** Search suggestions */
  suggestions?: string[];
  /** Loading state */
  loading?: boolean;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Initial search value */
  initialValue?: string;
}

/**
 * Partner filter component props
 * 
 * Filter component for earnings and other data with
 * multiple filter options and reset functionality.
 * 
 * @example
 * ```typescript
 * function PartnerFilters({ 
 *   filters, 
 *   onFiltersChange, 
 *   onReset 
 * }: PartnerFiltersProps) {
 *   // Filters implementation
 * }
 * ```
 */
export interface PartnerFiltersProps {
  /** Current filters */
  filters: EarningsFilters;
  /** Filter change handler */
  onFiltersChange: (filters: EarningsFilters) => void;
  /** Reset filters handler */
  onReset: () => void;
  /** Available filter options */
  options?: {
    /** Available years */
    years?: number[];
    /** Available partnerships */
    partnerships?: PartnershipDashboardSummary[];
  };
}

/**
 * Partner pagination component props
 * 
 * Pagination component with page navigation and
 * items per page selection.
 * 
 * @example
 * ```typescript
 * function PartnerPagination({ 
 *   currentPage, 
 *   totalPages, 
 *   onPageChange,
 *   itemsPerPage,
 *   onItemsPerPageChange 
 * }: PartnerPaginationProps) {
 *   // Pagination implementation
 * }
 * ```
 */
export interface PartnerPaginationProps {
  /** Current page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Items per page */
  itemsPerPage: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Items per page change handler */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Available items per page options */
  itemsPerPageOptions?: number[];
  /** Show items per page selector */
  showItemsPerPageSelector?: boolean;
}