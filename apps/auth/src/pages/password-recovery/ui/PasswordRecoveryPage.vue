<template>
  <div class="password-recovery-page">
    <PasswordRecoveryHeader />
    
    <main class="password-recovery-main">
      <EmailInput v-if="step === 'email'" @submit-email="handleEmailSubmit" />
      <PasswordResetForm 
        v-else-if="step === 'reset'" 
        :token="resetToken"
        @password-reset-success="handlePasswordResetSuccess" 
      />
      <PasswordRecoverySuccess v-else-if="step === 'success'" />
    </main>
    
    <PasswordRecoveryFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PasswordRecoveryHeader from './PasswordRecoveryHeader.vue'
import EmailInput from './EmailInput.vue'
import PasswordResetForm from './PasswordResetForm.vue'
import PasswordRecoverySuccess from './PasswordRecoverySuccess.vue'
import PasswordRecoveryFooter from './PasswordRecoveryFooter.vue'

type Step = 'email' | 'reset' | 'success'

const step = ref<Step>('email')
const resetToken = ref<string>('')

const handleEmailSubmit = (token: string) => {
  resetToken.value = token
  step.value = 'reset'
}

const handlePasswordResetSuccess = () => {
  step.value = 'success'
}
</script>

<style scoped>
.password-recovery-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.password-recovery-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>