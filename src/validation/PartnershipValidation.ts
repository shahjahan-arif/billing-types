/**
 * Partnership Validation Schemas
 * 
 * Zod schemas for validating partnership inputs
 */

import { z } from 'zod';
import { PartnerRole, DistributionStatus, ShareStatus } from '../enums/PartnershipRole';
import { PaymentMethod } from '../enums/PaymentStatus';
import { PartnerPaymentMethod } from '../enums/FinancialEnums';

// UUID regex pattern for validation
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Partnership creation schema
export const createPartnershipSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID'),
    partnerEmail: z.string().email('Partner email must be a valid email address'),
    ownershipPercentage: z.number()
        .min(0.01, 'Ownership percentage must be at least 0.01%')
        .max(100, 'Ownership percentage cannot exceed 100%'),
    role: z.nativeEnum(PartnerRole).default(PartnerRole.PARTNER),
    investmentAmount: z.number().positive('Investment amount must be positive').optional(),
    joinDate: z.date().optional(),
});

// Partnership update schema
export const updatePartnershipSchema = z.object({
    ownershipPercentage: z.number()
        .min(0.01, 'Ownership percentage must be at least 0.01%')
        .max(100, 'Ownership percentage cannot exceed 100%')
        .optional(),
    role: z.nativeEnum(PartnerRole).optional(),
    isActive: z.boolean().optional(),
    investmentAmount: z.number().positive('Investment amount must be positive').optional(),
});

// Profit calculation schema
export const calculateProfitSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID'),
    month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
});

// Profit distribution schema
export const distributeProfitSchema = z.object({
    distributionId: z.string().regex(uuidRegex, 'Distribution ID must be a valid UUID'),
});

// Partner share payment schema
export const markSharePaidSchema = z.object({
    shareId: z.string().regex(uuidRegex, 'Share ID must be a valid UUID'),
    paymentMethod: z.enum([...Object.values(PaymentMethod), ...Object.values(PartnerPaymentMethod)]).optional(),
    paymentReference: z.string().min(1, 'Payment reference is required').max(100).optional(),
    paidAt: z.date().optional(),
});

// Partner share filters schema
export const partnerShareFiltersSchema = z.object({
    status: z.nativeEnum(ShareStatus).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minAmount: z.number().positive('Minimum amount must be positive').optional(),
    maxAmount: z.number().positive('Maximum amount must be positive').optional(),
    partnerId: z.string().regex(uuidRegex, 'Partner ID must be a valid UUID').optional(),
    distributionId: z.string().regex(uuidRegex, 'Distribution ID must be a valid UUID').optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
}).refine(
    (data) => {
        if (data.startDate && data.endDate) {
            return data.startDate <= data.endDate;
        }
        return true;
    },
    {
        message: 'Start date must be before or equal to end date',
        path: ['endDate'],
    }
).refine(
    (data) => {
        if (data.minAmount !== undefined && data.maxAmount !== undefined) {
            return data.minAmount <= data.maxAmount;
        }
        return true;
    },
    {
        message: 'Minimum amount must be less than or equal to maximum amount',
        path: ['maxAmount'],
    }
);

// Ownership validation schema
export const ownershipValidationSchema = z.object({
    partnerships: z.array(z.object({
        id: z.string().regex(uuidRegex, 'Partnership ID must be a valid UUID'),
        ownershipPercentage: z.number().min(0).max(100),
        isActive: z.boolean(),
    })),
}).refine(
    (data) => {
        const totalOwnership = data.partnerships
            .filter(p => p.isActive)
            .reduce((sum, p) => sum + p.ownershipPercentage, 0);
        return totalOwnership <= 100;
    },
    {
        message: 'Total ownership percentage cannot exceed 100%',
    }
);

// Profit distribution filters schema
export const profitDistributionFiltersSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID').optional(),
    status: z.nativeEnum(DistributionStatus).optional(),
    startMonth: z.string().regex(/^\d{4}-\d{2}$/, 'Start month must be in YYYY-MM format').optional(),
    endMonth: z.string().regex(/^\d{4}-\d{2}$/, 'End month must be in YYYY-MM format').optional(),
    minAmount: z.number().positive('Minimum amount must be positive').optional(),
    maxAmount: z.number().positive('Maximum amount must be positive').optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
}).refine(
    (data) => {
        if (data.startMonth && data.endMonth) {
            return data.startMonth <= data.endMonth;
        }
        return true;
    },
    {
        message: 'Start month must be before or equal to end month',
        path: ['endMonth'],
    }
);

// Partnership statistics request schema
export const partnershipStatsRequestSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID'),
    includeInactive: z.boolean().default(false),
    startMonth: z.string().regex(/^\d{4}-\d{2}$/, 'Start month must be in YYYY-MM format').optional(),
    endMonth: z.string().regex(/^\d{4}-\d{2}$/, 'End month must be in YYYY-MM format').optional(),
});

// Profit analysis request schema
export const profitAnalysisRequestSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID'),
    startMonth: z.string().regex(/^\d{4}-\d{2}$/, 'Start month must be in YYYY-MM format'),
    endMonth: z.string().regex(/^\d{4}-\d{2}$/, 'End month must be in YYYY-MM format'),
    includeEquipmentCosts: z.boolean().default(true),
    includeOperationalCosts: z.boolean().default(true),
}).refine(
    (data) => data.startMonth <= data.endMonth,
    {
        message: 'Start month must be before or equal to end month',
        path: ['endMonth'],
    }
);

// Bulk partnership update schema
export const bulkPartnershipUpdateSchema = z.object({
    updates: z.array(
        z.object({
            partnershipId: z.string().regex(uuidRegex, 'Partnership ID must be a valid UUID'),
            updates: updatePartnershipSchema,
        })
    ).min(1, 'At least one partnership update is required')
        .max(50, 'Cannot update more than 50 partnerships at once'),
});

// Partner performance report request schema
export const partnerPerformanceReportSchema = z.object({
    companyId: z.string().regex(uuidRegex, 'Company ID must be a valid UUID'),
    reportType: z.enum(['summary', 'detailed', 'comparison']).default('summary'),
    period: z.enum(['3_months', '6_months', '1_year', 'all_time']).default('6_months'),
    includeInactive: z.boolean().default(false),
});

// Type inference exports
export type CreatePartnershipValidationInput = z.infer<typeof createPartnershipSchema>;
export type UpdatePartnershipValidationInput = z.infer<typeof updatePartnershipSchema>;
export type CalculateProfitValidationInput = z.infer<typeof calculateProfitSchema>;
export type DistributeProfitValidationInput = z.infer<typeof distributeProfitSchema>;
export type MarkSharePaidValidationInput = z.infer<typeof markSharePaidSchema>;
export type PartnerShareFiltersValidationInput = z.infer<typeof partnerShareFiltersSchema>;
export type OwnershipValidationInput = z.infer<typeof ownershipValidationSchema>;
export type ProfitDistributionFiltersValidationInput = z.infer<typeof profitDistributionFiltersSchema>;
export type PartnershipStatsRequestValidationInput = z.infer<typeof partnershipStatsRequestSchema>;
export type ProfitAnalysisRequestValidationInput = z.infer<typeof profitAnalysisRequestSchema>;
export type BulkPartnershipUpdateValidationInput = z.infer<typeof bulkPartnershipUpdateSchema>;
export type PartnerPerformanceReportValidationInput = z.infer<typeof partnerPerformanceReportSchema>;

// Validation helper functions
export const validateCreatePartnership = (data: unknown) => {
    return createPartnershipSchema.safeParse(data);
};

export const validateUpdatePartnership = (data: unknown) => {
    return updatePartnershipSchema.safeParse(data);
};

export const validateCalculateProfit = (data: unknown) => {
    return calculateProfitSchema.safeParse(data);
};

export const validateOwnership = (data: unknown) => {
    return ownershipValidationSchema.safeParse(data);
};

export const validatePartnerShareFilters = (data: unknown) => {
    return partnerShareFiltersSchema.safeParse(data);
};

// Custom validation messages
export const PARTNERSHIP_VALIDATION_MESSAGES = {
    INVALID_PARTNERSHIP_ID: 'Partnership ID must be a valid UUID',
    INVALID_COMPANY_ID: 'Company ID must be a valid UUID',
    INVALID_PARTNER_EMAIL: 'Partner email must be a valid email address',
    INVALID_OWNERSHIP_PERCENTAGE: 'Ownership percentage must be between 0.01 and 100',
    OWNERSHIP_EXCEEDS_LIMIT: 'Total ownership percentage cannot exceed 100%',
    INVALID_MONTH_FORMAT: 'Month must be in YYYY-MM format',
    INVALID_DATE_RANGE: 'Start date must be before or equal to end date',
    INVESTMENT_AMOUNT_NEGATIVE: 'Investment amount must be positive',
    BULK_UPDATE_LIMIT_EXCEEDED: 'Cannot update more than 50 partnerships at once',
    PAYMENT_REFERENCE_REQUIRED: 'Payment reference is required when marking as paid',
} as const;