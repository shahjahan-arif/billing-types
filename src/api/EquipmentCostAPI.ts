/**
 * Equipment Cost API Response Types
 */

import { 
  EquipmentFinancials, 
  EquipmentROI, 
  EquipmentCostAnalysis, 
  MaintenanceRecord,
  EquipmentCostBreakdown,
  EquipmentROIComparison,
  MaintenanceCostSummary,
  DepreciationSchedule
} from '../models/EquipmentCost';
import { ApiResponse, PaginatedResponse } from '../utils/ApiResponse';

// Equipment financials response
export type EquipmentFinancialsResponse = ApiResponse<EquipmentFinancials>;

// Equipment ROI response
export type EquipmentROIResponse = ApiResponse<EquipmentROI>;

// Equipment cost analysis response
export type EquipmentCostAnalysisResponse = ApiResponse<EquipmentCostAnalysis>;

// Equipment cost breakdown response
export type EquipmentCostBreakdownResponse = ApiResponse<EquipmentCostBreakdown>;

// Maintenance records response
export type MaintenanceRecordsResponse = PaginatedResponse<MaintenanceRecord>;

// Maintenance cost summary response
export type MaintenanceCostSummaryResponse = ApiResponse<MaintenanceCostSummary[]>;

// Equipment ROI comparison response
export type EquipmentROIComparisonResponse = ApiResponse<EquipmentROIComparison[]>;

// Depreciation schedule response
export type DepreciationScheduleResponse = ApiResponse<DepreciationSchedule[]>;

// Update equipment costs response
export type UpdateEquipmentCostsResponse = ApiResponse<{
  success: boolean;
  equipmentId: string;
  updatedFields: string[];
  newValues: {
    purchaseCost?: number;
    monthlyDepreciation?: number;
    maintenanceCost?: number;
  };
}>;

// Add maintenance record response
export type AddMaintenanceRecordResponse = ApiResponse<MaintenanceRecord>;

// Monthly depreciation response
export type MonthlyDepreciationResponse = ApiResponse<{
  month: string;
  totalDepreciation: number;
  equipmentCount: number;
  averageDepreciationPerEquipment: number;
}>;

// Equipment cost statistics response
export type EquipmentCostStatsResponse = ApiResponse<{
  totalEquipmentValue: number;
  totalMonthlyDepreciation: number;
  totalMaintenanceCosts: number;
  averageROI: number;
  equipmentCount: number;
  utilizationRate: number;
  costEfficiencyRating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR';
}>;

// Bulk equipment cost update response
export type BulkEquipmentCostUpdateResponse = ApiResponse<{
  successful: number;
  failed: number;
  errors: Array<{
    equipmentId: string;
    error: string;
  }>;
}>;

// Equipment cost trend response
export type EquipmentCostTrendResponse = ApiResponse<{
  period: string;
  trends: Array<{
    month: string;
    totalCosts: number;
    depreciation: number;
    maintenance: number;
    roi: number;
    equipmentCount: number;
  }>;
  summary: {
    averageMonthlyCost: number;
    costGrowthRate: number;
    roiTrend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  };
}>;

// Equipment performance report response
export type EquipmentPerformanceReportResponse = ApiResponse<{
  reportDate: Date;
  totalEquipment: number;
  performanceBreakdown: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
    negative: number;
  };
  topPerformers: EquipmentROI[];
  underPerformers: EquipmentROI[];
  recommendations: Array<{
    equipmentId: string;
    recommendation: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
}>;

// Error response types specific to equipment cost operations
export interface EquipmentCostErrorResponse {
  code: 'EQUIPMENT_NOT_FOUND' | 'INVALID_COST_DATA' | 'MAINTENANCE_RECORD_ERROR' | 'ROI_CALCULATION_ERROR';
  message: string;
  details?: {
    equipmentId?: string;
    field?: string;
    value?: any;
  };
}

// Equipment cost validation error response
export interface EquipmentCostValidationError {
  field: string;
  message: string;
  code: 'REQUIRED' | 'INVALID_TYPE' | 'OUT_OF_RANGE' | 'INVALID_FORMAT';
  value?: any;
}