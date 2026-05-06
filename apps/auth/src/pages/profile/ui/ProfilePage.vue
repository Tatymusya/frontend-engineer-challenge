<template>
  <div class="profile-page">
    <div class="container">
      <h1>Profile Settings</h1>
      
      <div class="profile-content">
        <ProfileForm />
        <ChangePasswordForm />
        <DeleteAccountSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileForm from './ProfileForm.vue'
import ChangePasswordForm from './ChangePasswordForm.vue'
import DeleteAccountSection from './DeleteAccountSection.vue'
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #f5f7fa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.profile-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>