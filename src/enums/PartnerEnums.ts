/**
 * Partner account status
 */
export enum PartnerStatus {
  /** Active partner account */
  ACTIVE = 'ACTIVE',
  /** Inactive partner account */
  INACTIVE = 'INACTIVE',
  /** Suspended partner account */
  SUSPENDED = 'SUSPENDED',
  /** Pending verification */
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

/**
 * Partner notification types
 */
export enum PartnerNotificationType {
  /** New profit distribution available */
  DISTRIBUTION_AVAILABLE = 'DISTRIBUTION_AVAILABLE',
  /** Payment received confirmation */
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  /** Partnership information updated */
  PARTNERSHIP_UPDATE = 'PARTNERSHIP_UPDATE',
  /** Monthly earnings report */
  MONTHLY_REPORT = 'MONTHLY_REPORT',
  /** System-wide announcement */
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  /** Profile update required */
  PROFILE_UPDATE_REQUIRED = 'PROFILE_UPDATE_REQUIRED',
}

/**
 * Partner session status
 */
export enum PartnerSessionStatus {
  /** Active session */
  ACTIVE = 'ACTIVE',
  /** Expired session */
  EXPIRED = 'EXPIRED',
  /** Manually revoked session */
  REVOKED = 'REVOKED',
}

/**
 * Partner access level
 */
export enum PartnerAccessLevel {
  /** Read-only access */
  READ_ONLY = 'READ_ONLY',
  /** Standard access */
  STANDARD = 'STANDARD',
  /** Premium access with advanced features */
  PREMIUM = 'PREMIUM',
}