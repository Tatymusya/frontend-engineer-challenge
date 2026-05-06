<template>
  <div class="search-bar">
    <div class="search-input-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="search-input"
        @keydown.enter="performSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur"
      />
      <button class="search-button" @click="performSearch">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>
    </div>
    
    <transition name="slide-down">
      <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-panel">
        <ul class="suggestions-list">
          <li 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            class="suggestion-item"
            :class="{ active: index === activeSuggestionIndex }"
            @click="selectSuggestion(suggestion)"
            @mouseenter="activeSuggestionIndex = index"
          >
            <span class="suggestion-text">{{ suggestion.text }}</span>
            <span class="suggestion-type">{{ suggestion.type }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

interface Suggestion {
  text: string;
  type: string;
  id: string;
}

const searchQuery = ref('');
const showSuggestions = ref(false);
const activeSuggestionIndex = ref(-1);

const suggestions = computed<Suggestion[]>(() => {
  if (!searchQuery.value.trim()) return [];
  
  // In a real app, this would come from an API call
  // For demo purposes, we'll return some mock data
  const mockSuggestions: Suggestion[] = [
    { text: 'Dashboard', type: 'Page', id: 'dashboard' },
    { text: 'User Settings', type: 'Page', id: 'user-settings' },
    { text: 'Documentation', type: 'Resource', id: 'docs' },
    { text: 'API Reference', type: 'Resource', id: 'api-ref' },
    { text: 'Team Members', type: 'Page', id: 'team' }
  ];
  
  return mockSuggestions.filter(item => 
    item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const performSearch = () => {
  if (suggestions.value.length > 0 && activeSuggestionIndex.value >= 0) {
    selectSuggestion(suggestions.value[activeSuggestionIndex.value]);
  } else {
    // Perform general search with current query
    console.log('Searching for:', searchQuery.value);
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion: Suggestion) => {
  searchQuery.value = suggestion.text;
  showSuggestions.value = false;
  activeSuggestionIndex.value = -1;
  // Emit event to parent component
  console.log('Selected suggestion:', suggestion);
};

const handleBlur = async () => {
  // Delay hiding suggestions to allow click events to register
  await nextTick();
  setTimeout(() => {
    showSuggestions.value = false;
    activeSuggestionIndex.value = -1;
  }, 200);
};

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (activeSuggestionIndex.value < suggestions.value.length - 1) {
      activeSuggestionIndex.value++;
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (activeSuggestionIndex.value > 0) {
      activeSuggestionIndex.value--;
    } else if (activeSuggestionIndex.value === -1) {
      activeSuggestionIndex.value = suggestions.value.length - 1;
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (activeSuggestionIndex.value >= 0) {
      selectSuggestion(suggestions.value[activeSuggestionIndex.value]);
    }
  } else if (e.key === 'Escape') {
    showSuggestions.value = false;
    activeSuggestionIndex.value = -1;
  }
};

// Add keyboard event listener when component mounts
document.addEventListener('keydown', handleKeyDown);

// Clean up event listener when component unmounts
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 280px;
}

.search-input-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color, #ced4da);
  border-radius: 4px;
  background: var(--input-bg, #fff);
  transition: border-color 0.2s ease;
}

.search-input-container:focus-within {
  border-color: var(--primary-color, #007bff);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-input {
  flex-grow: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
}

.search-button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-muted, #6c757d);
  transition: color 0.2s ease;
}

.search-button:hover {
  color: var(--primary-color, #007bff);
}

.suggestions-panel {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: var(--dropdown-bg, #fff);
  border: 1px solid var(--border-color, #dee2e6);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.suggestions-list {
  list-style: none;
  padding: 0.25rem 0;
  margin: 0;
}

.suggestion-item {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover,
.suggestion-item.active {
  background-color: var(--hover-bg, #f8f9fa);
}

.suggestion-text {
  font-weight: 500;
  color: var(--text-color, #333);
}

.suggestion-type {
  font-size: 0.75rem;
  color: var(--text-muted, #6c757d);
  background: var(--badge-bg, #e9ecef);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.slide-down-enter-active {
  transition: all 0.2s ease;
}

.slide-down-leave-active {
  transition: all 0.15s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
}
</style>