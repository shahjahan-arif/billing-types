import { NotificationType, NotificationChannel } from '../enums';

/**
 * Group Message Interface
 * Represents messages sent to groups or individual customers
 * Messages auto-expire after 24 days
 */
export interface GroupMessage {
  id: string;
  groupId: string | null;
  senderId: string;
  recipientId: string | null;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationChannel;
  isRead?: boolean; // Computed property: true if readAt is not null
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  deletedAt: Date | null;
}

/**
 * Group Message with Sender Details
 * Includes populated sender information
 */
export interface GroupMessageWithSender extends GroupMessage {
  sender: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Create Group Message Input
 * Either groupId or recipientId must be provided (not both)
 */
export interface CreateGroupMessageInput {
  groupId?: string;
  recipientId?: string;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationChannel;
  expiresAt?: Date; // Optional - defaults to 24 days from now
}

/**
 * Group Message Filters
 * For querying and filtering messages
 */
export interface GroupMessageFilters {
  groupId?: string;
  recipientId?: string;
  type?: NotificationType;
  channel?: NotificationChannel;
  page?: number;
  limit?: number;
}
