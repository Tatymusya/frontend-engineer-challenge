<template>
  <div class="notification-panel" :class="{ open: isOpen }">
    <div class="panel-header">
      <h3>Notifications</h3>
      <button class="clear-all-btn" @click="clearAll" v-if="notifications.length > 0">
        Clear all
      </button>
    </div>
    
    <div class="panel-content">
      <div v-if="notifications.length === 0" class="empty-state">
        <p>No new notifications</p>
      </div>
      
      <div v-else class="notifications-list">
        <NotificationItem
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          @mark-as-read="markAsRead"
          @delete-notification="deleteNotification"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import NotificationItem from './NotificationItem.vue';
import { Notification } from '../model/types';

interface Props {
  notifications: Notification[];
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
});

const emit = defineEmits(['markAsRead', 'deleteNotification', 'clearAll']);

const markAsRead = (id: string) => {
  emit('markAsRead', id);
};

const deleteNotification = (id: string) => {
  emit('deleteNotification', id);
};

const clearAll = () => {
  emit('clearAll');
};
</script>

<style scoped>
.notification-panel {
  position: fixed;
  top: 60px;
  right: 20px;
  width: 350px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateX(120%);
  transition: transform 0.3s ease;
}

.notification-panel.open {
  transform: translateX(0);
}

.panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.clear-all-btn:hover {
  background-color: #fed7d7;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #a0aec0;
}

.notifications-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>