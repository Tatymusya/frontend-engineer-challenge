<template>
  <div 
    class="notification-item" 
    :class="{ 
      unread: !notification.isRead,
      [notification.type]: notification.type 
    }"
  >
    <div class="notification-icon">
      <i :class="getIconClass(notification.type)"></i>
    </div>
    
    <div class="notification-content">
      <div class="notification-header">
        <h4>{{ notification.title }}</h4>
        <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
      </div>
      <p class="notification-message">{{ notification.message }}</p>
      
      <div class="notification-actions">
        <button 
          v-if="!notification.isRead" 
          class="mark-read-btn" 
          @click="markAsRead"
        >
          Mark as read
        </button>
        <button class="delete-btn" @click="deleteNotification">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Notification } from '../model/types';

interface Props {
  notification: Notification;
}

const props = defineProps<Props>();

const emit = defineEmits(['markAsRead', 'deleteNotification']);

const getIconClass = (type: string) => {
  switch (type) {
    case 'info':
      return 'icon-info';
    case 'success':
      return 'icon-check-circle';
    case 'warning':
      return 'icon-warning';
    case 'error':
      return 'icon-exclamation';
    default:
      return 'icon-bell';
  }
};

const formatTime = (timestamp: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const markAsRead = () => {
  emit('markAsRead', props.notification.id);
};

const deleteNotification = () => {
  emit('deleteNotification', props.notification.id);
};
</script>

<style scoped>
.notification-item {
  display: flex;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #edf2f7;
  position: relative;
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #4299e1;
}

.notification-item.info {
  border-left: 4px solid #63b3ed;
}

.notification-item.success {
  border-left: 4px solid #48bb78;
}

.notification-item.warning {
  border-left: 4px solid #ecc94b;
}

.notification-item.error {
  border-left: 4px solid #f56565;
}

.notification-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
  color: #718096;
}

.notification-content {
  flex: 1;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.notification-header h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
}

.notification-time {
  font-size: 0.75rem;
  color: #a0aec0;
}

.notification-message {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: #4a5568;
  line-height: 1.4;
}

.notification-actions {
  display: flex;
  gap: 0.5rem;
}

.mark-read-btn, .delete-btn {
  background: none;
  border: 1px solid #e2e8f0;
  color: #718096;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.mark-read-btn:hover {
  background-color: #ebf8ff;
  border-color: #63b3ed;
  color: #2c5282;
}

.delete-btn:hover {
  background-color: #fed7d7;
  border-color: #fc8181;
  color: #c53030;
}
</style>