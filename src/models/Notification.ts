import { NotificationType, NotificationChannel, NotificationStatus } from '../enums';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  data: Record<string, any> | null;
  isRead: boolean;
  sentAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
}

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  data?: Record<string, any>;
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
  isRead?: boolean;
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
