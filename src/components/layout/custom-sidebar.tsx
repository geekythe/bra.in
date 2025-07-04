
"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import {
  Home,
  User,
  FileText,
  BookOpen,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  Award,
  BookText, // Used for 'blog' section
  Newspaper, // Available if needed, but BookText is used per your code
  Briefcase, // For 'portfolio'
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { SectionId } from '@/types';
import { cn } from "@/lib/utils"

interface CustomSidebarProps {
  sections: {
    id: SectionId // Use SectionId for type safety
    label: string
  }[]
  activeSection: SectionId
  onSectionChange: (sectionId: SectionId) => void
}

export default function CustomSidebar({ sections, activeSection, onSectionChange }: CustomSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleSectionClick = (sectionId: SectionId) => {
    // Delay is handled by the onSectionChange prop (originally in page.tsx)
    onSectionChange(sectionId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const getIcon = (id: SectionId) => {
    switch (id) {
      case "home":
        return <Home className="w-5 h-5" />
      case "about":
        return <User className="w-5 h-5" />
      case "resume":
        return <FileText className="w-5 h-5" />
      case "certifications":
        return <Award className="w-5 h-5" />
      case "portfolio":
        return <Briefcase className="w-5 h-5" /> // Changed to Briefcase to match page.tsx
      case "blog": // Changed from 'blogs' to 'blog'
        return <BookText className="w-5 h-5" />
      case "contact":
        return <Mail className="w-5 h-5" />
      default:
        // Fallback, though all current sections should be covered
        const exhaustiveCheck: never = id;
        return <Home className="w-5 h-5" />;
    }
  }

  const getSectionColor = (id: SectionId) => {
    switch (id) {
      case "home":
        return "bg-[#21A2EF]" // Blue
      case "about":
        return "bg-[#6F42C1]" // Purple
      case "resume":
        return "bg-[#fff]" // navblue
      case "certifications":
        return "bg-[#EA3AB8]" // Pink
      case "portfolio":
        return "bg-[#10B981]" // Teal/Green
      case "blog":
        return "bg-[#F59E0B]" // Orange
      case "contact":
        return "bg-[#666C73]" // Grey - from contact section, or use a theme color
      default:
        const exhaustiveCheck: never = id;
        return "bg-[#21A2EF]";
    }
  }

  const getSectionGlowClass = (id: SectionId) => {
    switch (id) {
      case "home":
      case "resume":
        return "cyberpunk-glow" // Blue glow (assuming primary is blueish)
      case "about":
        return "cyberpunk-purple-glow"
      case "certifications":
        return "cyberpunk-pink-glow"
      case "portfolio":
        return "cyberpunk-teal-glow" // Needs to be defined in globals.css
      case "blog":
        return "cyberpunk-orange-glow" // Needs to be defined in globals.css
      case "contact":
         return "cyberpunk-purple-glow" // Or another appropriate glow
      default:
        const exhaustiveCheck: never = id;
        return "cyberpunk-glow";
    }
  }

  const MobileTopBar = () => (
    <div
      className={`fixed top-0 z-50 md:hidden transition-all duration-300 flex items-center bg-black h-12 ${
        isMobileMenuOpen ? "right-0 left-auto " : "left-0 right-0 w-full "
      }`}
      style={
        isMobileMenuOpen
          ? { width: "calc(100% - 10rem)" } // 10rem = Tailwind w-40 for mobile sidebar
          : {}
      }
    >
      <div className="w-14 h-full bg-gray-800 flex items-center justify-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-4">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="flex-1 flex">
        <div className="bg-[#6F42C1] w-1/2 py-2 flex items-center justify-center">
          <p className="text-white text-sm text-center font-medium" style={{
                            textShadow: `
                                0.1px 0.1px 0 #000,
  0.3px 0.2px 0 #000,
  0.5px 0.3px 0 #000,
  0.7px 0.4px 0 #000,
  0.9px 0.5px 0 #000,
  1.1px 0.6px 0 #000,
  1.3px 0.7px 0 #000,
  1.5px 0.8px 0 #000,
  1.7px 0.9px 0 #000,
                              2px 1px 0 #000
                            `,
                          }}>Kenneth</p>
        </div>
        <div className="bg-[#21A2EF] w-1/2 py-2 flex items-center justify-center">
          <span className="text-white text-xs text-center font-medium" style={{
                            textShadow: `
                                0.1px 0.1px 0 #000,
  0.3px 0.2px 0 #000,
  0.5px 0.3px 0 #000,
  0.7px 0.4px 0 #000,
  0.9px 0.5px 0 #000,
  1.1px 0.6px 0 #000,
  1.3px 0.7px 0 #000,
  1.5px 0.8px 0 #000,
  1.7px 0.9px 0 #000,
                              2px 1px 0 #000
                            `,
                          }}>
            The <br />
            Brain
          </span>
        </div>
      </div>
    </div>
  )

  const DesktopSidebar = () => (
    <aside className="fixed left-0 top-0 h-full w-32 bg-black flex-col items-center z-40 hidden md:flex">
      <div className="w-full flex flex-col items-center border-b border-gray-50">
        <div className="w-full aspect-square bg-black flex items-center justify-center relative">
          <Image 
            src="/log.png" 
            alt="Profile" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="hidden w-full md:flex">
          <div className="bg-[#6F42C1] w-1/2 py-3 flex items-center justify-center">
            <p className="text-white text-md text-center font-medium" style={{
                            textShadow: `
                                0.1px 0.1px 0 #000,
  0.3px 0.2px 0 #000,
  0.5px 0.3px 0 #000,
  0.7px 0.4px 0 #000,
  0.9px 0.5px 0 #000,
  1.1px 0.6px 0 #000,
  1.3px 0.7px 0 #000,
  1.5px 0.8px 0 #000,
  1.7px 0.9px 0 #000
                             
                            `,
                          }}>Kenneth</p>
          </div>
          <div className="bg-[#21A2EF] w-1/2 py-3 flex items-center justify-center">
            <span className="text-white text-md text-center font-medium"  style={{
                            textShadow: `
                                0.1px 0.1px 0 #000,
  0.3px 0.2px 0 #000,
  0.5px 0.3px 0 #000,
  0.7px 0.4px 0 #000,
  0.9px 0.5px 0 #000,
  1.1px 0.6px 0 #000,
  1.3px 0.7px 0 #000,
  1.5px 0.8px 0 #000,
  1.5px 0.9px 0 #000
                            `,
                          }}>
              The <br />
              Brain
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col items-center w-full flex-1  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={cn(
              "relative w-full py-4 flex flex-col items-center justify-center border-b border-gray-50",
              activeSection === section.id
                ? "text-accent "
                : "text-white hover:text-accent "
            )}
          >
            {getIcon(section.id)}
            <span className="text-[10px] mt-1 uppercase tracking-wider font-light">{section.label}</span>
            {activeSection === section.id && (
              <motion.div
                layoutId="desktopActiveSection" // Unique layoutId for desktop
                className={`absolute left-0 top-0 h-full w-1 ${getSectionColor(section.id)} ${getSectionGlowClass(
                  section.id,
                )}`}
                // transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="w-full py-4 flex flex-col items-center gap-4 border-t border-gray-50">
        <div className="flex flex-row items-center justify-center gap-3">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a
  href="https://www.linkedin.com/in/therealkennethwebber/"
  aria-label="LinkedIn"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition-colors"
>
  <Linkedin className="w-4 h-4" />
</a>

        
        </div>
      </div>
    </aside>
  )

  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-0 bottom-0 w-40 bg-black flex flex-col z-[60] md:hidden" // Ensure high z-index
        >
          <div className="w-full flex flex-col border-b border-gray-50">
            <div className="w-full aspect-square bg-black flex items-center justify-center relative">
              <Image 
                src="/log.png" 
                alt="Profile" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <nav className="flex flex-col w-full flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "relative w-full py-4 flex flex-col items-center justify-center border-b border-gray-50",
                  activeSection === section.id
                    ? "text-accent "
                    : "text-white hover:text-accent "
                )}
              >
                {getIcon(section.id)}
                <span className="text-xs mt-1 uppercase tracking-wider font-light">{section.label}</span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="mobileActiveSection" // Unique layoutId for mobile
                    className={`absolute left-0 top-0 h-full w-1 ${getSectionColor(section.id)} ${getSectionGlowClass(
                      section.id,
                    )}`}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="w-full py-4 flex flex-row items-center justify-center gap-4 border-t border-gray-50">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a
  href="https://www.linkedin.com/in/therealkennethwebber/"
  aria-label="LinkedIn"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition-colors"
>
  <Linkedin className="w-4 h-4" />
</a>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <MobileTopBar />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}
