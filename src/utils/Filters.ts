import { PartnerStatus } from '../enums/PartnerEnums';
import { ShareStatus } from '../enums/PartnershipRole';
import { PaginationQuery } from './Pagination';

/**
 * Date range filter for partner queries
 */
export interface DateRangeFilter {
  /** Start date of range */
  startDate: Date;
  /** End date of range */
  endDate: Date;
}

/**
 * Partner-specific filters
 */
export interface PartnerFilters {
  /** Search term for partner name/email */
  search?: string;
  /** Partner status filter */
  status?: PartnerStatus | 'ALL';
  /** Date range filter */
  dateRange?: DateRangeFilter;
  /** Sort field */
  sortBy?: 'name' | 'earnings' | 'roi' | 'joinDate';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Earnings-specific filters with pagination
 */
export interface EarningsFilters extends PaginationQuery {
  /** Filter by month (YYYY-MM format) */
  month?: string;
  /** Filter by year */
  year?: number;
  /** Filter by specific partnership */
  partnershipId?: string;
  /** Filter by share status */
  status?: ShareStatus;
  /** Minimum amount filter */
  minAmount?: number;
  /** Maximum amount filter */
  maxAmount?: number;
  /** Date range filter */
  dateRange?: DateRangeFilter;
}

/**
 * Analytics-specific filters
 */
export interface AnalyticsFilters {
  /** Time range for analytics */
  timeRange?: '3M' | '6M' | '1Y' | '2Y' | 'ALL';
  /** Include projections in analytics */
  includeProjections?: boolean;
  /** Compare with previous period */
  compareWithPrevious?: boolean;
  /** Group data by period */
  groupBy?: 'month' | 'quarter' | 'year';
}