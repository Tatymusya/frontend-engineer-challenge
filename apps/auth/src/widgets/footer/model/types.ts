export interface FooterLink {
  name: string;
  url: string;
  external?: boolean;
}

export interface FooterConfig {
  showLinks: boolean;
  showCopyright: boolean;
  copyrightText?: string;
  links: FooterLink[];
}