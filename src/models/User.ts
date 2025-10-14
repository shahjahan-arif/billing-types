import { UserRole, UserStatus } from '../enums';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  solanaWallet?: string | null;
  status: UserStatus;
  providerId?: string | null;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Public user (without sensitive fields)
export interface UserPublic extends Omit<User, 'password' | 'twoFactorSecret' | 'resetToken' | 'resetTokenExpiry'> {}

// Create user input
export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  providerId?: string;
}

// Update user input
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: UserStatus;
}

// Login input
export interface LoginInput {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  user: UserPublic;
  sessionToken: string;
}

// Password reset request
export interface PasswordResetRequestInput {
  email: string;
}

// Password reset
export interface PasswordResetInput {
  token: string;
  newPassword: string;
}
