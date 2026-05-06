<template>
  <div class="success-container">
    <div class="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="checkmark">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
      </svg>
    </div>
    
    <h2>Password Successfully Reset!</h2>
    <p class="message">Your password has been successfully updated. You can now log in with your new credentials.</p>
    
    <div class="action-buttons">
      <router-link to="/login" class="login-button">Go to Login</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for success page
</script>

<style scoped>
.success-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: #d4edda;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.checkmark {
  width: 30px;
  height: 30px;
  color: #28a745;
}

.message {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s;
  text-align: center;
}

.login-button:hover {
  background-color: #0069d9;
}
</style>