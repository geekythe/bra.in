import type { LucideIcon } from 'lucide-react';
import type { 
  WorkHistory as HygraphWorkHistory,
  Education as HygraphEducation,
  Testimonial as HygraphTestimonial,
  Skill as HygraphSkill,
  PortfolioProjectHygraph,
  CertificationHygraph,
  BlogHygraph,
  AboutService as HygraphAboutService,
  AboutClient as HygraphAboutClient
} from '@/lib/hygraph';

export type SectionId = 'home' | 'about' | 'resume' | 'portfolio' | 'blog' | 'certifications' | 'contact';

export interface NavItem {
  id: SectionId;
  title: string;
  icon: LucideIcon;
  contentKey: keyof AllSectionsContentData; // This might need to be re-evaluated
}

// Re-export or adapt types from hygraph.ts
export type WorkHistory = HygraphWorkHistory;
export type Education = HygraphEducation;
export type Testimonial = HygraphTestimonial;
export type Skill = HygraphSkill;
export type PortfolioProject = PortfolioProjectHygraph;
export type Certification = CertificationHygraph;
export type Blog = BlogHygraph;
export type AboutService = HygraphAboutService;
export type AboutClient = HygraphAboutClient;


// This interface might become simpler or change structure
// as sections fetch their own data.
// For now, ensure it has keys for all SectionId
export interface SectionContent {
  title?: string; // Title might come from the component itself or Hygraph
  [key: string]: any; 
}
export interface AllSectionsContentData {
  home: SectionContent;
  about: SectionContent;
  resume: SectionContent;
  portfolio: SectionContent;
  blog: SectionContent;
  certifications: SectionContent;
  contact: SectionContent;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Props for section components, mainly for ID for animation
export interface SectionProps {
  id: SectionId;
  // content prop might be deprecated for sections fetching their own data
  content?: any; 
  // onNavigate might be specific to home or other sections if they have internal navigation triggers
  onNavigate?: (sectionId: SectionId) => void; 
}
