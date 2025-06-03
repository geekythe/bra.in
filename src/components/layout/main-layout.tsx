
"use client";

import React, { useState, Children, isValidElement, cloneElement, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import type { NavItem, SectionId } from '@/types';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  navItems: NavItem[];
  activeSectionId: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  children: React.ReactNode; 
  animationDirection: 'up' | 'down' | 'none';
  previousSectionId: SectionId | null;
}

// Ensure this order matches the order in app/page.tsx for correct animation logic
const sectionOrder: SectionId[] = ['home', 'about', 'resume', 'portfolio', 'blog', 'certifications', 'contact'];


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
  
  return (
    <SidebarProvider defaultOpen={isClient ? undefined : true}> 
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="p-4">
            <h2 className="font-headline text-2xl text-sidebar-primary group-data-[collapsible=icon]:hidden">
              PortfolioFlow
            </h2>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden ml-auto text-sidebar-foreground hover:text-sidebar-accent-foreground" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={activeSectionId === item.id}
                    tooltip={item.title}
                    className={cn(
                      "w-full justify-start text-sidebar-foreground",
                       activeSectionId === item.id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-6 w-6" /> {/* Icons already h-6 w-6 */}
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 relative overflow-hidden bg-background section-container">
           {Children.map(children, (child) => {
            if (isValidElement(child)) {
              const sectionId = child.props.id as SectionId;
              const isActive = sectionId === activeSectionId;
              const isPrev = sectionId === previousSectionId;

              let transformClass = '';
              let zIndex = 1; // Default z-index

              if (isActive) {
                transformClass = 'animate-slide-to-center';
                zIndex = 10; // Active section on top
              } else if (isPrev && animationDirection !== 'none') {
                // Section animating out
                transformClass = animationDirection === 'up' ? 'animate-slide-to-top' : 'animate-slide-to-bottom';
                zIndex = 5; // Previous section below active, but above others
              } else {
                // All other sections should be positioned off-screen
                // Determine if they should be above or below the viewport
                const myIndex = sectionOrder.indexOf(sectionId);
                const activeIdx = sectionOrder.indexOf(activeSectionId);
                
                // If previousSectionId is null (initial load), or if we are navigating
                // position based on relation to activeSectionId
                if (myIndex < activeIdx) {
                    transformClass = 'animate-slide-from-top'; // Positioned above, ready to slide down if it becomes active
                } else {
                    transformClass = 'animate-slide-from-bottom'; // Positioned below, ready to slide up if it becomes active
                }
                 zIndex = 1; // Ensure non-active, non-previous sections are at the bottom
              }
              
              return (
                <div
                  key={sectionId}
                  className={cn(
                    "absolute inset-0 w-full h-full", // Removed generic bg-background
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

