import { PartnerRole } from '../enums/PartnershipRole';

/**
 * Input data for partner login
 */
export interface PartnerLoginInput {
  /** Partner email address */
  email: string;
  /** Partner password */
  password: string;
}

/**
 * Response data from successful partner login
 */
export interface PartnerLoginResponse {
  /** Login success status */
  success: boolean;
  /** Session token for authentication */
  sessionToken: string;
  /** Session expiration timestamp */
  expiresAt: Date;
  /** Complete partner data */
  partner: PartnerData;
}

/**
 * Input data for partner registration
 */
export interface PartnerRegistrationInput {
  /** Partner email address */
  email: string;
  /** Partner password */
  password: string;
  /** Partner first name */
  firstName: string;
  /** Partner last name */
  lastName: string;
  /** Optional phone number */
  phone?: string;
  /** Optional address */
  address?: string;
}

/**
 * Response data from partner registration
 */
export interface PartnerRegistrationResponse {
  /** Registration success status */
  success: boolean;
  /** Success or error message */
  message: string;
  /** Created partner ID */
  partnerId: string;
}

/**
 * Partner session data for verification
 */
export interface PartnerSessionData {
  /** Complete partner information */
  partner: PartnerData;
  /** Session information */
  session: {
    /** Session token */
    token: string;
    /** Session expiration */
    expiresAt: Date;
  };
}

/**
 * Complete partner data aggregation
 */
export interface PartnerData {
  /** Partner unique identifier */
  id: string;
  /** Partner email address */
  email: string;
  /** Partner first name */
  firstName: string;
  /** Partner last name */
  lastName: string;
  /** Optional phone number */
  phone?: string;
  /** Whether partner is also a customer */
  isCustomer: boolean;
  /** Array of partner's partnerships */
  partnerships: PartnerPartnershipSummary[];
  /** Total investment across all partnerships */
  totalInvestment: number;
  /** Total ownership percentage across partnerships */
  totalOwnership: number;
}

/**
 * Partnership summary for partner data
 */
export interface PartnerPartnershipSummary {
  /** Partnership unique identifier */
  id: string;
  /** Company unique identifier */
  companyId: string;
  /** Company name */
  companyName: string;
  /** Ownership percentage in this partnership */
  ownershipPercentage: number;
  /** Investment amount in this partnership */
  investmentAmount: number;
  /** Date partner joined this partnership */
  joinDate: Date;
  /** Partner role in this partnership */
  role: PartnerRole;
  /** Whether partnership is currently active */
  isActive: boolean;
}

/**
 * Banking details for partner payments
 */
export interface BankingDetails {
  /** Bank name */
  bankName: string;
  /** Account number */
  accountNumber: string;
  /** Bank routing number */
  routingNumber: string;
  /** Account holder name */
  accountHolderName: string;
}

/**
 * Partner notification preferences
 */
export interface NotificationPreferences {
  /** Enable email notifications */
  emailNotifications: boolean;
  /** Enable SMS notifications */
  smsNotifications: boolean;
  /** Enable distribution alerts */
  distributionAlerts: boolean;
  /** Enable monthly reports */
  monthlyReports: boolean;
}

/**
 * Input for updating partner profile
 * Uses utility types to avoid duplication
 */
export interface UpdatePartnerProfileInput
  extends Partial<Pick<PartnerData, 'firstName' | 'lastName' | 'phone'>> {
  /** Optional password update */
  password?: string;
  /** Optional address update */
  address?: string;
  /** Optional customer ID update */
  customerId?: string | null;
  /** Optional isCustomer flag update */
  isCustomer?: boolean;
  /** Optional banking details update */
  bankingDetails?: BankingDetails;
  /** Optional notification preferences update */
  notificationPreferences?: NotificationPreferences;
}