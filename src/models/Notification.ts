import { NotificationType, NotificationChannel, NotificationStatus } from '../enums';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  sentAt: Date | null;
  readAt: Date | null;
  isRead?: boolean; // Computed property: true if readAt is not null
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  metadata?: Record<string, any>;
}

export interface SendBulkNotificationInput {
  groupId?: string;
  userIds?: string[];
  title: string;
  message: string;
  channels: NotificationChannel[];
}

export interface MarkAsReadInput {
  id: string;
}

export interface NotificationListQuery {
  status?: NotificationStatus;
  type?: NotificationType;
  page?: number;
  limit?: number;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
}
