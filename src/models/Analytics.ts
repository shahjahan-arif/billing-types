export interface RevenueTrend {
  month: string; // 'YYYY-MM'
  totalRevenue: number;
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
}

export interface RevenueTrendsQuery {
  startDate: Date;
  endDate: Date;
  providerId?: string;
}

export interface RevenueTrendsResponse {
  trends: RevenueTrend[];
  summary: {
    totalRevenue: number;
    totalCollected: number;
    totalPending: number;
    collectionRate: number; // percentage
  };
}

export interface PaymentBehavior {
  onTimePayments: number;
  latePayments: number;
  averageDaysLate: number;
  totalCustomers: number;
  activeCustomers: number;
  suspendedCustomers: number;
}

export interface AreaComparison {
  areaName: string;
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  collectionRate: number;
}

export interface ProviderPerformance {
  providerId: string;
  providerName: string;
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  collectionRate: number;
  averageResponseTime: number; // hours
}

export interface OverdueReport {
  userId: string;
  userName: string;
  email: string;
  phone: string;
  totalDue: number;
  daysOverdue: number;
  lastPaymentDate?: Date | null;
}

export interface OverdueReportQuery {
  providerId?: string;
  minDaysOverdue?: number;
}

export interface OverdueReportResponse {
  overdueAccounts: OverdueReport[];
  total: number;
  totalAmount: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  suspendedCustomers: number;
  totalRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
  overdueRevenue: number;
  collectionRate: number;
  recentPayments: number;
  pendingPayments: number;
  openTickets: number;
}
