"use client";

import React, { useState, useMemo } from 'react';
import { HomeIcon, User, Newspaper, Mail } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import ContactSection from '@/components/sections/contact-section';
import ContentOptimizer from '@/components/sections/content-optimizer';
import type { NavItem, SectionId, AllSectionsContentData } from '@/types';
import { sectionsContentData } from '@/content/sections-data';

const navItemsList: NavItem[] = [
  { id: 'home', title: 'Home', icon: HomeIcon, contentKey: 'home' },
  { id: 'about', title: 'About', icon: User, contentKey: 'about' },
  { id: 'blog', title: 'Blog', icon: Newspaper, contentKey: 'blog' },
  { id: 'contact', title: 'Contact', icon: Mail, contentKey: 'contact' },
];

const sectionOrder: SectionId[] = ['home', 'about', 'blog', 'contact'];

export default function PortfolioPage() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('home');
  const [previousSectionId, setPreviousSectionId] = useState<SectionId | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down' | 'none'>('none');

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === activeSectionId) return;

    const currentIndex = sectionOrder.indexOf(activeSectionId);
    const newIndex = sectionOrder.indexOf(sectionId);

    setPreviousSectionId(activeSectionId);
    setActiveSectionId(sectionId);
    
    if (newIndex > currentIndex) {
      setAnimationDirection('up'); // New section pushes old one up
    } else {
      setAnimationDirection('down'); // New section pushes old one down
    }
  };

  const currentSectionContent = sectionsContentData[activeSectionId];
  const currentContentString = useMemo(() => {
    // Create a string representation of current section content for AI optimizer
    // This is a simplified example; you might want a more structured approach
    if (!currentSectionContent) return "";
    return Object.entries(currentSectionContent)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');
  }, [currentSectionContent]);


  const sectionComponents = {
    home: <HomeSection id="home" content={sectionsContentData.home} onNavigate={handleNavigate} />,
    about: <AboutSection id="about" content={sectionsContentData.about} />,
    blog: <BlogSection id="blog" content={sectionsContentData.blog} />,
    contact: <ContactSection id="contact" content={sectionsContentData.contact} />,
  };

  return (
    <MainLayout
      navItems={navItemsList}
      activeSectionId={activeSectionId}
      onNavigate={handleNavigate}
      animationDirection={animationDirection}
      previousSectionId={previousSectionId}
    >
      {/* Render all sections, MainLayout will handle visibility and animation */}
      {navItemsList.map(item => (
        // The key and id prop here are crucial for React's reconciliation and for the layout to identify sections
        React.cloneElement(sectionComponents[item.id], { key: item.id, id: item.id })
      ))}
       {/* ContentOptimizer button is rendered inside each section or as a global floating button if preferred */}
       {/* Example: Adding it here to appear in active section context. In a real app, integrate into each section or a common header. */}
       {/* For simplicity, this button is not shown here to avoid layout complexities, but ContentOptimizer is available. */}
       {/* Each section can import and use ContentOptimizer directly like:
           <ContentOptimizer sectionId={activeSectionId} sectionTitle={currentSectionContent.title} initialContent={currentContentString} /> 
           This would typically be at the bottom of each section's content.
        */}
    </MainLayout>
  );
}
