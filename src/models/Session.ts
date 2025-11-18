export interface Session {
  id: string;
  userId: string;
  token: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
  lastActivityAt: Date;
  createdAt: Date;
}

export interface SessionPublic extends Omit<Session, 'token'> {
  isCurrent?: boolean;
}
