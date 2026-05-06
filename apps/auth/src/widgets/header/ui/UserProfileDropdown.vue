<template>
  <div class="user-profile-dropdown" ref="dropdownRef">
    <button 
      class="dropdown-trigger" 
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="toggleDropdown"
    >
      <div class="user-avatar">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="avatar-img" />
        <span v-else class="avatar-placeholder">{{ getInitials(user.name) }}</span>
      </div>
      <span class="user-name">{{ user.name }}</span>
      <svg 
        class="chevron-icon" 
        :class="{ rotated: isOpen }"
        viewBox="0 0 24 24" 
        width="18" 
        height="18"
      >
        <path fill="currentColor" d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <transition name="fade">
      <div v-show="isOpen" class="dropdown-menu" role="menu">
        <div class="dropdown-header">
          <div class="user-info">
            <div class="user-avatar-large">
              <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="avatar-img" />
              <span v-else class="avatar-placeholder">{{ getInitials(user.name) }}</span>
            </div>
            <div class="user-details">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
        
        <ul class="dropdown-list">
          <li v-for="item in dropdownItems" :key="item.id" role="menuitem">
            <a :href="item.href" class="dropdown-item" @click="handleItemClick(item)">
              <i :class="item.icon"></i> {{ item.label }}
            </a>
          </li>
        </ul>
        
        <div class="dropdown-footer">
          <a href="#" class="sign-out-btn" @click.prevent="handleSignOut">Sign out</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, onUnmounted } from 'vue';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface DropdownItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  },
  dropdownItems: {
    type: Array as PropType<DropdownItem[]>,
    default: () => [
      { id: 'profile', label: 'Your Profile', href: '/profile', icon: 'icon-user' },
      { id: 'settings', label: 'Settings', href: '/settings', icon: 'icon-settings' },
      { id: 'billing', label: 'Billing', href: '/billing', icon: 'icon-billing' }
    ]
  }
});

const emit = defineEmits(['itemClick', 'signOut']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleItemClick = (item: DropdownItem) => {
  emit('itemClick', item);
  closeDropdown();
};

const handleSignOut = () => {
  emit('signOut');
  closeDropdown();
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.user-profile-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--dropdown-trigger-bg, #f8f9fa);
  border: 1px solid var(--border-color, #dee2e6);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-trigger:hover {
  background: var(--dropdown-trigger-hover-bg, #e9ecef);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--avatar-bg, #007bff);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color, #333);
}

.chevron-icon {
  transition: transform 0.2s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  width: 280px;
  background: var(--dropdown-bg, #fff);
  border: 1px solid var(--border-color, #dee2e6);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid var(--border-color, #dee2e6);
}

.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-avatar-large {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--avatar-bg, #007bff);
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
}

.user-details h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color, #333);
}

.user-details p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-muted, #6c757d);
}

.dropdown-list {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: var(--text-color, #333);
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--hover-bg, #f8f9fa);
}

.dropdown-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-color, #dee2e6);
}

.sign-out-btn {
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  color: var(--danger-color, #dc3545);
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.sign-out-btn:hover {
  background-color: var(--danger-bg, #f8d7da);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>