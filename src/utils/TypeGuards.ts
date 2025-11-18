/**
 * Type guard functions for runtime type checking
 * 
 * Provides runtime validation and type checking for financial and partnership operations
 */

import { PartnerRole, DistributionStatus, ShareStatus } from '../enums/PartnershipRole';
import { PartnerStatus, PartnerNotificationType, PartnerSessionStatus } from '../enums/PartnerEnums';
import { ROIPerformance } from '../enums/FinancialEnums';
import { Partnership, ProfitDistribution, PartnerShare } from '../models/Partnership';
import { EquipmentROI, DateRange } from '../models/EquipmentCost';
import { FinancialOperationResult, ValidationResult } from './FinancialTypes';
import { PartnerData, PartnerSessionData, BankingDetails, NotificationPreferences } from '../models/PartnerAuth';
import { EarningsFilters } from './Filters';

// Partnership type guards
export function isValidPartnerRole(role: any): role is PartnerRole {
  return Object.values(PartnerRole).includes(role);
}

export function isActivePartnership(partnership: Partnership): boolean {
  return partnership.isActive && partnership.ownershipPercentage > 0;
}

export function isValidPartnership(partnership: any): partnership is Partnership {
  return (
    typeof partnership === 'object' &&
    partnership !== null &&
    typeof partnership.id === 'string' &&
    typeof partnership.companyId === 'string' &&
    typeof partnership.partnerId === 'string' &&
    typeof partnership.ownershipPercentage === 'number' &&
    partnership.ownershipPercentage > 0 &&
    partnership.ownershipPercentage <= 100 &&
    isValidPartnerRole(partnership.role) &&
    typeof partnership.isActive === 'boolean'
  );
}

// Distribution type guards
export function isDistributionStatus(status: any): status is DistributionStatus {
  return Object.values(DistributionStatus).includes(status);
}

export function canDistributeProfit(distribution: ProfitDistribution): boolean {
  return distribution.status === DistributionStatus.CALCULATED && 
         distribution.netProfit > 0;
}

export function isValidProfitDistribution(distribution: any): distribution is ProfitDistribution {
  return (
    typeof distribution === 'object' &&
    distribution !== null &&
    typeof distribution.id === 'string' &&
    typeof distribution.companyId === 'string' &&
    typeof distribution.month === 'string' &&
    isValidMonthFormat(distribution.month) &&
    typeof distribution.totalRevenue === 'number' &&
    typeof distribution.totalExpenses === 'number' &&
    typeof distribution.netProfit === 'number' &&
    isDistributionStatus(distribution.status)
  );
}

// Share type guards
export function isShareStatus(status: any): status is ShareStatus {
  return Object.values(ShareStatus).includes(status);
}

export function isPendingShare(share: PartnerShare): boolean {
  return share.status === ShareStatus.PENDING && share.paidAt === null;
}

export function isPaidShare(share: PartnerShare): boolean {
  return share.status === ShareStatus.PAID && share.paidAt !== null;
}

export function isValidPartnerShare(share: any): share is PartnerShare {
  return (
    typeof share === 'object' &&
    share !== null &&
    typeof share.id === 'string' &&
    typeof share.distributionId === 'string' &&
    typeof share.partnerId === 'string' &&
    typeof share.shareAmount === 'number' &&
    share.shareAmount >= 0 &&
    typeof share.percentage === 'number' &&
    share.percentage > 0 &&
    share.percentage <= 100 &&
    isShareStatus(share.status)
  );
}

// ROI type guards
export function getROIPerformance(roi: number): ROIPerformance {
  if (roi > 20) return ROIPerformance.EXCELLENT;
  if (roi > 10) return ROIPerformance.GOOD;
  if (roi > 5) return ROIPerformance.AVERAGE;
  if (roi > 0) return ROIPerformance.POOR;
  return ROIPerformance.NEGATIVE;
}

export function isPositiveROI(equipment: EquipmentROI): boolean {
  return equipment.roiPercentage > 0 && equipment.netProfit > 0;
}

export function isExcellentROI(roi: number): boolean {
  return roi > 20;
}

export function isValidEquipmentROI(equipmentROI: any): equipmentROI is EquipmentROI {
  return (
    typeof equipmentROI === 'object' &&
    equipmentROI !== null &&
    typeof equipmentROI.equipmentId === 'string' &&
    typeof equipmentROI.equipmentName === 'string' &&
    typeof equipmentROI.totalCost === 'number' &&
    equipmentROI.totalCost >= 0 &&
    typeof equipmentROI.totalRevenue === 'number' &&
    equipmentROI.totalRevenue >= 0 &&
    typeof equipmentROI.netProfit === 'number' &&
    typeof equipmentROI.roiPercentage === 'number' &&
    typeof equipmentROI.paybackMonths === 'number' &&
    equipmentROI.paybackMonths >= 0
  );
}

// Financial validation functions
export function isValidOwnershipPercentage(percentage: number): boolean {
  return !isNaN(percentage) && 
         isFinite(percentage) && 
         percentage > 0 && 
         percentage <= 100;
}

export function isValidMonthFormat(month: string): boolean {
  return /^\d{4}-\d{2}$/.test(month);
}

export function isValidDateFormat(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export function isValidFinancialAmount(amount: number): boolean {
  return !isNaN(amount) && 
         isFinite(amount) && 
         amount >= 0;
}

export function isValidPositiveAmount(amount: number): boolean {
  return !isNaN(amount) && 
         isFinite(amount) && 
         amount > 0;
}

// Date range validation
export function isValidDateRange(range: DateRange): boolean {
  return range.startDate instanceof Date &&
         range.endDate instanceof Date &&
         range.startDate <= range.endDate;
}

export function isValidDateRangeString(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return !isNaN(start.getTime()) && 
         !isNaN(end.getTime()) && 
         start <= end;
}

// Partnership ownership validation
export function validateTotalOwnership(partnerships: Partnership[]): ValidationResult {
  const activePartnerships = partnerships.filter(p => p.isActive);
  const total = activePartnerships.reduce((sum, p) => sum + p.ownershipPercentage, 0);
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (total === 100) {
    return { 
      isValid: true, 
      errors, 
      warnings 
    };
  } else if (total < 100) {
    const missing = 100 - total;
    errors.push(`Ownership percentages sum to ${total.toFixed(1)}%. Missing ${missing.toFixed(1)}%.`);
    
    if (missing < 5) {
      warnings.push('Small ownership gap detected. Consider adjusting existing partnerships.');
    }
    
    return { 
      isValid: false, 
      errors, 
      warnings,
      correctedValues: { totalOwnership: total, missingPercentage: missing }
    };
  } else {
    const excess = total - 100;
    errors.push(`Ownership percentages sum to ${total.toFixed(1)}%. Exceeds 100% by ${excess.toFixed(1)}%.`);
    
    return { 
      isValid: false, 
      errors, 
      warnings,
      correctedValues: { totalOwnership: total, excessPercentage: excess }
    };
  }
}

// Financial operation result type guards
export function isSuccessfulOperation<T>(result: FinancialOperationResult<T>): result is Extract<FinancialOperationResult<T>, { success: true }> {
  return result.success === true;
}

export function isFailedOperation<T>(result: FinancialOperationResult<T>): result is Extract<FinancialOperationResult<T>, { success: false }> {
  return result.success === false;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// UUID validation
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Currency validation
export function isValidCurrency(currency: string): boolean {
  // ISO 4217 currency codes (3 letters)
  return /^[A-Z]{3}$/.test(currency);
}

// Percentage validation
export function isValidPercentage(percentage: number, allowNegative: boolean = false): boolean {
  if (!isValidFinancialAmount(percentage)) return false;
  
  if (allowNegative) {
    return percentage >= -100 && percentage <= 100;
  }
  
  return percentage >= 0 && percentage <= 100;
}

// Business rule validations
export function canCreatePartnership(
  existingPartnerships: Partnership[], 
  newOwnershipPercentage: number
): ValidationResult {
  const currentTotal = existingPartnerships
    .filter(p => p.isActive)
    .reduce((sum, p) => sum + p.ownershipPercentage, 0);
  
  const newTotal = currentTotal + newOwnershipPercentage;
  
  if (newTotal > 100) {
    return {
      isValid: false,
      errors: [`Adding ${newOwnershipPercentage}% would exceed 100% ownership (current: ${currentTotal}%)`],
      warnings: []
    };
  }
  
  const warnings: string[] = [];
  if (newTotal > 95) {
    warnings.push('Total ownership will be very close to 100%. Consider leaving room for future partners.');
  }
  
  return {
    isValid: true,
    errors: [],
    warnings
  };
}

export function canDistributeProfitToPartners(
  distribution: ProfitDistribution,
  partnerships: Partnership[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check distribution status
  if (distribution.status !== DistributionStatus.CALCULATED) {
    errors.push('Distribution must be in CALCULATED status to distribute profits');
  }
  
  // Check positive profit
  if (distribution.netProfit <= 0) {
    errors.push('Cannot distribute negative or zero profit');
  }
  
  // Check active partnerships
  const activePartnerships = partnerships.filter(p => p.isActive);
  if (activePartnerships.length === 0) {
    errors.push('No active partnerships found for profit distribution');
  }
  
  // Check ownership totals
  const ownershipValidation = validateTotalOwnership(partnerships);
  if (!ownershipValidation.isValid) {
    errors.push(...ownershipValidation.errors);
  }
  
  // Warnings for small profit amounts
  if (distribution.netProfit < 100) {
    warnings.push('Profit amount is very small. Consider accumulating profits before distribution.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Equipment cost validation
export function isValidEquipmentCost(cost: number, equipmentType?: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!isValidPositiveAmount(cost)) {
    errors.push('Equipment cost must be a positive number');
  }
  
  // Type-specific validations
  if (equipmentType) {
    switch (equipmentType.toLowerCase()) {
      case 'router':
        if (cost > 10000) warnings.push('Router cost seems high. Please verify.');
        if (cost < 50) warnings.push('Router cost seems low. Please verify.');
        break;
      case 'server':
        if (cost > 50000) warnings.push('Server cost seems high. Please verify.');
        if (cost < 500) warnings.push('Server cost seems low. Please verify.');
        break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Partner-specific type guards

/**
 * Type guard for PartnerData
 */
export function isPartnerData(obj: any): obj is PartnerData {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.isCustomer === 'boolean' &&
    Array.isArray(obj.partnerships) &&
    typeof obj.totalInvestment === 'number' &&
    typeof obj.totalOwnership === 'number'
  );
}

/**
 * Type guard for PartnerSessionData
 */
export function isPartnerSessionData(obj: any): obj is PartnerSessionData {
  return (
    obj &&
    isPartnerData(obj.partner) &&
    obj.session &&
    typeof obj.session.token === 'string' &&
    obj.session.expiresAt instanceof Date
  );
}

/**
 * Type guard for valid partner filters
 */
export function isValidPartnerFilters(obj: any): obj is EarningsFilters {
  return (
    !obj ||
    (typeof obj === 'object' &&
      (!obj.month || typeof obj.month === 'string') &&
      (!obj.year || typeof obj.year === 'number') &&
      (!obj.partnershipId || typeof obj.partnershipId === 'string') &&
      (!obj.status || Object.values(ShareStatus).includes(obj.status)) &&
      (!obj.page || typeof obj.page === 'number') &&
      (!obj.limit || typeof obj.limit === 'number'))
  );
}

/**
 * Type guard for banking details
 */
export function isBankingDetails(obj: any): obj is BankingDetails {
  return (
    obj &&
    typeof obj.bankName === 'string' &&
    typeof obj.accountNumber === 'string' &&
    typeof obj.routingNumber === 'string' &&
    typeof obj.accountHolderName === 'string'
  );
}

/**
 * Type guard for notification preferences
 */
export function isNotificationPreferences(obj: any): obj is NotificationPreferences {
  return (
    obj &&
    typeof obj.emailNotifications === 'boolean' &&
    typeof obj.smsNotifications === 'boolean' &&
    typeof obj.distributionAlerts === 'boolean' &&
    typeof obj.monthlyReports === 'boolean'
  );
}

/**
 * Type guard for partner status
 */
export function isPartnerStatus(status: any): status is PartnerStatus {
  return Object.values(PartnerStatus).includes(status);
}

/**
 * Type guard for partner notification type
 */
export function isPartnerNotificationType(type: any): type is PartnerNotificationType {
  return Object.values(PartnerNotificationType).includes(type);
}

/**
 * Type guard for partner session status
 */
export function isPartnerSessionStatus(status: any): status is PartnerSessionStatus {
  return Object.values(PartnerSessionStatus).includes(status);
}