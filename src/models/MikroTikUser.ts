import { MikroTikStatus } from '../enums';

export interface MikroTikUser {
  id: string;
  userId: string;
  username: string;
  password: string;
  routerId: string;
  ipAddress?: string | null;
  macAddress?: string | null;
  profile: string;
  monthlyRate: number;
  status: MikroTikStatus;
  lastSync: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MikroTikUserPublic extends Omit<MikroTikUser, 'password'> {}

export interface SyncUsersInput {
  routerId: string;
}

export interface EnableUserInput {
  userId: string;
}

export interface DisableUserInput {
  userId: string;
}

export interface ThrottleBandwidthInput {
  userId: string;
  uploadSpeed: string;  // e.g., '1M'
  downloadSpeed: string; // e.g., '5M'
}

export interface ConnectionStatus {
  isOnline: boolean;
  ipAddress?: string;
  connectedAt?: Date;
  bytesUploaded?: number;
  bytesDownloaded?: number;
}

export interface BandwidthUsage {
  userId: string;
  startDate: Date;
  endDate: Date;
  totalUploaded: number;
  totalDownloaded: number;
  sessions: BandwidthSession[];
}

export interface BandwidthSession {
  connectedAt: Date;
  disconnectedAt?: Date;
  duration: number; // seconds
  bytesUploaded: number;
  bytesDownloaded: number;
}
