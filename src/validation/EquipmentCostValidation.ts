/**
 * Equipment Cost Validation Schemas
 * 
 * Zod schemas for validating equipment cost inputs
 */

import { z } from 'zod';

// Equipment cost update schema
export const equipmentCostSchema = z.object({
  purchaseCost: z.number().positive('Purchase cost must be positive').optional(),
  monthlyDepreciation: z.number().positive('Monthly depreciation must be positive').optional(),
  maintenanceCost: z.number().min(0, 'Maintenance cost cannot be negative').optional(),
});

// Maintenance record schema
export const maintenanceRecordSchema = z.object({
  equipmentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Equipment ID must be a valid UUID'),
  maintenanceDate: z.date(),
  cost: z.number().positive('Maintenance cost must be positive'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),
});

// Equipment cost filters schema
export const equipmentCostFiltersSchema = z.object({
  showOnlyWithCosts: z.boolean().optional(),
  minROI: z.number().optional(),
  maxROI: z.number().optional(),
  hasMaintenanceRecords: z.boolean().optional(),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }).refine(
    (data) => data.startDate <= data.endDate,
    {
      message: 'Start date must be before or equal to end date',
      path: ['endDate'],
    }
  ).optional(),
});

// Cost analysis request schema
export const costAnalysisRequestSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  includeMaintenanceCosts: z.boolean().default(true),
  includeDepreciation: z.boolean().default(true),
}).refine(
  (data) => data.startDate <= data.endDate,
  {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  }
);

// Monthly depreciation request schema
export const monthlyDepreciationSchema = z.object({
  month: z.string()
    .regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format')
    .optional(),
});

// Equipment ROI request schema
export const equipmentROIRequestSchema = z.object({
  equipmentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Equipment ID must be a valid UUID'),
  includeProjections: z.boolean().default(false),
  comparisonPeriod: z.enum(['1_month', '3_months', '6_months', '1_year']).default('3_months'),
});

// Bulk equipment cost update schema
export const bulkEquipmentCostUpdateSchema = z.object({
  updates: z.array(
    z.object({
      equipmentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Equipment ID must be a valid UUID'),
      costs: equipmentCostSchema,
    })
  ).min(1, 'At least one equipment update is required')
    .max(100, 'Cannot update more than 100 equipment items at once'),
});

// Equipment cost statistics request schema
export const equipmentCostStatsRequestSchema = z.object({
  providerId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Provider ID must be a valid UUID').optional(),
  includeInactive: z.boolean().default(false),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }).optional(),
});

// Maintenance record filters schema
export const maintenanceRecordFiltersSchema = z.object({
  equipmentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Equipment ID must be a valid UUID').optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  minCost: z.number().min(0).optional(),
  maxCost: z.number().min(0).optional(),
  performedBy: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Performed by must be a valid UUID').optional(),
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
    if (data.minCost !== undefined && data.maxCost !== undefined) {
      return data.minCost <= data.maxCost;
    }
    return true;
  },
  {
    message: 'Minimum cost must be less than or equal to maximum cost',
    path: ['maxCost'],
  }
);

// Equipment performance report request schema
export const equipmentPerformanceReportSchema = z.object({
  providerId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Provider ID must be a valid UUID').optional(),
  reportType: z.enum(['summary', 'detailed', 'comparison']).default('summary'),
  period: z.enum(['1_month', '3_months', '6_months', '1_year']).default('3_months'),
  includeRecommendations: z.boolean().default(true),
});

// Depreciation schedule request schema
export const depreciationScheduleSchema = z.object({
  equipmentId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Equipment ID must be a valid UUID').optional(),
  providerId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Provider ID must be a valid UUID').optional(),
  projectionMonths: z.number().int().positive().max(120).default(12), // Max 10 years
});

// Type inference exports (using different names to avoid conflicts)
export type EquipmentCostValidationInput = z.infer<typeof equipmentCostSchema>;
export type MaintenanceRecordValidationInput = z.infer<typeof maintenanceRecordSchema>;
export type EquipmentCostFiltersValidationInput = z.infer<typeof equipmentCostFiltersSchema>;
export type CostAnalysisRequestValidationInput = z.infer<typeof costAnalysisRequestSchema>;
export type MonthlyDepreciationValidationInput = z.infer<typeof monthlyDepreciationSchema>;
export type EquipmentROIRequestValidationInput = z.infer<typeof equipmentROIRequestSchema>;
export type BulkEquipmentCostUpdateValidationInput = z.infer<typeof bulkEquipmentCostUpdateSchema>;
export type EquipmentCostStatsRequestValidationInput = z.infer<typeof equipmentCostStatsRequestSchema>;
export type MaintenanceRecordFiltersValidationInput = z.infer<typeof maintenanceRecordFiltersSchema>;
export type EquipmentPerformanceReportValidationInput = z.infer<typeof equipmentPerformanceReportSchema>;
export type DepreciationScheduleValidationInput = z.infer<typeof depreciationScheduleSchema>;

// Validation helper functions
export const validateEquipmentCost = (data: unknown) => {
  return equipmentCostSchema.safeParse(data);
};

export const validateMaintenanceRecord = (data: unknown) => {
  return maintenanceRecordSchema.safeParse(data);
};

export const validateCostAnalysisRequest = (data: unknown) => {
  return costAnalysisRequestSchema.safeParse(data);
};

export const validateEquipmentCostFilters = (data: unknown) => {
  return equipmentCostFiltersSchema.safeParse(data);
};

// Custom validation messages
export const EQUIPMENT_COST_VALIDATION_MESSAGES = {
  INVALID_EQUIPMENT_ID: 'Equipment ID must be a valid UUID',
  INVALID_COST_VALUE: 'Cost values must be positive numbers',
  INVALID_DATE_RANGE: 'Start date must be before or equal to end date',
  MAINTENANCE_DESCRIPTION_REQUIRED: 'Maintenance description is required',
  MAINTENANCE_DESCRIPTION_TOO_LONG: 'Maintenance description cannot exceed 500 characters',
  INVALID_MONTH_FORMAT: 'Month must be in YYYY-MM format',
  BULK_UPDATE_LIMIT_EXCEEDED: 'Cannot update more than 100 equipment items at once',
  PROJECTION_PERIOD_TOO_LONG: 'Projection period cannot exceed 10 years',
} as const;