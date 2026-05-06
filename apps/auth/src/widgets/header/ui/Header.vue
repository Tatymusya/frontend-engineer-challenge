<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <slot name="logo" />
      </div>
      <TopNavigation class="navigation-section" />
      <div class="actions-section">
        <SearchBar class="search-bar" />
        <UserProfileDropdown class="user-profile" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import TopNavigation from './TopNavigation.vue';
import UserProfileDropdown from './UserProfileDropdown.vue';
import SearchBar from './SearchBar.vue';

// Define any props or emits here if needed
</script>

<style scoped>
.header {
  background-color: var(--header-bg-color, #ffffff);
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  flex-shrink: 0;
}

.navigation-section {
  flex-grow: 1;
  margin: 0 2rem;
}

.actions-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-bar {
  margin-right: 1rem;
}

.user-profile {
  flex-shrink: 0;
}
</style>