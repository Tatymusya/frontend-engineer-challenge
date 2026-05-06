import type { FooterConfig } from '../model';

/**
 * Creates a default footer configuration
 */
export const createDefaultFooterConfig = (): FooterConfig => ({
  showLinks: true,
  showCopyright: true,
  copyrightText: `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`,
  links: [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Contact Us', url: '/contact' },
  ],
});

/**
 * Validates if the footer config is properly formatted
 */
export const validateFooterConfig = (config: Partial<FooterConfig>): boolean => {
  if (!config.links && !Array.isArray(config.links)) return false;
  
  if (config.links) {
    return config.links.every(link => 
      typeof link.name === 'string' && 
      typeof link.url === 'string'
    );
  }
  
  return true;
};