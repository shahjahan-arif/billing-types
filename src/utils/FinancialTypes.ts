/**
 * Financial Calculation Utility Types
 * 
 * Utility types for financial calculations, data structures, and operations
 */

import { Equipment } from '../models/Equipment';
import { Partnership } from '../models/Partnership';
import { MaintenanceRecord, EquipmentROI, DateRange } from '../models/EquipmentCost';

// Currency amount with metadata (legacy - use CurrencyAmount from models/Currency.ts for new code)
export interface FormattedCurrencyAmount {
  amount: number;
  currency: string;
  formatted: string;
  symbol?: string;
}

// Percentage with metadata and visual indicators
export interface Percentage {
  value: number;
  formatted: string;
  color?: 'success' | 'warning' | 'danger' | 'default';
  trend?: 'up' | 'down' | 'stable';
}

// Financial calculation result wrapper
export interface CalculationResult<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  warnings?: string[];
  metadata?: {
    calculatedAt: Date;
    calculationTime: number; // milliseconds
    dataPoints: number;
  };
}

// ROI calculation parameters
export interface ROICalculationParams {
  initialInvestment: number;
  totalRevenue: number;
  totalCosts: number;
  timeperiodMonths: number;
  includeDepreciation?: boolean;
  includeMaintenanceCosts?: boolean;
}

// ROI calculation result
export interface ROICalculationResult {
  roi: number;                    // ROI percentage
  netProfit: number;             // Total profit
  totalReturn: number;           // Total return amount
  annualizedROI: number;         // Annualized ROI
  paybackPeriod: number;         // Months to break even
  profitMargin: number;          // Profit margin percentage
}

// Profit margin calculation
export interface ProfitMarginCalculation {
  revenue: number;
  costs: number;
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
  operatingExpenses?: number;
  operatingMargin?: number;
}

// Financial trend data point
export interface TrendDataPoint {
  period: string;               // Date or period identifier (YYYY-MM)
  value: number;
  change?: number;              // Change from previous period
  changePercentage?: number;    // Percentage change
  label?: string;               // Human-readable label
}

// Financial comparison between periods
export interface FinancialComparison {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'major' | 'minor' | 'negligible';
}

// Financial operation result wrapper
export type FinancialOperationResult<T> = {
  success: true;
  data: T;
  timestamp: Date;
} | {
  success: false;
  error: string;
  code?: string;
  timestamp: Date;
};

// Partnership with computed financial metrics
export type PartnershipWithMetrics = Partnership & {
  totalDistributions: number;
  totalAmountReceived: number;
  averageMonthlyShare: number;
  lastDistributionDate: Date | null;
  projectedAnnualReturn: number;
  returnOnInvestment: number;
};

// Equipment with financial metrics
export type EquipmentWithFinancials = Equipment & {
  roi: EquipmentROI;
  monthlyRevenue: number;
  utilizationRate: number;
  maintenanceHistory: MaintenanceRecord[];
  depreciatedValue: number;
  remainingLifespan: number;
};

// Financial summary for dashboard
export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  equipmentROI: number;
  partnershipROI: number;
  monthlyGrowth: number;
  yearOverYearGrowth: number;
}

// Cost breakdown structure
export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  subcategories?: CostBreakdown[];
}

// Revenue breakdown structure
export interface RevenueBreakdown {
  source: string;
  amount: number;
  percentage: number;
  growth?: number;
}

// Financial performance metrics
export interface PerformanceMetrics {
  efficiency: {
    costPerCustomer: number;
    revenuePerCustomer: number;
    customerAcquisitionCost: number;
    customerLifetimeValue: number;
  };
  profitability: {
    grossMargin: number;
    netMargin: number;
    operatingMargin: number;
    ebitdaMargin: number;
  };
  growth: {
    revenueGrowth: number;
    profitGrowth: number;
    customerGrowth: number;
    equipmentGrowth: number;
  };
}

// Financial forecast data
export interface FinancialForecast {
  period: string;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedProfit: number;
  confidence: 'high' | 'medium' | 'low';
  assumptions: string[];
}

// Budget vs actual comparison
export interface BudgetComparison {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  status: 'over' | 'under' | 'on-target';
}

// Financial alert configuration
export interface FinancialAlert {
  type: 'revenue_drop' | 'cost_spike' | 'roi_decline' | 'profit_margin_low';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  actionRequired: boolean;
}

// Utility type helpers
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Financial calculation context
export interface CalculationContext {
  companyId: string;
  calculationType: 'roi' | 'profit_margin' | 'depreciation' | 'partnership_distribution';
  parameters: Record<string, any>;
  dateRange: DateRange;
  includeProjections: boolean;
}

// Financial data validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  correctedValues?: Record<string, any>;
}

// Currency conversion utility
export interface CurrencyConversion {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  convertedAmount: number;
  conversionDate: Date;
}

// Financial report metadata
export interface ReportMetadata {
  reportId: string;
  reportType: string;
  generatedAt: Date;
  generatedBy: string;
  dataRange: DateRange;
  totalRecords: number;
  calculationTime: number;
}