import type { LucideIcon } from 'lucide-react';

export type SectionId = 'home' | 'about' | 'blog' | 'contact';

export interface NavItem {
  id: SectionId;
  title: string;
  icon: LucideIcon;
  contentKey: keyof AllSectionsContentData;
}

export interface SectionContent {
  title: string;
  [key: string]: any; 
}

export interface AllSectionsContentData {
  home: SectionContent & { greeting: string; introduction: string; callToAction: string; featuredProject: { title: string; description: string; imageUrl: string; dataAiHint: string;} };
  about: SectionContent & { heading: string; bio: string; skills: string[]; experience: { role: string; company: string; duration: string; description: string; }[]; imageUrl: string; dataAiHint: string; };
  blog: SectionContent & { articles: { id: string; title: string; date: string; summary: string; imageUrl: string; dataAiHint: string; }[] };
  contact: SectionContent & { heading: string; email: string; phone: string; socialLinks: { platform: string; url: string; }[] };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
