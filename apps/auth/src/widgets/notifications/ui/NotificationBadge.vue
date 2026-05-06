<template>
  <div class="notification-badge" :class="{ visible: hasUnread }">
    <span v-if="hasUnread" class="badge-count">{{ unreadCount }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Notification } from '../model/types';

interface Props {
  notifications: Notification[];
}

const props = defineProps<Props>();

const unreadCount = computed(() => {
  return props.notifications.filter(n => !n.isRead).length;
});

const hasUnread = computed(() => unreadCount.value > 0);
</script>

<style scoped>
.notification-badge {
  position: relative;
  display: inline-block;
}

.notification-badge.visible::after {
  content: attr(data-count);
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.badge-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>