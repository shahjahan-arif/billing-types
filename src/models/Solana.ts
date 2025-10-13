export interface SolanaWallet {
  address: string;
  providerId: string;
}

export interface VerifyTransactionInput {
  signature: string;
  amount: number;
  expectedWallet: string;
}

export interface VerifyTransactionResponse {
  isValid: boolean;
  amount: number;
  from: string;
  to: string;
  timestamp: Date;
  confirmations: number;
}

export interface SolanaTransaction {
  signature: string;
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  status: 'confirmed' | 'pending' | 'failed';
}

export interface SolanaTransactionListQuery {
  walletAddress: string;
  limit?: number;
}

export interface SolanaTransactionListResponse {
  transactions: SolanaTransaction[];
  total: number;
}
