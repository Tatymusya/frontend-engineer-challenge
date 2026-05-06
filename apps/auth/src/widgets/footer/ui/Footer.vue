<template>
  <footer class="footer">
    <div class="footer__container">
      <CopyrightInfo class="footer__copyright" />
      <FooterLinks class="footer__links" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import CopyrightInfo from './CopyrightInfo.vue';
import FooterLinks from './FooterLinks.vue';
</script>

<style scoped>
.footer {
  background-color: var(--color-background-secondary);
  border-top: 1px solid var(--color-border);
  padding: 2rem 0;
  margin-top: auto;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .footer__container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>