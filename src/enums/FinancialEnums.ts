/**
 * Financial-related enumerations
 * 
 * Note: PartnerRole, DistributionStatus, and ShareStatus are defined in PartnershipRole.ts
 * PaymentMethod is defined in PaymentStatus.ts
 */

// ROI performance categories
export enum ROIPerformance {
  EXCELLENT = 'EXCELLENT',    // > 20%
  GOOD = 'GOOD',             // 10-20%
  AVERAGE = 'AVERAGE',       // 5-10%
  POOR = 'POOR',             // 0-5%
  NEGATIVE = 'NEGATIVE'      // < 0%
}

// Financial calculation types
export enum CalculationType {
  ROI = 'ROI',
  PROFIT_MARGIN = 'PROFIT_MARGIN',
  DEPRECIATION = 'DEPRECIATION',
  COST_ANALYSIS = 'COST_ANALYSIS'
}

// Profit calculation period types
export enum ProfitPeriod {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY'
}

// Partner share payment methods (extended from PaymentMethod)
export enum PartnerPaymentMethod {
  CHECK = 'CHECK',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  WIRE_TRANSFER = 'WIRE_TRANSFER'
}