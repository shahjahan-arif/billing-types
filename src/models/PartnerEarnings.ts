/**
 * Partner Earnings Types
 * 
 * Comprehensive TypeScript types for partner earnings data, distribution information,
 * and aggregated earnings calculations. Provides type safety for complex earnings
 * data structures across all packages.
 * 
 * @fileoverview Partner earnings and distribution type definitions
 * @version 1.0.0
 */

import { ShareStatus, DistributionStatus } from '../enums/PartnershipRole';
import { PaginationResponse } from '../utils/Pagination';

/**
 * Complete partner earnings response
 * 
 * Contains all earnings data for a partner including detailed breakdown,
 * distribution history, and pagination information for large datasets.
 * 
 * @example
 * ```typescript
 * const earnings: PartnerEarningsResponse = {
 *   partner: { id: 'p1', email: 'partner@example.com', name: 'John Doe' },
 *   partnerships: 3,
 *   totalEarnings: 15000.00,
 *   earnings: [...],
 *   distributions: [...]
 * };
 * ```
 */
export interface PartnerEarningsResponse {
  /** Partner identification information */
  partner: {
    /** Partner unique identifier */
    id: string;
    /** Partner email address */
    email: string;
    /** Partner full name */
    name: string;
  };
  /** Number of partnerships */
  partnerships: number;
  /** Total earnings across all partnerships */
  totalEarnings: number;
  /** Detailed earnings breakdown */
  earnings: PartnerEarningDetail[];
  /** Distribution history */
  distributions: PartnerDistribution[];
  /** Pagination information if applicable */
  pagination?: PaginationResponse<PartnerEarningDetail>;
}

/**
 * Individual partner earning detail
 * 
 * Represents a single earning entry for a partner from a specific partnership
 * distribution. Contains all necessary information for tracking and reporting.
 * 
 * @example
 * ```typescript
 * const earning: PartnerEarningDetail = {
 *   partnershipId: 'ps1',
 *   companyName: 'TechCorp ISP',
 *   distributionId: 'd1',
 *   month: '2025-10',
 *   shareAmount: 2500.00,
 *   percentage: 15.5,
 *   status: ShareStatus.PAID,
 *   paidAt: new Date('2025-11-01')
 * };
 * ```
 */
export interface PartnerEarningDetail {
  /** Partnership unique identifier */
  partnershipId: string;
  /** Company name for this earning */
  companyName: string;
  /** Distribution unique identifier */
  distributionId: string;
  /** Month of earning (YYYY-MM format) */
  month: string;
  /** Partner's share amount */
  shareAmount: number;
  /** Partner's percentage of distribution */
  percentage: number;
  /** Status of the share */
  status: ShareStatus;
  /** Date when share was paid */
  paidAt?: Date;
}

/**
 * Partner distribution information
 * 
 * Contains complete information about a profit distribution from a company
 * to partners, including financial details and distribution status.
 * 
 * @example
 * ```typescript
 * const distribution: PartnerDistribution = {
 *   id: 'd1',
 *   partnershipId: 'ps1',
 *   companyName: 'TechCorp ISP',
 *   month: '2025-10',
 *   totalRevenue: 50000.00,
 *   totalExpenses: 35000.00,
 *   netProfit: 15000.00,
 *   distributionDate: new Date('2025-11-01'),
 *   status: DistributionStatus.COMPLETED
 * };
 * ```
 */
export interface PartnerDistribution {
  /** Distribution unique identifier */
  id: string;
  /** Partnership unique identifier */
  partnershipId: string;
  /** Company name */
  companyName: string;
  /** Distribution month (YYYY-MM format) */
  month: string;
  /** Total company revenue for the month */
  totalRevenue: number;
  /** Total company expenses for the month */
  totalExpenses: number;
  /** Net profit distributed */
  netProfit: number;
  /** Date of distribution */
  distributionDate: Date;
  /** Distribution status */
  status: DistributionStatus;
}

/**
 * Aggregated earnings across partnerships
 * 
 * Consolidates earnings data from multiple partnerships into a single
 * structure for comprehensive analysis and reporting.
 * 
 * @example
 * ```typescript
 * const aggregated: AggregatedEarnings = {
 *   total: 45000.00,
 *   details: [...], // All earning details
 *   distributions: [...] // All distributions
 * };
 * ```
 */
export interface AggregatedEarnings {
  /** Total earnings amount */
  total: number;
  /** Detailed earnings breakdown */
  details: PartnerEarningDetail[];
  /** Distribution history */
  distributions: PartnerDistribution[];
}

/**
 * Earnings analytics summary
 * 
 * Provides calculated analytics and insights about partner earnings
 * including performance metrics, growth rates, and trend analysis.
 * 
 * @example
 * ```typescript
 * const analytics: EarningsAnalytics = {
 *   totalEarnings: 45000.00,
 *   averageMonthlyEarnings: 3750.00,
 *   bestMonth: { month: '2025-08', amount: 5200.00 },
 *   worstMonth: { month: '2025-02', amount: 1800.00 },
 *   growthRate: 12.5,
 *   yearOverYearGrowth: 18.3
 * };
 * ```
 */
export interface EarningsAnalytics {
  /** Total earnings to date */
  totalEarnings: number;
  /** Average monthly earnings */
  averageMonthlyEarnings: number;
  /** Best performing month */
  bestMonth: {
    /** Month identifier (YYYY-MM) */
    month: string;
    /** Earnings amount for that month */
    amount: number;
  };
  /** Worst performing month */
  worstMonth: {
    /** Month identifier (YYYY-MM) */
    month: string;
    /** Earnings amount for that month */
    amount: number;
  };
  /** Monthly growth rate percentage */
  growthRate: number;
  /** Year-over-year growth percentage */
  yearOverYearGrowth: number;
}

