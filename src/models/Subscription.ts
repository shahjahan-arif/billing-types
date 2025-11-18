/**
 * Subscription Types
 */

import { User } from './User';

export enum ServiceType {
  INTERNET = 'INTERNET',
  CABLE_TV = 'CABLE_TV',
  PHONE = 'PHONE',
  OTHER = 'OTHER',
}

export enum SubscriptionStatus {
  DRAFT = 'DRAFT',       // For bulk imported users before activation
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
}

export interface Subscription {
  id: string;
  userId: string;
  providerId: string;
  packageId?: string;
  monthlyRate: number;
  serviceType: ServiceType;
  startDate: Date;
  endDate?: Date;
  status: SubscriptionStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: User;
}

export interface CreateSubscriptionInput {
  userId: string;
  monthlyRate: number;
  serviceType: ServiceType;
  packageId?: string;
  notes?: string;
}

export interface UpdateSubscriptionRateInput {
  subscriptionId: string;
  monthlyRate: number;
}

export interface SubscriptionFilters {
  userId?: string;
  providerId?: string;
  status?: SubscriptionStatus;
  serviceType?: ServiceType;
}

export interface SubscriptionStats {
  total: number;
  draft: number;
  active: number;
  suspended: number;
  cancelled: number;
  monthlyRevenue: number;
}

export interface MonthlyTotalResponse {
  userId: string;
  monthlyTotal: number;
}
