<template>
  <nav class="top-navigation">
    <ul class="nav-list">
      <li v-for="item in navigationItems" :key="item.id" class="nav-item">
        <a 
          :href="item.href" 
          :class="{ active: item.id === activeItem }"
          class="nav-link"
          @click.prevent="handleNavigation(item)"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const props = defineProps({
  navigationItems: {
    type: Array as PropType<NavigationItem[]>,
    default: () => [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
      { id: 'settings', label: 'Settings', href: '/settings' }
    ]
  },
  activeItem: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['navigate']);

const handleNavigation = (item: NavigationItem) => {
  emit('navigate', item);
};
</script>

<style scoped>
.top-navigation {
  width: 100%;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
}

.nav-item .nav-link {
  text-decoration: none;
  color: var(--text-color, #333);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-item .nav-link:hover {
  color: var(--primary-color, #007bff);
}

.nav-item .nav-link.active {
  color: var(--primary-color, #007bff);
}

.nav-item .nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color, #007bff);
}
</style>