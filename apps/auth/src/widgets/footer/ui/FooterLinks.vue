<template>
  <nav class="footer-links">
    <ul class="footer-links__list">
      <li v-for="link in footerLinks" :key="link.name" class="footer-links__item">
        <a 
          :href="link.url" 
          :target="link.external ? '_blank' : '_self'"
          class="footer-links__link"
        >
          {{ link.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface FooterLink {
  name: string;
  url: string;
  external?: boolean;
}

const footerLinks: FooterLink[] = [
  { name: 'Privacy Policy', url: '/privacy' },
  { name: 'Terms of Service', url: '/terms' },
  { name: 'Contact Us', url: '/contact' },
  { name: 'Help Center', url: '/help', external: true },
];
</script>

<style scoped>
.footer-links__list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.footer-links__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-links__link:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .footer-links__list {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
}
</style>