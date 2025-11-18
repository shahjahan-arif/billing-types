import { TicketStatus, TicketPriority, TicketCategory } from '../enums';
import { UserPublic } from './User';

export interface Ticket {
  id: string;
  userId: string;
  assignedTo?: string | null;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketWithRelations extends Ticket {
  user: UserPublic;
  assignee?: UserPublic | null;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  attachmentUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessageWithUser extends TicketMessage {
  user: UserPublic;
}

export interface CreateTicketInput {
  subject: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
}

export interface UpdateTicketStatusInput {
  id: string;
  status: TicketStatus;
}

export interface AssignTicketInput {
  id: string;
  assignedTo: string;
}

export interface AddTicketMessageInput {
  ticketId: string;
  message: string;
  attachmentUrl?: string;
}

export interface TicketListQuery {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export interface TicketListResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
}
