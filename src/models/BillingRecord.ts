import { BillingStatus, Currency } from '../enums';
import { UserPublic } from './User';

export interface BillingRecord {
  id: string;
  userId: string;
  billingMonth: string; // 'YYYY-MM'
  amount: number;
  currency: Currency;
  previousBalance: number;
  totalDue: number;
  amountPaid: number;
  remainingBalance: number;
  status: BillingStatus;
  dueDate: Date;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingRecordWithUser extends BillingRecord {
  user: UserPublic;
}

export interface CreateBillingRecordInput {
  userId: string;
  billingMonth: string;
  amount: number;
  currency?: Currency; // Optional, defaults to provider's preferred currency
  dueDate: Date;
}

export interface BillingRecordListQuery {
  userId?: string;
  startMonth?: string;
  endMonth?: string;
  status?: BillingStatus;
  page?: number;
  limit?: number;
}

export interface BillingRecordListResponse {
  records: BillingRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface GenerateProviderBillsResponse {
  generated: number;
  bills: BillingRecord[];
  message: string;
}
