<template>
  <div class="register-page">
    <RegisterHeader />
    <main class="register-content">
      <div class="form-container">
        <h1>Create an Account</h1>
        <p>Fill in your details to get started</p>
        
        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="input-group">
            <label for="fullName">Full Name</label>
            <input 
              id="fullName"
              v-model="formData.fullName"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div class="input-group">
            <label for="email">Email Address</label>
            <input 
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div class="input-group">
            <label for="password">Password</label>
            <input 
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>
          
          <div class="input-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" :disabled="isSubmitting" class="submit-btn">
            {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>
        
        <div class="login-link">
          <p>Already have an account? <router-link to="/login">Log in</router-link></p>
        </div>
      </div>
    </main>
    <RegisterFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterHeader from './RegisterHeader.vue';
import RegisterFooter from './RegisterFooter.vue';
import { registerUser } from '../model/actions';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const router = useRouter();
const formData = ref<FormData>({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  isSubmitting.value = true;

  try {
    await registerUser({
      fullName: formData.value.fullName,
      email: formData.value.email,
      password: formData.value.password
    });
    
    // Redirect to dashboard after successful registration
    router.push('/dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    alert('Registration failed. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.register-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
}

.form-container {
  width: 100%;
  max-width: 480px;
  padding: 2.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-container h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.form-container p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
}

.login-link a {
  color: #3b82f6;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>