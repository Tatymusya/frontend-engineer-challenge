/**
 * Notifications widget utility functions
 */
import type { Notification } from '../model/types';

export const createNotification = (
  title: string,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info',
  actionUrl?: string
): Notification => {
  return {
    id: generateId(),
    title,
    message,
    type,
    timestamp: new Date(),
    isRead: false,
    actionUrl
  };
};

export const markAsRead = (notifications: Notification[], id: string): Notification[] => {
  return notifications.map(notification =>
    notification.id === id ? { ...notification, isRead: true } : notification
  );
};

export const deleteNotification = (notifications: Notification[], id: string): Notification[] => {
  return notifications.filter(notification => notification.id !== id);
};

export const clearAllNotifications = (notifications: Notification[]): Notification[] => {
  return [];
};

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(notification => !notification.isRead).length;
};

export const filterNotifications = (
  notifications: Notification[],
  filter: Partial<{ type: string; isRead: boolean }>
): Notification[] => {
  return notifications.filter(notification => {
    if (filter.type && notification.type !== filter.type) {
      return false;
    }
    if (filter.isRead !== undefined && notification.isRead !== filter.isRead) {
      return false;
    }
    return true;
  });
};

export const sortNotificationsByDate = (
  notifications: Notification[],
  order: 'asc' | 'desc' = 'desc'
): Notification[] => {
  return [...notifications].sort((a, b) => {
    if (order === 'desc') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
    return a.timestamp.getTime() - b.timestamp.getTime();
  });
};

export const groupNotificationsByDay = (notifications: Notification[]): Record<string, Notification[]> => {
  const grouped: Record<string, Notification[]> = {};
  
  notifications.forEach(notification => {
    const date = formatDate(notification.timestamp);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(notification);
  });
  
  return grouped;
};

export const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today';
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }
};

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
};