# Partnership System Enhancement - Types Architecture

**Version**: 1.0  
**Date**: 2025-11-01  
**Author**: Mary (Business Analyst)  
**Status**: Architecture Design

---

## Overview

This document defines the TypeScript type definitions for the partnership system enhancement, including customer-partner integration and dedicated partner portal functionality. These types serve as the single source of truth across frontend, backend, and API layers.

---

## Type Categories

### Phase 1: Customer-Partner Integration Types
- Partner verification types
- Customer partnership earnings types
- Partnership lookup types

### Phase 2: Partner Portal Types
- Partner authentication types
- Partner session management types
- Partner dashboard data types
- Partner analytics types

---

## Type Definitions

### Core Partner Types

#### Partner Authentication Types
```typescript
// src/models/PartnerAuth.ts

export interface PartnerLoginInput {
  email: string;
  password: string;
}

export interface PartnerLoginResponse {
  success: boolean;
  sessionToken: string;
  expiresAt: Date;
  partner: PartnerData;
}

export interface PartnerRegistrationInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface PartnerRegistrationResponse {
  success: boolean;
  message: string;
  partnerId: string;
}

export interface PartnerSessionData {
  partner: PartnerData;
  session: {
    token: string;
    expiresAt: Date;
  };
}

export interface PartnerData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isCustomer: boolean;
  partnerships: PartnershipSummary[];
  totalInvestment: number;
  totalOwnership: number;
}

export interface PartnershipSummary {
  id: string;
  companyId: string;
  companyName: string;
  ownershipPercentage: number;
  investmentAmount: number;
  joinDate: Date;
  role: PartnerRole;
  isActive: boolean;
}
```

#### Partner Session Types
```typescript
// src/models/PartnerSession.ts

export interface PartnerSession {
  id: string;
  partnerEmail: string;
  sessionToken: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePartnerSessionInput {
  partnerEmail: string;
  sessionToken: string;
  expiresAt: Date;
}

export interface PartnerLoginAttempt {
  id: string;
  email: string;
  ipAddress?: string;
  success: boolean;
  attemptedAt: Date;
}

export interface CreatePartnerLoginAttemptInput {
  email: string;
  ipAddress?: string;
  success: boolean;
}
```

#### Partner Profile Types
```typescript
// src/models/PartnerProfile.ts

export interface PartnerProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  bankingDetails?: BankingDetails;
  notificationPreferences?: NotificationPreferences;
  isCustomer: boolean;
  customerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankingDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  distributionAlerts: boolean;
  monthlyReports: boolean;
}

export interface CreatePartnerProfileInput {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isCustomer: boolean;
  customerId?: string;
}

export interface UpdatePartnerProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  bankingDetails?: BankingDetails;
  notificationPreferences?: NotificationPreferences;
}
```

### Partner Earnings Types

#### Earnings Data Types
```typescript
// src/models/PartnerEarnings.ts

export interface PartnerEarningsResponse {
  partner: {
    id: string;
    email: string;
    name: string;
  };
  partnerships: number;
  totalEarnings: number;
  earnings: PartnerEarningDetail[];
  distributions: PartnerDistribution[];
  pagination?: PaginationInfo;
}

export interface PartnerEarningDetail {
  partnershipId: string;
  companyName: string;
  distributionId: string;
  month: string;
  shareAmount: number;
  percentage: number;
  status: ShareStatus;
  paidAt?: Date;
}

export interface PartnerDistribution {
  id: string;
  partnershipId: string;
  companyName: string;
  month: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  distributionDate: Date;
  status: DistributionStatus;
}

export interface AggregatedEarnings {
  total: number;
  details: PartnerEarningDetail[];
  distributions: PartnerDistribution[];
}

export interface EarningsFilters {
  month?: string;
  year?: number;
  partnershipId?: string;
  status?: ShareStatus;
  page?: number;
  limit?: number;
}

export interface EarningsAnalytics {
  totalEarnings: number;
  averageMonthlyEarnings: number;
  bestMonth: {
    month: string;
    amount: number;
  };
  worstMonth: {
    month: string;
    amount: number;
  };
  growthRate: number;
  yearOverYearGrowth: number;
}
```

#### Partner Analytics Types
```typescript
// src/models/PartnerAnalytics.ts

export interface PartnerAnalyticsData {
  overview: PartnerOverviewMetrics;
  performance: PartnerPerformanceMetrics;
  trends: PartnerTrendData;
  comparisons: PartnerComparisonData;
}

export interface PartnerOverviewMetrics {
  totalEarnings: number;
  totalInvestment: number;
  averageROI: number;
  activePartnerships: number;
  totalDistributions: number;
  averageMonthlyEarnings: number;
}

export interface PartnerPerformanceMetrics {
  bestPerformingPartnership: {
    id: string;
    companyName: string;
    roi: number;
    totalEarnings: number;
  };
  worstPerformingPartnership: {
    id: string;
    companyName: string;
    roi: number;
    totalEarnings: number;
  };
  consistencyScore: number; // 0-100 based on earnings stability
  riskScore: number; // 0-100 based on investment diversification
}

export interface PartnerTrendData {
  earningsTrend: TrendDataPoint[];
  roiTrend: TrendDataPoint[];
  investmentTrend: TrendDataPoint[];
  monthlyGrowth: number;
  quarterlyGrowth: number;
  yearlyGrowth: number;
}

export interface TrendDataPoint {
  period: string; // YYYY-MM format
  value: number;
  change?: number; // Percentage change from previous period
}

export interface PartnerComparisonData {
  industryBenchmark: {
    averageROI: number;
    averageMonthlyEarnings: number;
  };
  peerComparison: {
    percentile: number; // Where this partner ranks (0-100)
    aboveAverage: boolean;
  };
  portfolioHealth: {
    diversificationScore: number; // 0-100
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    recommendations: string[];
  };
}
```

### Partner Dashboard Types

#### Dashboard Data Types
```typescript
// src/models/PartnerDashboard.ts

export interface PartnerDashboardData {
  overview: PartnerDashboardOverview;
  recentEarnings: PartnerEarningDetail[];
  partnerships: PartnershipSummary[];
  recentDistributions: PartnerDistribution[];
  notifications: PartnerNotification[];
  quickActions: PartnerQuickAction[];
}

export interface PartnerDashboardOverview {
  totalEarnings: number;
  totalInvestment: number;
  activePartnerships: number;
  averageROI: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  earningsGrowth: number; // Percentage change
  pendingDistributions: number;
}

export interface PartnerNotification {
  id: string;
  type: PartnerNotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface PartnerQuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  enabled: boolean;
}

export enum PartnerNotificationType {
  DISTRIBUTION_AVAILABLE = 'DISTRIBUTION_AVAILABLE',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PARTNERSHIP_UPDATE = 'PARTNERSHIP_UPDATE',
  MONTHLY_REPORT = 'MONTHLY_REPORT',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
}
```

### API Response Types

#### Partnership Verification Types
```typescript
// src/api/PartnershipVerification.ts

export interface PartnershipVerificationRequest {
  email: string;
}

export interface PartnershipVerificationResponse {
  isPartner: boolean;
  partnership: Partnership | null;
  customerPartnerships?: Partnership[];
}

export interface CustomerPartnershipEarningsRequest {
  filters?: EarningsFilters;
}

export interface CustomerPartnershipEarningsResponse extends PartnerEarningsResponse {
  customerInfo: {
    id: string;
    email: string;
    name: string;
    isVerifiedPartner: boolean;
  };
}
```

#### Partner API Types
```typescript
// src/api/PartnerAPI.ts

export interface PartnerAPIRequest {
  sessionToken?: string;
}

export interface PartnerDashboardRequest extends PartnerAPIRequest {
  // No additional fields needed
}

export interface PartnerEarningsRequest extends PartnerAPIRequest {
  filters?: EarningsFilters;
}

export interface PartnerAnalyticsRequest extends PartnerAPIRequest {
  timeRange?: string;
  includeComparisons?: boolean;
}

export interface PartnerProfileUpdateRequest extends PartnerAPIRequest {
  profileData: UpdatePartnerProfileInput;
}

export interface PartnerAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: Date;
    requestId: string;
  };
}
```

### Frontend State Types

#### Redux State Types
```typescript
// src/frontend/PartnerState.ts

export interface PartnerAuthState {
  partner: PartnerData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  session: {
    token: string | null;
    expiresAt: Date | null;
  };
  loginAttempts: number;
  lastLoginAttempt: Date | null;
}

export interface PartnerDashboardState {
  data: PartnerDashboardData | null;
  loading: {
    overview: boolean;
    earnings: boolean;
    partnerships: boolean;
    distributions: boolean;
    notifications: boolean;
  };
  error: {
    overview: string | null;
    earnings: string | null;
    partnerships: string | null;
    distributions: string | null;
    notifications: string | null;
  };
  lastUpdated: Date | null;
  refreshInterval: number;
}

export interface PartnerEarningsState {
  earnings: PartnerEarningDetail[];
  distributions: PartnerDistribution[];
  analytics: EarningsAnalytics | null;
  filters: EarningsFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  selectedDistribution: PartnerDistribution | null;
  loading: {
    earnings: boolean;
    distributions: boolean;
    analytics: boolean;
  };
  error: {
    earnings: string | null;
    distributions: string | null;
    analytics: string | null;
  };
}

export interface PartnerProfileState {
  profile: PartnerProfile | null;
  isEditing: boolean;
  loading: {
    profile: boolean;
    update: boolean;
  };
  error: {
    profile: string | null;
    update: string | null;
  };
  unsavedChanges: boolean;
  lastSaved: Date | null;
}
```

#### Component Props Types
```typescript
// src/frontend/ComponentProps.ts

export interface PartnerDashboardProps {
  partner: PartnerData;
  onRefresh?: () => void;
  refreshInterval?: number;
}

export interface PartnerEarningsTableProps {
  earnings: PartnerEarningDetail[];
  loading?: boolean;
  onDistributionClick?: (distribution: PartnerDistribution) => void;
  onFilterChange?: (filters: EarningsFilters) => void;
}

export interface PartnerAnalyticsChartProps {
  data: PartnerTrendData;
  type: 'earnings' | 'roi' | 'investment';
  timeRange: string;
  height?: number;
}

export interface PartnershipCardProps {
  partnership: PartnershipSummary;
  showDetails?: boolean;
  onViewDetails?: (partnershipId: string) => void;
  onViewEarnings?: (partnershipId: string) => void;
}

export interface PartnerProfileFormProps {
  profile: PartnerProfile;
  onSave: (updates: UpdatePartnerProfileInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface PartnerNotificationListProps {
  notifications: PartnerNotification[];
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  maxItems?: number;
}
```

### Utility Types

#### Pagination Types
```typescript
// src/utils/Pagination.ts

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
}
```

#### Filter Types
```typescript
// src/utils/Filters.ts

export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}

export interface PartnerFilters {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'ALL';
  dateRange?: DateRangeFilter;
  sortBy?: 'name' | 'earnings' | 'roi' | 'joinDate';
  sortOrder?: 'asc' | 'desc';
}

export interface EarningsFilters extends PaginationRequest {
  month?: string;
  year?: number;
  partnershipId?: string;
  status?: ShareStatus;
  minAmount?: number;
  maxAmount?: number;
  dateRange?: DateRangeFilter;
}

export interface AnalyticsFilters {
  timeRange?: '3M' | '6M' | '1Y' | '2Y' | 'ALL';
  includeProjections?: boolean;
  compareWithPrevious?: boolean;
  groupBy?: 'month' | 'quarter' | 'year';
}
```

#### Validation Types
```typescript
// src/utils/Validation.ts

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface PartnerLoginValidation {
  email: ValidationResult;
  password: ValidationResult;
  overall: ValidationResult;
}

export interface PartnerRegistrationValidation {
  email: ValidationResult;
  password: ValidationResult;
  firstName: ValidationResult;
  lastName: ValidationResult;
  phone: ValidationResult;
  overall: ValidationResult;
}

export interface PartnerProfileValidation {
  firstName: ValidationResult;
  lastName: ValidationResult;
  phone: ValidationResult;
  address: ValidationResult;
  bankingDetails: ValidationResult;
  overall: ValidationResult;
}
```

### Enum Extensions

#### Partner-Specific Enums
```typescript
// src/enums/PartnerEnums.ts

export enum PartnerRole {
  PARTNER = 'PARTNER',
  INVESTOR = 'INVESTOR',
  SILENT_PARTNER = 'SILENT_PARTNER',
  MANAGING_PARTNER = 'MANAGING_PARTNER',
}

export enum PartnerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export enum PartnerNotificationType {
  DISTRIBUTION_AVAILABLE = 'DISTRIBUTION_AVAILABLE',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PARTNERSHIP_UPDATE = 'PARTNERSHIP_UPDATE',
  MONTHLY_REPORT = 'MONTHLY_REPORT',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  PROFILE_UPDATE_REQUIRED = 'PROFILE_UPDATE_REQUIRED',
}

export enum PartnerSessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum PartnerAccessLevel {
  READ_ONLY = 'READ_ONLY',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}
```

### Type Guards

#### Partner Type Guards
```typescript
// src/utils/TypeGuards.ts

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

export function isPartnerEarningsResponse(obj: any): obj is PartnerEarningsResponse {
  return (
    obj &&
    obj.partner &&
    typeof obj.partner.id === 'string' &&
    typeof obj.partnerships === 'number' &&
    typeof obj.totalEarnings === 'number' &&
    Array.isArray(obj.earnings) &&
    Array.isArray(obj.distributions)
  );
}

export function isPartnerSessionData(obj: any): obj is PartnerSessionData {
  return (
    obj &&
    isPartnerData(obj.partner) &&
    obj.session &&
    typeof obj.session.token === 'string' &&
    obj.session.expiresAt instanceof Date
  );
}

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
```

### Export Structure

#### Main Export File
```typescript
// src/index.ts - Updated exports

// Existing exports...
export * from './models/Partnership';
export * from './models/ProfitDistribution';
export * from './models/PartnerShare';

// New partner enhancement exports
export * from './models/PartnerAuth';
export * from './models/PartnerSession';
export * from './models/PartnerProfile';
export * from './models/PartnerEarnings';
export * from './models/PartnerAnalytics';
export * from './models/PartnerDashboard';

// API types
export * from './api/PartnershipVerification';
export * from './api/PartnerAPI';

// Frontend types
export * from './frontend/PartnerState';
export * from './frontend/ComponentProps';

// Utility types
export * from './utils/Pagination';
export * from './utils/Filters';
export * from './utils/Validation';
export * from './utils/TypeGuards';

// Enums
export * from './enums/PartnerEnums';
```

#### Package-Specific Exports
```typescript
// src/models/index.ts - Updated
export * from './Partnership';
export * from './ProfitDistribution';
export * from './PartnerShare';
export * from './PartnerAuth';
export * from './PartnerSession';
export * from './PartnerProfile';
export * from './PartnerEarnings';
export * from './PartnerAnalytics';
export * from './PartnerDashboard';

// src/enums/index.ts - Updated
export * from './UserRole';
export * from './PaymentStatus';
export * from './DistributionStatus';
export * from './ShareStatus';
export * from './PartnerEnums';

// src/api/index.ts - New
export * from './PartnershipVerification';
export * from './PartnerAPI';

// src/frontend/index.ts - New
export * from './PartnerState';
export * from './ComponentProps';

// src/utils/index.ts - Updated
export * from './ApiResponse';
export * from './Pagination';
export * from './Filters';
export * from './Validation';
export * from './TypeGuards';
```

---

## Type Usage Examples

### Backend Usage
```typescript
// In backend services
import { 
  PartnerLoginInput, 
  PartnerEarningsResponse,
  EarningsFilters 
} from '@billing-system/types';

export class PartnerAuthService {
  async login(input: PartnerLoginInput): Promise<PartnerLoginResponse> {
    // Implementation
  }
}
```

### Frontend Usage
```typescript
// In React components
import { 
  PartnerData, 
  PartnerDashboardData,
  PartnerEarningsTableProps 
} from '@billing-system/types';

export function PartnerEarningsTable({ 
  earnings, 
  loading, 
  onDistributionClick 
}: PartnerEarningsTableProps) {
  // Component implementation
}
```

### tRPC Usage
```typescript
// In tRPC routers
import { 
  PartnerLoginInput,
  PartnerEarningsRequest,
  PartnerAnalyticsData 
} from '@billing-system/types';

export const partnerRouter = router({
  login: publicProcedure
    .input(partnerLoginInputSchema)
    .mutation(async ({ input }): Promise<PartnerLoginResponse> => {
      // Implementation
    }),
});
```

---

## Type Safety Guidelines

### Strict Type Checking
- All partner-related functions must use proper types
- No `any` types allowed in partner system
- Use type guards for runtime validation
- Implement proper error types for all operations

### Validation Integration
- All input types should have corresponding Zod schemas
- Runtime validation for all API endpoints
- Type-safe form validation in frontend
- Proper error handling with typed error responses

### Performance Considerations
- Use utility types to avoid duplication
- Implement proper caching types
- Type-safe pagination and filtering
- Optimized type definitions for large datasets

---

This types architecture provides comprehensive type safety for the partnership system enhancement across all layers of the application, ensuring consistency and reliability throughout the implementation.