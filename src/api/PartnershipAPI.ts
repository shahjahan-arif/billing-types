/**
 * Partnership API Response Types
 */

import { 
  Partnership, 
  ProfitDistribution, 
  PartnerShare, 
  PartnershipSummary,
  MonthlyProfitCalculation,
  PartnershipWithRelations,
  PartnerShareWithRelations,
  PaginatedResult
} from '../models/Partnership';
import { ApiResponse, PaginatedResponse } from '../utils/ApiResponse';

// Partnership management responses
export type PartnershipResponse = ApiResponse<Partnership>;
export type PartnershipsResponse = ApiResponse<Partnership[]>;
export type PartnershipWithRelationsResponse = ApiResponse<PartnershipWithRelations>;
export type PartnershipSummaryResponse = ApiResponse<PartnershipSummary>;

// Profit distribution responses
export type ProfitDistributionResponse = ApiResponse<ProfitDistribution>;
export type ProfitDistributionsResponse = PaginatedResponse<ProfitDistribution>;
export type MonthlyProfitCalculationResponse = ApiResponse<MonthlyProfitCalculation>;

// Partner share responses
export type PartnerShareResponse = ApiResponse<PartnerShare>;
export type PartnerSharesResponse = PaginatedResponse<PartnerShare>;
export type PartnerShareWithRelationsResponse = ApiResponse<PartnerShareWithRelations>;

// Enhanced partner share summary
export interface PartnerShareSummary {
  partnerId: string;
  partnerName: string;
  partnerEmail: string;
  totalShares: number;            // Total number of distributions received
  totalAmount: number;            // Total amount received
  pendingAmount: number;          // Amount pending payment
  paidAmount: number;             // Amount already paid
  averageMonthlyShare: number;    // Average monthly share
  lastPaymentDate: Date | null;
  ownershipPercentage: number;    // Current ownership percentage
  role: string;                   // Partner role
  joinDate: Date;
  shares: PartnerShare[];
}

export type PartnerShareSummaryResponse = ApiResponse<PartnerShareSummary>;

// Distribution actions responses
export type DistributeProfitResponse = ApiResponse<{
  distributionId: string;
  partnerShares: PartnerShare[];
  totalAmount: number;
  partnerCount: number;
  distributionDate: Date;
}>;

export type CalculateMonthlyProfitResponse = ApiResponse<{
  distribution: ProfitDistribution;
  calculation: MonthlyProfitCalculation;
  partnerShares: PartnerShare[];
}>;

// Partnership validation responses
export interface PartnershipValidation {
  isValid: boolean;
  totalOwnership: number;
  message?: string;
  missingPercentage?: number;
  excessPercentage?: number;
  issues: string[];
}

export type PartnershipValidationResponse = ApiResponse<PartnershipValidation>;

// Bulk partnership operations
export type BulkPartnershipUpdateResponse = ApiResponse<{
  successful: number;
  failed: number;
  errors: Array<{
    partnerId: string;
    error: string;
  }>;
}>;

// Partnership statistics
export interface PartnershipStatistics {
  totalPartnerships: number;
  activePartnerships: number;
  totalInvestment: number;
  averageOwnership: number;
  monthlyProfitTrend: Array<{
    month: string;
    totalProfit: number;
    averageShareAmount: number;
  }>;
  topPerformingPartners: Array<{
    partnerId: string;
    partnerName: string;
    totalEarnings: number;
    ownershipPercentage: number;
  }>;
}

export type PartnershipStatisticsResponse = ApiResponse<PartnershipStatistics>;

// Profit analysis responses
export interface ProfitAnalysis {
  period: {
    startMonth: string;
    endMonth: string;
  };
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  averageMonthlyProfit: number;
  profitGrowthRate: number;
  equipmentCostRatio: number;     // Equipment costs as % of total expenses
  operationalCostRatio: number;   // Operational costs as % of total expenses
  profitMargin: number;           // Profit as % of revenue
  monthlyBreakdown: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
    margin: number;
  }>;
}

export type ProfitAnalysisResponse = ApiResponse<ProfitAnalysis>;

// Partner performance report
export interface PartnerPerformanceReport {
  reportDate: Date;
  companyId: string;
  totalPartners: number;
  performanceMetrics: {
    totalDistributed: number;
    averageShareAmount: number;
    highestEarner: {
      partnerId: string;
      partnerName: string;
      amount: number;
    };
    mostConsistentEarner: {
      partnerId: string;
      partnerName: string;
      consistency: number; // Percentage
    };
  };
  partnerBreakdown: Array<{
    partnerId: string;
    partnerName: string;
    ownershipPercentage: number;
    totalEarnings: number;
    averageMonthlyEarnings: number;
    paymentsReceived: number;
    pendingPayments: number;
    lastPaymentDate: Date | null;
  }>;
}

export type PartnerPerformanceReportResponse = ApiResponse<PartnerPerformanceReport>;

// Error response types specific to partnership operations
export interface PartnershipErrorResponse {
  code: 'PARTNERSHIP_NOT_FOUND' | 'INVALID_OWNERSHIP' | 'PARTNER_NOT_FOUND' | 'DISTRIBUTION_ERROR' | 'CALCULATION_ERROR';
  message: string;
  details?: {
    partnershipId?: string;
    partnerId?: string;
    field?: string;
    value?: any;
  };
}

// Partnership validation error response
export interface PartnershipValidationError {
  field: string;
  message: string;
  code: 'REQUIRED' | 'INVALID_TYPE' | 'OUT_OF_RANGE' | 'INVALID_FORMAT' | 'BUSINESS_RULE_VIOLATION';
  value?: any;
}