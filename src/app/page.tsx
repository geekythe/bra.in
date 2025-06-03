"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HomeIcon, User, Newspaper, Mail, Briefcase, FileText, Award } from 'lucide-react'; // Added FileText, Award
import MainLayout from '@/components/layout/main-layout';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import ContactSection from '@/components/sections/contact-section';
import ResumeSection from '@/components/sections/resume-section'; // New
import CertificationsSection from '@/components/sections/certifications-section'; // New
import type { NavItem, SectionId, AllSectionsContentData } from '@/types';
// sectionsContentData might be less used or differently structured now
// For simplicity, we'll keep it for now, but its direct usage in sections is reduced.
import { sectionsContentData } from '@/content/sections-data'; 


const navItemsList: NavItem[] = [
  { id: 'home', title: 'Home', icon: HomeIcon, contentKey: 'home' },
  { id: 'about', title: 'About', icon: User, contentKey: 'about' },
  { id: 'resume', title: 'Resume', icon: FileText, contentKey: 'resume' },
  { id: 'portfolio', title: 'Portfolio', icon: Briefcase, contentKey: 'portfolio' },
  { id: 'blog', title: 'Blog', icon: Newspaper, contentKey: 'blog' },
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
    
    navigationTimeoutRef.current = setTimeout(() => {
      setActiveSectionId(sectionId);
    }, 300); 
  };

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // The new sections fetch their own data, so sectionsContentData might not be needed for them.
  // For props like 'id', MainLayout will pass it.
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
      navItems={navItemsList}
      activeSectionId={activeSectionId}
      onNavigate={handleNavigate}
      animationDirection={animationDirection}
      previousSectionId={previousSectionId}
    >
      {/* Pass id to each section component for MainLayout's animation logic */}
      {navItemsList.map(item => (
        React.cloneElement(sectionComponents[item.id], { key: item.id, id: item.id })
      ))}
    </MainLayout>
  );
}
