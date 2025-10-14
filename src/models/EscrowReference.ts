import { Payment } from './Payment';
import { BillingRecord } from './BillingRecord';

export enum EscrowStatus {
  ACTIVE = 'ACTIVE',
  WITHDRAWN = 'WITHDRAWN',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}

export interface EscrowReference {
  id: string;
  escrowAddress: string;
  escrowId: number;
  paymentId: string;
  billingRecordId: string;
  customerWallet: string;
  providerWallet: string;
  tokenMint: string;
  cryptoAmount: string;
  usdAmount: number;
  exchangeRate: number;
  adminFee: string;
  status: EscrowStatus;
  transactionSignature: string;
  depositedAt: Date;
  withdrawnAt?: Date | null;
  refundedAt?: Date | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EscrowReferenceWithRelations extends EscrowReference {
  payment: Payment;
  billingRecord: BillingRecord;
}

export interface CreateEscrowReferenceInput {
  escrowAddress: string;
  escrowId: number;
  paymentId: string;
  billingRecordId: string;
  customerWallet: string;
  providerWallet: string;
  tokenMint: string;
  cryptoAmount: string;
  usdAmount: number;
  exchangeRate: number;
  adminFee: string;
  transactionSignature: string;
  depositedAt: Date;
  expiresAt: Date;
}

export interface UpdateEscrowStatusInput {
  escrowAddress: string;
  status: EscrowStatus;
  withdrawnAt?: Date;
  refundedAt?: Date;
}

export interface EscrowListQuery {
  customerWallet?: string;
  providerWallet?: string;
  status?: EscrowStatus;
  page?: number;
  limit?: number;
}

export interface EscrowListResponse {
  escrows: EscrowReference[];
  total: number;
  page: number;
  limit: number;
}
