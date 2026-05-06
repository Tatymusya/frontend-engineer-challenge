export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  permissions?: string[];
}

export interface DropdownItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: string;
  category?: string;
}