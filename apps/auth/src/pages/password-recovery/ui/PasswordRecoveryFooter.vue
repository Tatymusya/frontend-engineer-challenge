<template>
  <footer class="password-recovery-footer">
    <nav class="footer-nav">
      <router-link to="/login" class="back-to-login">Back to Login</router-link>
    </nav>
    <div class="footer-info">
      <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.password-recovery-footer {
  padding: 1.5rem 2rem;
  background-color: white;
  border-top: 1px solid #eee;
  margin-top: auto;
}

.footer-nav {
  text-align: center;
  margin-bottom: 1rem;
}

.back-to-login {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.back-to-login:hover {
  text-decoration: underline;
}

.footer-info p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
  text-align: center;
}
</style>