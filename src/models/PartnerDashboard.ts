/**
 * Partner Dashboard Types
 * 
 * Comprehensive TypeScript types for partner dashboard data, overview metrics,
 * notifications, and quick actions. Provides type safety for dashboard
 * components and real-time data updates.
 * 
 * @fileoverview Partner dashboard data structure type definitions
 * @version 1.0.0
 */

import { PartnerEarningDetail, PartnerDistribution } from './PartnerEarnings';
import { PartnerNotificationType } from '../enums/PartnerEnums';

/**
 * Partnership summary for dashboard display
 * 
 * Condensed partnership information for dashboard overview
 * without full partnership details.
 * 
 * @example
 * ```typescript
 * const summary: PartnershipDashboardSummary = {
 *   id: 'ps1',
 *   companyName: 'TechCorp ISP',
 *   investmentAmount: 10000.00,
 *   ownershipPercentage: 15.5,
 *   totalEarnings: 8500.00,
 *   monthlyAverage: 750.00,
 *   roi: 18.2,
 *   status: 'ACTIVE',
 *   joinDate: new Date('2024-01-15')
 * };
 * ```
 */
export interface PartnershipDashboardSummary {
  /** Partnership unique identifier */
  id: string;
  /** Company name */
  companyName: string;
  /** Partner's investment amount */
  investmentAmount: number;
  /** Partner's ownership percentage */
  ownershipPercentage: number;
  /** Total earnings from this partnership */
  totalEarnings: number;
  /** Average monthly earnings */
  monthlyAverage: number;
  /** Return on investment percentage */
  roi: number;
  /** Partnership status */
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  /** Date partner joined this partnership */
  joinDate: Date;
}

/**
 * Complete partner dashboard data
 * 
 * Comprehensive dashboard structure containing all data needed
 * for partner dashboard display including metrics, earnings,
 * partnerships, and notifications.
 * 
 * @example
 * ```typescript
 * const dashboard: PartnerDashboardData = {
 *   overview: {
 *     totalEarnings: 45000.00,
 *     totalInvestment: 25000.00,
 *     activePartnerships: 3,
 *     averageROI: 18.5,
 *     thisMonthEarnings: 3800.00,
 *     lastMonthEarnings: 3500.00,
 *     earningsGrowth: 8.6,
 *     pendingDistributions: 2
 *   },
 *   recentEarnings: [...],
 *   partnerships: [...],
 *   recentDistributions: [...],
 *   notifications: [...],
 *   quickActions: [...]
 * };
 * ```
 */
export interface PartnerDashboardData {
  /** Overview metrics for dashboard header */
  overview: PartnerDashboardOverview;
  /** Recent earnings for quick view */
  recentEarnings: PartnerEarningDetail[];
  /** Partner's partnerships summary */
  partnerships: PartnershipDashboardSummary[];
  /** Recent distributions */
  recentDistributions: PartnerDistribution[];
  /** Partner notifications */
  notifications: PartnerNotification[];
  /** Quick action buttons */
  quickActions: PartnerQuickAction[];
}

/**
 * Dashboard overview metrics
 * 
 * High-level summary metrics displayed in dashboard header
 * providing key performance indicators at a glance.
 * 
 * @example
 * ```typescript
 * const overview: PartnerDashboardOverview = {
 *   totalEarnings: 45000.00,
 *   totalInvestment: 25000.00,
 *   activePartnerships: 3,
 *   averageROI: 18.5,
 *   thisMonthEarnings: 3800.00,
 *   lastMonthEarnings: 3500.00,
 *   earningsGrowth: 8.6,
 *   pendingDistributions: 2
 * };
 * ```
 */
export interface PartnerDashboardOverview {
  /** Total earnings across all partnerships */
  totalEarnings: number;
  /** Total investment amount */
  totalInvestment: number;
  /** Number of active partnerships */
  activePartnerships: number;
  /** Average ROI percentage */
  averageROI: number;
  /** Current month earnings */
  thisMonthEarnings: number;
  /** Previous month earnings */
  lastMonthEarnings: number;
  /** Earnings growth percentage */
  earningsGrowth: number;
  /** Number of pending distributions */
  pendingDistributions: number;
}

/**
 * Partner notification for dashboard
 * 
 * Notification structure for dashboard display with type,
 * read status, and metadata for enhanced functionality.
 * 
 * @example
 * ```typescript
 * const notification: PartnerNotification = {
 *   id: 'n1',
 *   type: PartnerNotificationType.DISTRIBUTION_AVAILABLE,
 *   title: 'New Distribution Available',
 *   message: 'Your October distribution of $2,500 is ready for review.',
 *   isRead: false,
 *   createdAt: new Date('2025-11-01T10:00:00Z'),
 *   metadata: {
 *     distributionId: 'd123',
 *     amount: 2500.00,
 *     companyName: 'TechCorp ISP'
 *   }
 * };
 * ```
 */
export interface PartnerNotification {
  /** Notification unique identifier */
  id: string;
  /** Type of notification */
  type: PartnerNotificationType;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Whether notification has been read */
  isRead: boolean;
  /** Notification creation timestamp */
  createdAt: Date;
  /** Additional notification metadata */
  metadata?: Record<string, any>;
}

/**
 * Quick action button for dashboard
 * 
 * Action button configuration for dashboard quick actions
 * providing shortcuts to common partner tasks.
 * 
 * @example
 * ```typescript
 * const action: PartnerQuickAction = {
 *   id: 'view-earnings',
 *   title: 'View Earnings',
 *   description: 'View detailed earnings and distributions',
 *   icon: 'chart-bar',
 *   href: '/partner/earnings',
 *   enabled: true
 * };
 * ```
 */
export interface PartnerQuickAction {
  /** Action unique identifier */
  id: string;
  /** Action title */
  title: string;
  /** Action description */
  description: string;
  /** Icon name or component */
  icon: string;
  /** Navigation href or action handler */
  href: string;
  /** Whether action is currently enabled */
  enabled: boolean;
}

/**
 * Dashboard widget configuration
 * 
 * Configuration for dashboard widgets including layout,
 * data source, and display preferences.
 * 
 * @example
 * ```typescript
 * const widget: PartnerDashboardWidget = {
 *   id: 'earnings-chart',
 *   type: 'chart',
 *   title: 'Earnings Trend',
 *   position: { x: 0, y: 0, width: 6, height: 4 },
 *   config: {
 *     chartType: 'line',
 *     timeRange: '6M',
 *     showComparison: true
 *   },
 *   isVisible: true,
 *   isResizable: true
 * };
 * ```
 */
export interface PartnerDashboardWidget {
  /** Widget unique identifier */
  id: string;
  /** Widget type */
  type: 'chart' | 'table' | 'metric' | 'notification' | 'action';
  /** Widget title */
  title: string;
  /** Widget position and size */
  position: {
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
    /** Width in grid units */
    width: number;
    /** Height in grid units */
    height: number;
  };
  /** Widget-specific configuration */
  config: Record<string, any>;
  /** Whether widget is visible */
  isVisible: boolean;
  /** Whether widget can be resized */
  isResizable: boolean;
}

/**
 * Dashboard layout configuration
 * 
 * Complete dashboard layout with widgets, preferences,
 * and customization settings.
 * 
 * @example
 * ```typescript
 * const layout: PartnerDashboardLayout = {
 *   widgets: [...],
 *   gridSize: { columns: 12, rows: 8 },
 *   theme: 'light',
 *   autoRefresh: true,
 *   refreshInterval: 300000 // 5 minutes
 * };
 * ```
 */
export interface PartnerDashboardLayout {
  /** Dashboard widgets */
  widgets: PartnerDashboardWidget[];
  /** Grid configuration */
  gridSize: {
    /** Number of columns */
    columns: number;
    /** Number of rows */
    rows: number;
  };
  /** Dashboard theme */
  theme: 'light' | 'dark' | 'auto';
  /** Whether to auto-refresh data */
  autoRefresh: boolean;
  /** Refresh interval in milliseconds */
  refreshInterval: number;
}