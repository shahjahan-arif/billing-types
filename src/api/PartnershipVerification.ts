/**
 * Partnership Verification API Types
 * 
 * Comprehensive TypeScript types for customer-partner verification APIs,
 * partnership lookup, validation, and customer partnership earnings integration.
 * Provides type safety for customer-partner relationship verification.
 * 
 * @fileoverview Partnership verification API type definitions
 * @version 1.0.0
 */

import { Partnership } from '../models/Partnership';
import { PartnerEarningsResponse } from '../models/PartnerEarnings';
import { EarningsFilters } from '../utils/Filters';

/**
 * Request to verify if customer email matches any partnership
 * 
 * Used to check if a customer email corresponds to an existing partner
 * in the system, enabling customer-partner integration features.
 * 
 * @example
 * ```typescript
 * const request: PartnershipVerificationRequest = {
 *   email: 'customer@example.com'
 * };
 * ```
 */
export interface PartnershipVerificationRequest {
  /** Customer email to verify */
  email: string;
}

/**
 * Response from partnership verification
 * 
 * Contains verification results including partnership data if found
 * and support for multiple partnerships per customer email.
 * 
 * @example
 * ```typescript
 * const response: PartnershipVerificationResponse = {
 *   isPartner: true,
 *   partnership: {
 *     id: 'ps1',
 *     companyId: 'c1',
 *     partnerId: 'p1',
 *     ownershipPercentage: 15.5,
 *     role: PartnerRole.PARTNER,
 *     investmentAmount: 10000.00,
 *     joinDate: new Date('2024-01-15'),
 *     isActive: true,
 *     createdAt: new Date(),
 *     updatedAt: new Date()
 *   },
 *   customerPartnerships: [...]
 * };
 * ```
 */
export interface PartnershipVerificationResponse {
  /** Whether email belongs to a partner */
  isPartner: boolean;
  /** Primary partnership data if found */
  partnership: Partnership | null;
  /** All customer partnerships if multiple exist */
  customerPartnerships?: Partnership[];
  /** Additional verification metadata */
  metadata?: {
    /** Total number of partnerships found */
    totalPartnerships: number;
    /** Active partnerships count */
    activePartnerships: number;
    /** Verification timestamp */
    verifiedAt: Date;
  };
}

/**
 * Request for customer partnership earnings
 * 
 * Request structure for retrieving earnings data for a customer
 * who is also a partner, with optional filtering capabilities.
 * 
 * @example
 * ```typescript
 * const request: CustomerPartnershipEarningsRequest = {
 *   filters: {
 *     year: 2025,
 *     status: ShareStatus.PAID,
 *     partnershipId: 'ps1'
 *   }
 * };
 * ```
 */
export interface CustomerPartnershipEarningsRequest {
  /** Optional filters for earnings data */
  filters?: EarningsFilters;
  /** Specific partnership ID to filter by */
  partnershipId?: string;
  /** Include detailed distribution information */
  includeDistributions?: boolean;
  /** Include analytics summary */
  includeAnalytics?: boolean;
}

/**
 * Response with customer partnership earnings
 * 
 * Extended earnings response that includes customer information
 * and verification status for customer-partner integration.
 * 
 * @example
 * ```typescript
 * const response: CustomerPartnershipEarningsResponse = {
 *   partner: { id: 'p1', email: 'customer@example.com', name: 'John Doe' },
 *   partnerships: 2,
 *   totalEarnings: 15000.00,
 *   earnings: [...],
 *   distributions: [...],
 *   customerInfo: {
 *     id: 'c1',
 *     email: 'customer@example.com',
 *     name: 'John Doe',
 *     isVerifiedPartner: true,
 *     customerSince: new Date('2023-06-01'),
 *     partnerSince: new Date('2024-01-15')
 *   }
 * };
 * ```
 */
export interface CustomerPartnershipEarningsResponse extends PartnerEarningsResponse {
  /** Customer information */
  customerInfo: {
    /** Customer unique identifier */
    id: string;
    /** Customer email */
    email: string;
    /** Customer full name */
    name: string;
    /** Whether customer is verified partner */
    isVerifiedPartner: boolean;
    /** Date customer joined as customer */
    customerSince?: Date;
    /** Date customer became partner */
    partnerSince?: Date;
    /** Customer account status */
    customerStatus?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  };
}

/**
 * Partnership lookup request
 * 
 * Request for looking up partnerships by various criteria
 * including company, partner, or relationship parameters.
 * 
 * @example
 * ```typescript
 * const request: PartnershipLookupRequest = {
 *   companyId: 'c1',
 *   includeInactive: false,
 *   sortBy: 'joinDate',
 *   sortOrder: 'desc'
 * };
 * ```
 */
export interface PartnershipLookupRequest {
  /** Company ID to filter partnerships */
  companyId?: string;
  /** Partner ID to filter partnerships */
  partnerId?: string;
  /** Partner email to filter partnerships */
  partnerEmail?: string;
  /** Include inactive partnerships */
  includeInactive?: boolean;
  /** Sort field */
  sortBy?: 'joinDate' | 'ownershipPercentage' | 'investmentAmount';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Pagination page number */
  page?: number;
  /** Items per page limit */
  limit?: number;
}

/**
 * Partnership lookup response
 * 
 * Response containing found partnerships with pagination
 * and summary information for lookup operations.
 * 
 * @example
 * ```typescript
 * const response: PartnershipLookupResponse = {
 *   partnerships: [...],
 *   total: 25,
 *   page: 1,
 *   limit: 10,
 *   totalPages: 3,
 *   summary: {
 *     totalPartnerships: 25,
 *     activePartnerships: 22,
 *     totalInvestment: 250000.00,
 *     averageOwnership: 12.5
 *   }
 * };
 * ```
 */
export interface PartnershipLookupResponse {
  /** Found partnerships */
  partnerships: Partnership[];
  /** Total partnerships found */
  total: number;
  /** Current page number */
  page: number;
  /** Items per page */
  limit: number;
  /** Total pages available */
  totalPages: number;
  /** Summary statistics */
  summary: {
    /** Total partnerships count */
    totalPartnerships: number;
    /** Active partnerships count */
    activePartnerships: number;
    /** Total investment amount */
    totalInvestment: number;
    /** Average ownership percentage */
    averageOwnership: number;
  };
}

/**
 * Partnership validation request
 * 
 * Request for validating partnership data and relationships
 * including ownership percentages and investment amounts.
 * 
 * @example
 * ```typescript
 * const request: PartnershipValidationRequest = {
 *   companyId: 'c1',
 *   partnerships: [
 *     { partnerId: 'p1', ownershipPercentage: 25.0, investmentAmount: 15000.00 },
 *     { partnerId: 'p2', ownershipPercentage: 15.0, investmentAmount: 8000.00 }
 *   ],
 *   validateOwnership: true,
 *   validateInvestment: true
 * };
 * ```
 */
export interface PartnershipValidationRequest {
  /** Company ID for validation context */
  companyId: string;
  /** Partnerships to validate */
  partnerships: {
    /** Partner ID */
    partnerId: string;
    /** Ownership percentage */
    ownershipPercentage: number;
    /** Investment amount */
    investmentAmount?: number;
  }[];
  /** Whether to validate total ownership doesn't exceed 100% */
  validateOwnership?: boolean;
  /** Whether to validate investment amounts */
  validateInvestment?: boolean;
  /** Whether to check for duplicate partners */
  checkDuplicates?: boolean;
}

/**
 * Partnership validation response
 * 
 * Response containing validation results with detailed
 * error information for each validation rule.
 * 
 * @example
 * ```typescript
 * const response: PartnershipValidationResponse = {
 *   isValid: false,
 *   errors: [
 *     {
 *       type: 'OWNERSHIP_EXCEEDED',
 *       message: 'Total ownership percentage exceeds 100%',
 *       details: { totalOwnership: 105.5, maxAllowed: 100.0 }
 *     }
 *   ],
 *   warnings: [
 *     {
 *       type: 'HIGH_OWNERSHIP',
 *       message: 'Partner p1 has high ownership percentage',
 *       details: { partnerId: 'p1', ownershipPercentage: 45.0 }
 *     }
 *   ],
 *   summary: {
 *     totalOwnership: 105.5,
 *     totalInvestment: 23000.00,
 *     partnerCount: 2
 *   }
 * };
 * ```
 */
export interface PartnershipValidationResponse {
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors */
  errors: {
    /** Error type */
    type: 'OWNERSHIP_EXCEEDED' | 'DUPLICATE_PARTNER' | 'INVALID_INVESTMENT' | 'MISSING_DATA';
    /** Error message */
    message: string;
    /** Additional error details */
    details?: Record<string, any>;
  }[];
  /** Validation warnings */
  warnings: {
    /** Warning type */
    type: 'HIGH_OWNERSHIP' | 'LOW_INVESTMENT' | 'INACTIVE_PARTNER';
    /** Warning message */
    message: string;
    /** Additional warning details */
    details?: Record<string, any>;
  }[];
  /** Validation summary */
  summary: {
    /** Total ownership percentage */
    totalOwnership: number;
    /** Total investment amount */
    totalInvestment: number;
    /** Number of partners */
    partnerCount: number;
  };
}