export interface Email {
  id: string;
  email: string;
  status: EmailStatus;
  notes?: string | null;
  contactedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmailInput {
  email: string;
}

export interface UpdateEmailInput {
  status?: EmailStatus;
  notes?: string;
  contactedAt?: Date;
}

export interface SendEmailInput {
  emailId: string;
  subject: string;
  message: string;
}

export interface EmailFilters {
  status?: EmailStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  page: number;
  limit: number;
}

export enum EmailStatus {
  PENDING = 'PENDING',
  CONTACTED = 'CONTACTED',
  ARCHIVED = 'ARCHIVED',
}
