<template>
  <div class="server-error-page">
    <div class="content-wrapper">
      <div class="error-container">
        <div class="error-code">500</div>
        <h1>Server Error</h1>
        <p class="error-message">
          Something went wrong on our end. We're working to fix it as soon as possible.
        </p>
        <div class="action-buttons">
          <button @click="retry" class="btn btn-primary" :disabled="isRetrying">
            {{ isRetrying ? 'Retrying...' : 'Try Again' }}
          </button>
          <router-link to="/" class="btn btn-secondary">Go Home</router-link>
        </div>
        <div v-if="showDetails" class="error-details">
          <details>
            <summary>Error Details</summary>
            <pre>{{ errorDetails }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  error?: Error
  status?: number
}

const props = withDefaults(defineProps<Props>(), {
  error: undefined,
  status: 500
})

const isRetrying = ref(false)
const showDetails = ref(false)

const errorDetails = computed(() => {
  if (props.error) {
    return `${props.error.name}: ${props.error.message}\n${props.error.stack}`
  }
  return 'An internal server error occurred'
})

const retry = () => {
  isRetrying.value = true
  // Simulate a retry attempt
  setTimeout(() => {
    isRetrying.value = false
    window.location.reload()
  }, 1000)
}

onMounted(() => {
  // Show error details only in development
  if (process.env.NODE_ENV === 'development') {
    showDetails.value = true
  }
})
</script>

<style scoped>
.server-error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-container {
  padding: 3rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: #dc3545;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-block;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0069d9;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.error-details {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: left;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: #495057;
}

.error-details pre {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .error-code {
    font-size: 4rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>