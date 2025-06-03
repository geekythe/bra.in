
"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HomeIcon, User, Newspaper, Mail, Briefcase } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import ContactSection from '@/components/sections/contact-section';
import type { NavItem, SectionId } from '@/types';
import { sectionsContentData } from '@/content/sections-data';

const navItemsList: NavItem[] = [
  { id: 'home', title: 'Home', icon: HomeIcon, contentKey: 'home' },
  { id: 'about', title: 'About', icon: User, contentKey: 'about' },
  { id: 'blog', title: 'Blog', icon: Newspaper, contentKey: 'blog' },
  { id: 'portfolio', title: 'Portfolio', icon: Briefcase, contentKey: 'portfolio' },
  { id: 'contact', title: 'Contact', icon: Mail, contentKey: 'contact' },
];

const sectionOrder: SectionId[] = ['home', 'about', 'blog', 'portfolio', 'contact'];

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

    setPreviousSectionId(activeSectionId); // Set previous section to start its animation out
    
    if (newIndex > currentIndex) {
      setAnimationDirection('up'); 
    } else {
      setAnimationDirection('down'); 
    }
    
    // Delay setting the new active section
    navigationTimeoutRef.current = setTimeout(() => {
      setActiveSectionId(sectionId);
      // The previousSectionId and animationDirection remain to ensure the outgoing animation completes
      // or is in its final state when the new section starts animating in.
      // They will be naturally updated on the next navigation.
    }, 1000); // 1000ms = 1 second delay
  };

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const currentSectionContent = sectionsContentData[activeSectionId];
  const currentContentString = useMemo(() => {
    if (!currentSectionContent) return "";
    return Object.entries(currentSectionContent)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');
  }, [currentSectionContent]);


  const sectionComponents = {
    home: <HomeSection id="home" content={sectionsContentData.home} onNavigate={handleNavigate} />,
    about: <AboutSection id="about" content={sectionsContentData.about} />,
    blog: <BlogSection id="blog" content={sectionsContentData.blog} />,
    portfolio: <PortfolioSection id="portfolio" content={sectionsContentData.portfolio} />,
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
      {navItemsList.map(item => (
        React.cloneElement(sectionComponents[item.id], { key: item.id, id: item.id })
      ))}
    </MainLayout>
  );
}
