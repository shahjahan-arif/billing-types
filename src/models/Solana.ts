export interface SolanaWallet {
  address: string;
  providerId: string;
}

/**
 * Verify Transaction Input (for tRPC router)
 */
export interface VerifyTransactionInput {
  signature: string;
  amount: number;
  expectedWallet: string;
}

/**
 * Verify Transaction Options (for Solana client)
 */
export interface VerifyTransactionOptions {
  signature: string;
  expectedAmount?: number; // in SOL
  expectedRecipient?: string;
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

/**
 * Token information
 */
export interface TokenInfo {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  icon?: string;
}

/**
 * Supported token for payments
 */
export interface SupportedToken {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  icon?: string;
  isActive: boolean;
}

/**
 * Pending withdrawal information
 */
export interface PendingWithdrawal {
  id: string;
  escrowAddress: string;
  escrowId: number;
  amount: string;
  tokenMint: string;
  tokenSymbol: string;
  usdAmount: number;
  customerWallet: string;
  providerWallet: string;
  depositedAt: Date;
  expiresAt: Date;
  canWithdraw: boolean;
  daysRemaining: number;
  totalCryptoAmount: string;
  totalUsdAmount: number;
  escrowCount: number;
}

/**
 * Crypto amount calculation result
 */
export interface CryptoAmountCalculation {
  cryptoAmount: string;
  exchangeRate: number;
  usdAmount: number;
  tokenSymbol: string;
}

/**
 * Payment instructions for customer
 */
export interface PaymentInstructions {
  escrowAddress: string;
  amount: string;
  tokenMint: string;
  instructions: string;
  transaction: string;
  expiresAt: Date;
}

/**
 * Escrow account information
 */
export interface EscrowInfo {
  address: string;
  escrowId: number;
  customer: string;
  provider: string;
  amount: string;
  tokenMint: string;
  status: string;
  depositedAt: Date;
  expiresAt: Date;
}

/**
 * Wallet balance information
 */
export interface WalletBalance {
  address: string;
  balance: number;
  symbol: string;
}

/**
 * Solana RPC connection status
 */
export interface SolanaConnectionStatus {
  connected: boolean;
  cluster: string;
  blockHeight: number;
}

/**
 * Event listener status
 */
export interface EventListenerStatus {
  isRunning: boolean;
  subscriptionId: number | null;
  processedCount: number;
}

/**
 * Solana Transaction Details (from blockchain)
 * Complete transaction information with confirmation status
 */
export interface SolanaTransactionDetails {
  signature: string;
  slot: number;
  blockTime: number | null;
  confirmationStatus: 'processed' | 'confirmed' | 'finalized';
  amount: number; // in SOL
  from: string;
  to: string;
  fee: number; // in SOL
  success: boolean;
}

/**
 * Solana Transaction Signature
 * Transaction signature with metadata from RPC
 */
export interface SolanaTransactionSignature {
  signature: string;
  slot: number;
  blockTime: number | null;
  confirmationStatus: 'processed' | 'confirmed' | 'finalized';
  err: any;
}

/**
 * Solana Wallet Info
 * Wallet information with balance and network
 */
export interface SolanaWalletInfo {
  address: string;
  balance: number; // in SOL
  network: 'mainnet-beta' | 'testnet' | 'devnet';
}

/**
 * Verify Transaction Result (from integration)
 * Result of transaction verification with details
 */
export interface VerifyTransactionResult {
  valid: boolean;
  transaction?: SolanaTransactionDetails;
  error?: string;
}

/**
 * Escrow Reference Attributes
 * Database model attributes for escrow references
 */
export interface EscrowReferenceAttributes {
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
  status: 'ACTIVE' | 'WITHDRAWN' | 'REFUNDED' | 'EXPIRED';
  transactionSignature: string;
  depositedAt: Date;
  withdrawnAt?: Date | null;
  refundedAt?: Date | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
