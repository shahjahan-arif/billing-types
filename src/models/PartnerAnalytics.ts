/**
 * Partner Analytics Types
 * 
 * Comprehensive TypeScript types for partner analytics data, performance metrics,
 * trend analysis, and benchmarking. Provides type safety for complex analytics
 * calculations and statistical analysis across all packages.
 * 
 * @fileoverview Partner analytics and performance type definitions
 * @version 1.0.0
 */

import { TrendDataPoint } from '../utils/FinancialTypes';

/**
 * Complete partner analytics data
 * 
 * Comprehensive analytics structure containing all performance metrics,
 * trends, and comparison data for a partner's portfolio analysis.
 * 
 * @example
 * ```typescript
 * const analytics: PartnerAnalyticsData = {
 *   overview: { totalEarnings: 45000, averageROI: 15.2, ... },
 *   performance: { consistencyScore: 85, riskScore: 25, ... },
 *   trends: { earningsTrend: [...], monthlyGrowth: 8.5, ... },
 *   comparisons: { industryBenchmark: {...}, peerComparison: {...}, ... }
 * };
 * ```
 */
export interface PartnerAnalyticsData {
    /** Overview metrics for dashboard */
    overview: PartnerOverviewMetrics;
    /** Performance metrics and analysis */
    performance: PartnerPerformanceMetrics;
    /** Trend data and growth analysis */
    trends: PartnerTrendData;
    /** Comparison with benchmarks */
    comparisons: PartnerComparisonData;
}

/**
 * Partner overview metrics
 * 
 * High-level summary metrics for partner dashboard display.
 * Provides key performance indicators at a glance.
 * 
 * @example
 * ```typescript
 * const overview: PartnerOverviewMetrics = {
 *   totalEarnings: 45000.00,
 *   totalInvestment: 25000.00,
 *   averageROI: 18.5,
 *   activePartnerships: 3,
 *   totalDistributions: 24,
 *   averageMonthlyEarnings: 3750.00
 * };
 * ```
 */
export interface PartnerOverviewMetrics {
    /** Total earnings across all partnerships */
    totalEarnings: number;
    /** Total investment amount */
    totalInvestment: number;
    /** Average ROI percentage */
    averageROI: number;
    /** Number of active partnerships */
    activePartnerships: number;
    /** Total number of distributions received */
    totalDistributions: number;
    /** Average monthly earnings */
    averageMonthlyEarnings: number;
}

/**
 * Partner performance metrics
 * 
 * Detailed performance analysis including best/worst performing partnerships,
 * consistency scoring, and risk assessment metrics.
 * 
 * @example
 * ```typescript
 * const performance: PartnerPerformanceMetrics = {
 *   bestPerformingPartnership: {
 *     id: 'ps1',
 *     companyName: 'TechCorp ISP',
 *     roi: 25.8,
 *     totalEarnings: 18000.00
 *   },
 *   worstPerformingPartnership: {
 *     id: 'ps3',
 *     companyName: 'LocalNet',
 *     roi: 8.2,
 *     totalEarnings: 5500.00
 *   },
 *   consistencyScore: 78,
 *   riskScore: 32
 * };
 * ```
 */
export interface PartnerPerformanceMetrics {
    /** Best performing partnership */
    bestPerformingPartnership: {
        /** Partnership unique identifier */
        id: string;
        /** Company name */
        companyName: string;
        /** ROI percentage */
        roi: number;
        /** Total earnings from this partnership */
        totalEarnings: number;
    };
    /** Worst performing partnership */
    worstPerformingPartnership: {
        /** Partnership unique identifier */
        id: string;
        /** Company name */
        companyName: string;
        /** ROI percentage */
        roi: number;
        /** Total earnings from this partnership */
        totalEarnings: number;
    };
    /** Consistency score (0-100) based on earnings stability */
    consistencyScore: number;
    /** Risk score (0-100) based on investment diversification */
    riskScore: number;
}

/**
 * Partner trend data
 * 
 * Time-series analysis of partner performance including earnings,
 * ROI, and investment trends with growth rate calculations.
 * 
 * @example
 * ```typescript
 * const trends: PartnerTrendData = {
 *   earningsTrend: [
 *     { period: '2025-08', value: 3200.00, change: 8.5 },
 *     { period: '2025-09', value: 3500.00, change: 9.4 },
 *     { period: '2025-10', value: 3800.00, change: 8.6 }
 *   ],
 *   roiTrend: [...],
 *   investmentTrend: [...],
 *   monthlyGrowth: 8.8,
 *   quarterlyGrowth: 25.2,
 *   yearlyGrowth: 18.7
 * };
 * ```
 */
export interface PartnerTrendData {
    /** Earnings trend over time */
    earningsTrend: TrendDataPoint[];
    /** ROI trend over time */
    roiTrend: TrendDataPoint[];
    /** Investment trend over time */
    investmentTrend: TrendDataPoint[];
    /** Monthly growth percentage */
    monthlyGrowth: number;
    /** Quarterly growth percentage */
    quarterlyGrowth: number;
    /** Yearly growth percentage */
    yearlyGrowth: number;
}

/**
 * Partner comparison data
 * 
 * Benchmarking and comparison metrics including industry averages,
 * peer comparisons, and portfolio health assessment.
 * 
 * @example
 * ```typescript
 * const comparisons: PartnerComparisonData = {
 *   industryBenchmark: {
 *     averageROI: 12.5,
 *     averageMonthlyEarnings: 2800.00
 *   },
 *   peerComparison: {
 *     percentile: 78,
 *     aboveAverage: true
 *   },
 *   portfolioHealth: {
 *     diversificationScore: 85,
 *     riskLevel: 'MEDIUM',
 *     recommendations: ['Consider diversifying into new sectors', 'Increase investment in top performers']
 *   }
 * };
 * ```
 */
export interface PartnerComparisonData {
    /** Industry benchmark comparison */
    industryBenchmark: {
        /** Industry average ROI */
        averageROI: number;
        /** Industry average monthly earnings */
        averageMonthlyEarnings: number;
    };
    /** Peer comparison metrics */
    peerComparison: {
        /** Percentile ranking (0-100) */
        percentile: number;
        /** Whether above average performance */
        aboveAverage: boolean;
    };
    /** Portfolio health assessment */
    portfolioHealth: {
        /** Diversification score (0-100) */
        diversificationScore: number;
        /** Risk level assessment */
        riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
        /** Improvement recommendations */
        recommendations: string[];
    };
}

/**
 * Statistical analysis of partner performance
 * 
 * Advanced statistical metrics for deep performance analysis
 * including variance, standard deviation, and distribution analysis.
 * 
 * @example
 * ```typescript
 * const statistics: PartnerStatistics = {
 *   meanEarnings: 3750.00,
 *   medianEarnings: 3600.00,
 *   standardDeviation: 485.20,
 *   variance: 235419.04,
 *   coefficientOfVariation: 0.129
 * };
 * ```
 */
export interface PartnerStatistics {
    /** Mean earnings per month */
    meanEarnings: number;
    /** Median earnings per month */
    medianEarnings: number;
    /** Standard deviation of earnings */
    standardDeviation: number;
    /** Variance in earnings */
    variance: number;
    /** Coefficient of variation */
    coefficientOfVariation: number;
}

/**
 * Risk analysis metrics
 * 
 * Advanced risk assessment calculations including Value at Risk,
 * Sharpe ratio, and other financial risk indicators.
 * 
 * @example
 * ```typescript
 * const riskAnalysis: PartnerRiskAnalysis = {
 *   valueAtRisk: 1250.00,
 *   maxDrawdown: 15.8,
 *   sharpeRatio: 1.85,
 *   beta: 0.92,
 *   alpha: 3.2
 * };
 * ```
 */
export interface PartnerRiskAnalysis {
    /** Value at Risk (VaR) calculation */
    valueAtRisk: number;
    /** Maximum drawdown percentage */
    maxDrawdown: number;
    /** Sharpe ratio for risk-adjusted returns */
    sharpeRatio: number;
    /** Beta coefficient relative to market */
    beta: number;
    /** Alpha generation capability */
    alpha: number;
}

/**
 * Partner earnings forecast
 * 
 * Predictive analytics for future earnings with confidence intervals
 * and methodology transparency for forecasting accuracy.
 * 
 * @example
 * ```typescript
 * const forecast: PartnerForecast = {
 *   forecastedEarnings: [
 *     { period: '2025-11', value: 3950.00, change: 4.2 },
 *     { period: '2025-12', value: 4100.00, change: 3.8 }
 *   ],
 *   confidenceInterval: {
 *     lower: 3200.00,
 *     upper: 4800.00,
 *     confidenceLevel: 95
 *   },
 *   methodology: 'EXPONENTIAL_SMOOTHING'
 * };
 * ```
 */
export interface PartnerForecast {
    /** Forecasted earnings for next 12 months */
    forecastedEarnings: TrendDataPoint[];
    /** Confidence interval for forecasts */
    confidenceInterval: {
        /** Lower bound of confidence interval */
        lower: number;
        /** Upper bound of confidence interval */
        upper: number;
        /** Confidence level percentage */
        confidenceLevel: number;
    };
    /** Forecast methodology used */
    methodology: 'LINEAR_REGRESSION' | 'MOVING_AVERAGE' | 'EXPONENTIAL_SMOOTHING';
}