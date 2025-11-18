import { PaymentMethod, PaymentStatus, Currency } from '../enums';
import { UserPublic } from './User';
import { BillingRecord } from './BillingRecord';

export interface Payment {
  id: string;
  userId: string;
  billingRecordId: string;
  amount: number;
  currency: Currency;
  originalAmount?: number; // If converted from another currency
  originalCurrency?: Currency;
  exchangeRate?: number;
  paymentMethod: PaymentMethod;
  metadata?: Record<string, any> | null;
  transactionId?: string | null;
  proofUrl?: string | null;
  status: PaymentStatus;
  submittedAt: Date;
  verifiedAt?: Date | null;
  verifiedBy?: string | null;
  rejectionReason?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentWithRelations extends Payment {
  user: UserPublic;
  billingRecord: BillingRecord;
  verifier?: UserPublic | null;
}

export interface SubmitPaymentInput {
  billingRecordId: string;
  amount: number;
  currency?: Currency; // Optional, defaults to user's preferred currency
  paymentMethod: PaymentMethod;
  transactionId?: string;
  proofUrl?: string;
}

export interface VerifyPaymentInput {
  id: string;
  notes?: string;
}

export interface RejectPaymentInput {
  id: string;
  reason: string;
}

export interface PaymentListQuery {
  userId?: string;
  billingRecordId?: string;
  status?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface PaymentListResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
}

export interface UploadUrlRequest {
  fileName: string;
  fileType: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  fileUrl: string;
}

// Provider payment list with filters
export interface ProviderPaymentListQuery {
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  customerId?: string;
  billingMonth?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ProviderPaymentListResponse {
  payments: PaymentWithRelations[];
  total: number;
  page: number;
  limit: number;
  summary: {
    totalAmount: number;
    pendingCount: number;
    verifiedCount: number;
    rejectedCount: number;
    pendingAmount: number;
  };
}

// Update payment input
export interface UpdatePaymentInput {
  paymentId: string;
  amount?: number;
  status?: PaymentStatus;
  notes?: string;
  transactionId?: string;
  proofUrl?: string;
  rejectionReason?: string;
  updateReason?: string;
}

export interface UpdatePaymentResponse {
  payment: Payment;
  billingRecord: BillingRecord;
  message: string;
}

export interface SubmitPaymentForCustomerInput {
  customerId: string;
  billingRecordId: string;
  amount: number;
  currency?: Currency; // Optional, defaults to provider's preferred currency
  paymentMethod: PaymentMethod;
  transactionId?: string;
  notes?: string;
}
