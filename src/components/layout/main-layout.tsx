
"use client";

import React, { Children, isValidElement, cloneElement, useEffect, useState } from 'react';
import CustomSidebar from '@/components/layout/custom-sidebar'; // Import the new sidebar
import type { NavItem, SectionId } from '@/types';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  navItems: NavItem[]; // Keep original NavItem from page.tsx for now
  activeSectionId: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  children: React.ReactNode;
  animationDirection: 'up' | 'down' | 'none';
  previousSectionId: SectionId | null;
}

const sectionOrder: SectionId[] = ['home', 'about', 'resume','certifications', 'portfolio', 'blog', 'contact'];

export default function MainLayout({
  navItems,
  activeSectionId,
  onNavigate,
  children,
  animationDirection,
  previousSectionId
}: MainLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Transform navItems for the new sidebar's expected 'sections' prop
  const sidebarSections = navItems.map(item => ({
    id: item.id,
    label: item.title,
  }));

  return (
    <div className="h-screen w-screen overflow-hidden bg-background"> {/* Ensure main container has a background */}
      <CustomSidebar
        sections={sidebarSections}
        activeSection={activeSectionId}
        onSectionChange={onNavigate}
      />

      {/* Main content area needs padding/margin to not be overlapped by fixed sidebar/topbar */}
      {/* md:ml-32 for w-32 desktop sidebar, pt-14 for h-14 mobile top bar */}
      <main className={cn(
        "relative h-full section-container overflow-hidden",
        "md:ml-32", // Desktop: margin for sidebar
        "pt-14 md:pt-0"  // Mobile: padding for top bar; Desktop: no top padding
      )}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const sectionId = child.props.id as SectionId;
            const isActive = sectionId === activeSectionId;
            const isPrev = sectionId === previousSectionId;

            let transformClass = '';
            let zIndex = 1;

            if (isActive) {
              transformClass = 'animate-slide-to-center';
              zIndex = 10;
            } else if (isPrev && animationDirection !== 'none') {
              transformClass = animationDirection === 'up' ? 'animate-slide-to-top' : 'animate-slide-to-bottom';
              zIndex = 5;
            } else {
              const myIndex = sectionOrder.indexOf(sectionId);
              const activeIdx = sectionOrder.indexOf(activeSectionId);
              if (myIndex < activeIdx) {
                transformClass = 'animate-slide-from-top';
              } else {
                transformClass = 'animate-slide-from-bottom';
              }
              zIndex = 1;
            }

            return (
              <div
                key={sectionId}
                className={cn(
                  "absolute inset-0 w-full h-full",
                  transformClass
                )}
                style={{ zIndex }}
              >
                {cloneElement(child, { ...child.props })}
              </div>
            );
          }
          return child;
        })}
      </main>
    </div>
  );
}

    