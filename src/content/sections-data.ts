import type { AllSectionsContentData } from '@/types';

// This data is now largely superseded by components fetching their own data
// or having content defined statically within them.
// We keep the structure to satisfy the AllSectionsContentData type.
export const sectionsContentData: AllSectionsContentData = {
  home: {
    title: "Home", // This title might be overridden by the component itself
  },
  about: {
    title: "About",
  },
  resume: { // New section
    title: "Resume",
  },
  portfolio: { // Content for this is now in portfolio-section.tsx
    title: "Portfolio",
  },
  blog: { // Content for this is now in blog-section.tsx
    title: "Blog",
  },
  certifications: { // New section
    title: "Certifications",
  },
  contact: { // Content for this is now in contact-section.tsx
    title: "Contact",
  }
};
