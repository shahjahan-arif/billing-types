/**
 * Partner session for authentication management
 */
export interface PartnerSession {
  /** Session unique identifier */
  id: string;
  /** Partner email address */
  partnerEmail: string;
  /** Unique session token */
  sessionToken: string;
  /** Session expiration timestamp */
  expiresAt: Date;
  /** Session creation timestamp */
  createdAt: Date;
  /** Session last update timestamp */
  updatedAt: Date;
}

/**
 * Input for creating new partner session
 */
export interface CreatePartnerSessionInput {
  /** Partner email address */
  partnerEmail: string;
  /** Generated session token */
  sessionToken: string;
  /** Session expiration timestamp */
  expiresAt: Date;
}

/**
 * Partner login attempt for security tracking
 */
export interface PartnerLoginAttempt {
  /** Attempt unique identifier */
  id: string;
  /** Partner email address */
  email: string;
  /** IP address of login attempt */
  ipAddress?: string;
  /** Whether login attempt was successful */
  success: boolean;
  /** Timestamp of login attempt */
  attemptedAt: Date;
}

/**
 * Input for creating login attempt record
 */
export interface CreatePartnerLoginAttemptInput {
  /** Partner email address */
  email: string;
  /** IP address of attempt */
  ipAddress?: string;
  /** Success status of attempt */
  success: boolean;
}

/**
 * Session security information
 */
export interface PartnerSessionSecurity {
  /** Session token (should be hashed in storage) */
  sessionToken: string;
  /** Session expiration for cleanup */
  expiresAt: Date;
  /** Partner identification */
  partnerEmail: string;
}

/**
 * Security tracking for login attempts
 */
export interface PartnerSecurityLog {
  /** Partner email being accessed */
  email: string;
  /** IP address of attempt */
  ipAddress?: string;
  /** Success status */
  success: boolean;
  /** Timestamp for analysis */
  attemptedAt: Date;
}

/**
 * Base interface for partner entities with timestamps
 */
export interface BasePartnerEntity {
  /** Record creation timestamp */
  createdAt: Date;
  /** Record last update timestamp */
  updatedAt: Date;
}