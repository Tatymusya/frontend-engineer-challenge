export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  userId?: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface NotificationFilter {
  type?: 'info' | 'success' | 'warning' | 'error';
  isRead?: boolean;
  limit?: number;
  offset?: number;
}