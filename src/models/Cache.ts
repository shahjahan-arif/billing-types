/**
 * Cache metrics interface
 */
export interface CacheMetrics {
  // Hit/Miss metrics
  hits: number;
  misses: number;
  hitRate: number;
  missRate: number;

  // Memory metrics
  totalKeys: number;
  memoryUsed: string;
  memoryUsedBytes: number;

  // Performance metrics
  avgResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;

  // Timestamp
  timestamp: Date;
}

/**
 * Cache alert types
 */
export type CacheAlertType = 'LOW_HIT_RATE' | 'HIGH_MEMORY' | 'HIGH_MISS_RATE' | 'SLOW_RESPONSE';
export type CacheAlertSeverity = 'WARNING' | 'CRITICAL';

/**
 * Cache alert interface
 */
export interface CacheAlert {
  type: CacheAlertType;
  severity: CacheAlertSeverity;
  message: string;
  value: number;
  threshold: number;
  timestamp: Date;
}

/**
 * Cache monitoring configuration
 */
export interface CacheMonitoringConfig {
  hitRateThreshold: number;
  memoryThreshold: number;
  responseTimeThreshold: number;
  alertEnabled: boolean;
}
