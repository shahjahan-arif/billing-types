import { PartnerFilters } from './Filters';

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Partner-specific paginated response
 */
export interface PartnerPaginatedResponse<T> extends PaginationResponse<T> {
  /** Additional partner metadata */
  metadata?: {
    /** Total partners count */
    totalPartners?: number;
    /** Active partners count */
    activePartners?: number;
    /** Filter summary */
    appliedFilters?: PartnerFilters;
  };
}

export function createPaginationResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResponse<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
