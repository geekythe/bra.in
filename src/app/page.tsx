
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HomeIcon, User, Newspaper, Mail, Briefcase, FileText, Award, BookText } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import ContactSection from '@/components/sections/contact-section';
import ResumeSection from '@/components/sections/resume-section';
import CertificationsSection from '@/components/sections/certifications-section';
import type { NavItem, SectionId } from '@/types'; // NavItem type might be used for transformation

// sectionsContentData is not directly used by the new sections for their primary content
// import { sectionsContentData } from '@/content/sections-data';


// This list is primarily for MainLayout to know which sections exist and their icons for fallback if needed,
// but the new CustomSidebar will mostly use its internal icon logic.
// The 'title' will be used as 'label' for the new sidebar.
const navItemsList: NavItem[] = [
  { id: 'home', title: 'Home', icon: HomeIcon, contentKey: 'home' },
  { id: 'about', title: 'About', icon: User, contentKey: 'about' },
  { id: 'resume', title: 'Resume', icon: FileText, contentKey: 'resume' },
  { id: 'portfolio', title: 'Portfolio', icon: Briefcase, contentKey: 'portfolio' }, // Briefcase for portfolio
  { id: 'blog', title: 'Blog', icon: BookText, contentKey: 'blog' }, // Using BookText as per new sidebar's icon for 'blog'
  { id: 'certifications', title: 'Certifications', icon: Award, contentKey: 'certifications' },
  { id: 'contact', title: 'Contact', icon: Mail, contentKey: 'contact' },
];

const sectionOrder: SectionId[] = ['home', 'about', 'resume', 'portfolio', 'blog', 'certifications', 'contact'];

export default function PortfolioPage() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('home');
  const [previousSectionId, setPreviousSectionId] = useState<SectionId | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down' | 'none'>('none');
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === activeSectionId) return;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    const currentIndex = sectionOrder.indexOf(activeSectionId);
    const newIndex = sectionOrder.indexOf(sectionId);

    setPreviousSectionId(activeSectionId);

    if (newIndex > currentIndex) {
      setAnimationDirection('up');
    } else {
      setAnimationDirection('down');
    }

    // The delay before changing the active section to allow old section to animate out
    navigationTimeoutRef.current = setTimeout(() => {
      setActiveSectionId(sectionId);
      setPreviousSectionId(null); // Clear previous section once new one is active
      setAnimationDirection('none'); // Reset direction
    }, 100); // This delay matches the one in the new sidebar's click handler (originally 300ms)
  };

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const sectionComponents: Record<SectionId, React.ReactElement> = {
    home: <HomeSection id="home" />,
    about: <AboutSection id="about" />,
    resume: <ResumeSection id="resume" />,
    portfolio: <PortfolioSection id="portfolio" />,
    blog: <BlogSection id="blog" />,
    certifications: <CertificationsSection id="certifications" />,
    contact: <ContactSection id="contact" />,
  };


  return (
    <MainLayout
      navItems={navItemsList} // Pass the original navItemsList
      activeSectionId={activeSectionId}
      onNavigate={handleNavigate}
      animationDirection={animationDirection}
      previousSectionId={previousSectionId}
    >
      {sectionOrder.map(id => ( // Ensure sections are always rendered in the defined order for animation logic
        React.cloneElement(sectionComponents[id], { key: id, id: id })
      ))}
    </MainLayout>
  );
}

    