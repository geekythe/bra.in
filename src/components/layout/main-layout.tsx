
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

const sectionOrder: SectionId[] = ['home', 'about', 'blog', 'portfolio', 'contact']; // Added 'portfolio'


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
                    <item.icon className="h-6 w-6" />
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
                if(previousSectionId === null && myIndex !== activeIdx){ 
                   transformClass = myIndex < activeIdx ? 'animate-slide-from-top' : 'animate-slide-from-bottom';
                } else if (previousSectionId !== null) { 
                   transformClass = myIndex < activeIdx ? 'animate-slide-from-top' : 'animate-slide-from-bottom';
                } else {
                   transformClass = 'animate-slide-from-bottom';
                }
              }
              
              return (
                <div
                  key={sectionId}
                  className={cn(
                    "absolute inset-0 w-full h-full bg-background",
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
