import { PartnerRole, DistributionStatus, ShareStatus } from '../enums';
import { UserPublic } from './User';

export interface Partnership {
  id: string;
  companyId: string;
  partnerId: string;
  ownershipPercentage: number;
  role: PartnerRole;
  investmentAmount: number | null;
  joinDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnershipWithRelations extends Partnership {
  company: UserPublic;
  partner: UserPublic;
}

export interface CreatePartnershipInput {
  companyId: string;
  partnerEmail: string;
  ownershipPercentage: number;
  role?: PartnerRole;
  investmentAmount?: number;
  joinDate?: Date;
}

export interface AddPartnerInfoInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  ownershipPercentage: number;
  investmentAmount: number;
  role?: PartnerRole;
}

export interface UpdatePartnershipInput {
  ownershipPercentage?: number;
  role?: PartnerRole;
  investmentAmount?: number;
  isActive?: boolean;
}

export interface PartnershipSummary {
  totalPartners: number;
  activePartners: number;
  totalOwnership: number;
  totalInvestment: number;
  ownershipDistribution: {
    partnerId: string;
    partnerName: string;
    ownershipPercentage: number;
    role: string;
  }[];
}

export interface ProfitDistribution {
  id: string;
  companyId: string;
  month: string;
  totalRevenue: number;
  totalExpenses: number;
  equipmentCosts: number;
  operationalCosts: number;
  netProfit: number;
  distributionDate: Date;
  status: DistributionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerShare {
  id: string;
  distributionId: string;
  partnerId: string;
  shareAmount: number;
  percentage: number;
  status: ShareStatus;
  paidAt: Date | null;
  paymentMethod?: string;
  paymentReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerShareWithRelations extends PartnerShare {
  distribution: ProfitDistribution;
  partner: UserPublic;
}

export interface MonthlyProfitCalculation {
  month: string;
  totalRevenue: number;
  totalExpenses: number;
  equipmentCosts: number;
  operationalCosts: number;
  netProfit: number;
  partnerShares: {
    partnerId: string;
    partnerName: string;
    shareAmount: number;
    percentage: number;
  }[];
}

export interface DistributionHistoryFilters {
  month?: string;
  status?: DistributionStatus;
  page?: number;
  limit?: number;
}

export interface PartnerShareFilters {
  distributionId?: string;
  month?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}