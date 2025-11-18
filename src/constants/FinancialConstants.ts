/**
 * Financial calculation constants and thresholds
 * 
 * Defines constants used throughout the financial calculation system
 */

// ROI performance thresholds (percentages)
export const ROI_THRESHOLDS = {
  EXCELLENT: 20,    // > 20%
  GOOD: 10,         // 10-20%
  AVERAGE: 5,       // 5-10%
  POOR: 0,          // 0-5%
  // < 0% = NEGATIVE
} as const;

// Financial validation limits
export const FINANCIAL_LIMITS = {
  // Ownership percentages
  MAX_OWNERSHIP_PERCENTAGE: 100,
  MIN_OWNERSHIP_PERCENTAGE: 0.01,
  
  // Equipment costs
  MAX_EQUIPMENT_COST: 1000000,      // $1M max equipment cost
  MIN_EQUIPMENT_COST: 0.01,         // $0.01 min equipment cost
  MAX_MAINTENANCE_COST: 100000,     // $100K max maintenance cost
  MIN_MAINTENANCE_COST: 0.01,       // $0.01 min maintenance cost
  
  // Investment amounts
  MAX_INVESTMENT_AMOUNT: 10000000,  // $10M max investment
  MIN_INVESTMENT_AMOUNT: 1,         // $1 min investment
  
  // Profit distribution
  MIN_PROFIT_FOR_DISTRIBUTION: 1,   // $1 minimum profit to distribute
  MAX_PARTNERS_PER_COMPANY: 50,     // Maximum partners per company
  
  // Date ranges
  MAX_ANALYSIS_MONTHS: 120,         // 10 years max analysis period
  MIN_ANALYSIS_MONTHS: 1,           // 1 month min analysis period
} as const;

// Date format patterns
export const DATE_PATTERNS = {
  MONTH_FORMAT: /^\d{4}-\d{2}$/,           // YYYY-MM
  DATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/,      // YYYY-MM-DD
  DATETIME_FORMAT: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO datetime
} as const;

// Currency formatting configuration
export const CURRENCY_CONFIG = {
  DEFAULT_CURRENCY: 'USD',
  DECIMAL_PLACES: 2,
  THOUSAND_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.',
  CURRENCY_SYMBOL: '$',
  
  // Supported currencies
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const,
} as const;

// Calculation precision settings
export const CALCULATION_PRECISION = {
  ROI_DECIMAL_PLACES: 2,
  PERCENTAGE_DECIMAL_PLACES: 1,
  CURRENCY_DECIMAL_PLACES: 2,
  RATIO_DECIMAL_PLACES: 4,
  
  // Rounding methods
  ROUNDING_METHOD: 'ROUND' as const, // 'ROUND' | 'FLOOR' | 'CEIL'
} as const;

// Equipment depreciation constants
export const DEPRECIATION_CONFIG = {
  // Default depreciation rates (monthly percentages)
  DEFAULT_RATES: {
    ROUTER: 2.5,        // 2.5% per month
    SERVER: 3.0,        // 3.0% per month
    SWITCH: 2.0,        // 2.0% per month
    MODEM: 4.0,         // 4.0% per month
    OTHER: 2.5,         // 2.5% per month (default)
  },
  
  // Depreciation methods
  METHODS: {
    STRAIGHT_LINE: 'STRAIGHT_LINE',
    DECLINING_BALANCE: 'DECLINING_BALANCE',
    ACCELERATED: 'ACCELERATED',
  } as const,
  
  // Equipment lifespan (months)
  DEFAULT_LIFESPAN: {
    ROUTER: 60,         // 5 years
    SERVER: 48,         // 4 years
    SWITCH: 72,         // 6 years
    MODEM: 36,          // 3 years
    OTHER: 60,          // 5 years (default)
  },
} as const;

// Partnership constants
export const PARTNERSHIP_CONFIG = {
  // Default partner roles and their typical ownership ranges
  ROLE_OWNERSHIP_RANGES: {
    OWNER: { min: 25, max: 100 },      // 25-100%
    PARTNER: { min: 5, max: 49 },      // 5-49%
    INVESTOR: { min: 1, max: 25 },     // 1-25%
  },
  
  // Profit distribution settings
  MIN_DISTRIBUTION_AMOUNT: 100,        // $100 minimum to distribute
  DISTRIBUTION_FREQUENCY: 'MONTHLY',   // Default frequency
  
  // Partnership validation
  OWNERSHIP_TOLERANCE: 0.01,           // 0.01% tolerance for ownership calculations
} as const;

// Performance benchmarks
export const PERFORMANCE_BENCHMARKS = {
  // Industry standard ROI benchmarks
  INDUSTRY_ROI: {
    ISP_EQUIPMENT: 15,      // 15% annual ROI for ISP equipment
    INFRASTRUCTURE: 12,     // 12% annual ROI for infrastructure
    TECHNOLOGY: 20,         // 20% annual ROI for technology investments
  },
  
  // Profit margin benchmarks
  PROFIT_MARGINS: {
    EXCELLENT: 30,          // > 30% profit margin
    GOOD: 20,              // 20-30% profit margin
    AVERAGE: 10,           // 10-20% profit margin
    POOR: 5,               // 5-10% profit margin
    // < 5% = NEGATIVE
  },
  
  // Customer metrics
  CUSTOMER_METRICS: {
    ACQUISITION_COST: 50,   // $50 average customer acquisition cost
    LIFETIME_VALUE: 1200,   // $1200 average customer lifetime value
    CHURN_RATE: 5,          // 5% monthly churn rate benchmark
  },
} as const;

// Alert thresholds
export const ALERT_THRESHOLDS = {
  // ROI alerts
  ROI_DECLINE: -5,            // Alert if ROI drops by 5%
  ROI_CRITICAL: -10,          // Critical alert if ROI drops by 10%
  
  // Cost alerts
  COST_SPIKE: 20,             // Alert if costs increase by 20%
  MAINTENANCE_OVERDUE: 90,    // Alert if maintenance overdue by 90 days
  
  // Revenue alerts
  REVENUE_DROP: -10,          // Alert if revenue drops by 10%
  PROFIT_MARGIN_LOW: 5,       // Alert if profit margin below 5%
  
  // Partnership alerts
  OWNERSHIP_IMBALANCE: 5,     // Alert if ownership doesn't sum to 100% ± 5%
  UNPAID_SHARES: 30,          // Alert if shares unpaid for 30+ days
} as const;

// Calculation timeouts (milliseconds)
export const CALCULATION_TIMEOUTS = {
  SIMPLE_CALCULATION: 1000,   // 1 second for simple calculations
  COMPLEX_ANALYSIS: 5000,     // 5 seconds for complex analysis
  BULK_OPERATIONS: 30000,     // 30 seconds for bulk operations
  REPORT_GENERATION: 60000,   // 60 seconds for report generation
} as const;

// Cache settings for financial data
export const CACHE_CONFIG = {
  // Cache TTL (seconds)
  ROI_CALCULATIONS: 3600,     // 1 hour
  PROFIT_DISTRIBUTIONS: 1800, // 30 minutes
  PARTNERSHIP_STATS: 900,     // 15 minutes
  EQUIPMENT_METRICS: 600,     // 10 minutes
  
  // Cache keys
  CACHE_KEYS: {
    ROI_PREFIX: 'roi:',
    PROFIT_PREFIX: 'profit:',
    PARTNERSHIP_PREFIX: 'partnership:',
    EQUIPMENT_PREFIX: 'equipment:',
  } as const,
} as const;

// API rate limits
export const RATE_LIMITS = {
  CALCULATIONS_PER_MINUTE: 100,       // Max calculations per minute per user
  REPORTS_PER_HOUR: 10,               // Max reports per hour per user
  BULK_OPERATIONS_PER_DAY: 5,         // Max bulk operations per day per user
} as const;

// Error codes for financial operations
export const ERROR_CODES = {
  INVALID_OWNERSHIP: 'INVALID_OWNERSHIP',
  INSUFFICIENT_PROFIT: 'INSUFFICIENT_PROFIT',
  CALCULATION_TIMEOUT: 'CALCULATION_TIMEOUT',
  INVALID_DATE_RANGE: 'INVALID_DATE_RANGE',
  EQUIPMENT_NOT_FOUND: 'EQUIPMENT_NOT_FOUND',
  PARTNERSHIP_NOT_FOUND: 'PARTNERSHIP_NOT_FOUND',
  DISTRIBUTION_FAILED: 'DISTRIBUTION_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PROFIT_DISTRIBUTED: 'Profit successfully distributed to partners',
  PARTNERSHIP_CREATED: 'Partnership created successfully',
  EQUIPMENT_COST_UPDATED: 'Equipment cost updated successfully',
  ROI_CALCULATED: 'ROI calculation completed successfully',
} as const;

// Default values for optional parameters
export const DEFAULT_VALUES = {
  PAGINATION_LIMIT: 10,
  ANALYSIS_PERIOD_MONTHS: 12,
  DEPRECIATION_METHOD: DEPRECIATION_CONFIG.METHODS.STRAIGHT_LINE,
  CURRENCY: CURRENCY_CONFIG.DEFAULT_CURRENCY,
  PARTNER_ROLE: 'PARTNER' as const,
  DISTRIBUTION_STATUS: 'CALCULATED' as const,
} as const;

// Type definitions for constants
export type ROIThreshold = keyof typeof ROI_THRESHOLDS;
export type SupportedCurrency = typeof CURRENCY_CONFIG.SUPPORTED_CURRENCIES[number];
export type DepreciationMethod = keyof typeof DEPRECIATION_CONFIG.METHODS;
export type FinancialEquipmentType = keyof typeof DEPRECIATION_CONFIG.DEFAULT_RATES;
export type PartnerRoleType = keyof typeof PARTNERSHIP_CONFIG.ROLE_OWNERSHIP_RANGES;
export type FinancialErrorCode = keyof typeof ERROR_CODES;