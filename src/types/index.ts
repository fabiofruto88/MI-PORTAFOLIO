export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
