import { PaymentMethod, PaymentStatus } from '../enums';
import { UserPublic } from './User';
import { BillingRecord } from './BillingRecord';

export interface Payment {
  id: string;
  userId: string;
  billingRecordId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string | null;
  proofUrl?: string | null;
  proofHash?: string | null;
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
