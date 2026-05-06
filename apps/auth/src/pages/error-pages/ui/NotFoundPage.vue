<template>
  <div class="not-found-page">
    <div class="content-wrapper">
      <div class="error-container">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p class="error-message">
          Sorry, the page you're looking for doesn't exist or may have been moved.
        </p>
        <div class="action-buttons">
          <router-link to="/" class="btn btn-primary">Go Home</router-link>
          <router-link to="/dashboard" class="btn btn-secondary">Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this page
</script>

<style scoped>
.not-found-page {
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
  color: #6c757d;
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
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0069d9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
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