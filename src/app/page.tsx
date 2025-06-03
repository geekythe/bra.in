"use client";

import React, { useState, useMemo } from 'react';
import { HomeIcon, User, Newspaper, Mail, Briefcase } from 'lucide-react'; // Added Briefcase
import MainLayout from '@/components/layout/main-layout';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import BlogSection from '@/components/sections/blog-section';
import PortfolioSection from '@/components/sections/portfolio-section'; // Added PortfolioSection
import ContactSection from '@/components/sections/contact-section';
import ContentOptimizer from '@/components/sections/content-optimizer';
import type { NavItem, SectionId, AllSectionsContentData } from '@/types';
import { sectionsContentData } from '@/content/sections-data';

const navItemsList: NavItem[] = [
  { id: 'home', title: 'Home', icon: HomeIcon, contentKey: 'home' },
  { id: 'about', title: 'About', icon: User, contentKey: 'about' },
  { id: 'blog', title: 'Blog', icon: Newspaper, contentKey: 'blog' },
  { id: 'portfolio', title: 'Portfolio', icon: Briefcase, contentKey: 'portfolio' }, // Added Portfolio
  { id: 'contact', title: 'Contact', icon: Mail, contentKey: 'contact' },
];

const sectionOrder: SectionId[] = ['home', 'about', 'blog', 'portfolio', 'contact']; // Added 'portfolio'

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
      setAnimationDirection('up'); 
    } else {
      setAnimationDirection('down'); 
    }
  };

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
    portfolio: <PortfolioSection id="portfolio" content={sectionsContentData.portfolio} />, // Added PortfolioSection
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
