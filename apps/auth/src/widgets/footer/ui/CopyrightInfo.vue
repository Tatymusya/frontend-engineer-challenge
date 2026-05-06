<template>
  <div class="copyright-info">
    <p class="copyright-info__text">
      &copy; {{ currentYear }} {{ companyName }}. {{ translationText }}
    </p>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
const companyName = 'Your Company Name';
const translationText = 'All rights reserved.';
</script>

<style scoped>
.copyright-info {
  text-align: center;
}

.copyright-info__text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

@media (min-width: 768px) {
  .copyright-info {
    text-align: left;
  }
}
</style>