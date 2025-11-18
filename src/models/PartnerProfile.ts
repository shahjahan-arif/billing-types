import { BankingDetails, NotificationPreferences } from './PartnerAuth';
import { User } from './User';
import { Partnership } from './Partnership';

/**
 * Partner profile for non-customer partners
 */
export interface PartnerProfile {
  /** Profile unique identifier */
  id: string;
  /** Partner email address (unique) */
  email: string;
  /** Hashed password for non-customer partners */
  password?: string;
  /** Partner first name */
  firstName?: string;
  /** Partner last name */
  lastName?: string;
  /** Partner phone number */
  phone?: string;
  /** Partner address */
  address?: string;
  /** Banking details for payments */
  bankingDetails?: BankingDetails;
  /** Notification preferences */
  notificationPreferences?: NotificationPreferences;
  /** Whether partner is also a customer */
  isCustomer: boolean;
  /** Customer ID if partner is also customer (nullable) */
  customerId?: string | null;
  /** Profile creation timestamp */
  createdAt: Date;
  /** Profile last update timestamp */
  updatedAt: Date;
}

/**
 * Input for creating new partner profile
 */
export interface CreatePartnerProfileInput {
  /** Partner email address */
  email: string;
  /** Hashed password for non-customer partners */
  password?: string;
  /** Partner first name */
  firstName?: string;
  /** Partner last name */
  lastName?: string;
  /** Partner phone number */
  phone?: string;
  /** Partner address */
  address?: string;
  /** Whether partner is also a customer */
  isCustomer: boolean;
  /** Customer ID if partner is customer */
  customerId?: string | null;
}

// UpdatePartnerProfileInput is imported from PartnerAuth.ts to avoid duplication

/**
 * Partner profile with customer relationship populated
 */
export interface PartnerProfileWithCustomer extends PartnerProfile {
  /** Customer data if partner is customer */
  customer?: User;
}

/**
 * Partner profile with partnerships populated
 */
export interface PartnerProfileWithPartnerships extends PartnerProfile {
  /** Partner's partnerships */
  partnerships?: Partnership[];
}

/**
 * Complete partner profile with all relationships
 */
export interface PartnerProfileWithRelations extends PartnerProfile {
  /** Customer data if partner is customer */
  customer?: User;
  /** Partner's partnerships */
  partnerships?: Partnership[];
}