
"use client"

import type React from "react"
import { useState } from "react"
// import dynamic from "next/dynamic" // No longer needed for FloridaMap
import { Linkedin, MapPin, Phone, Mail, PhoneCall } from "lucide-react"
import SectionHeader from "@/components/section-header"
import type { SectionProps } from "@/types";

// FloridaMap is no longer imported or used dynamically
// const FloridaMap = dynamic(() => import("@/components/florida-map"), {
//   ssr: false,
// })

export default function ContactSection({ id }: SectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ name, email, message })
    alert("Message Sent! (Placeholder - implement actual submission logic)");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div 
      id={id} 
      className="flex h-full w-full text-white overflow-hidden relative" // Added relative for pseudo-element
      style={{
        // Fallback background color in case image doesn't load or for styling purposes
        // This will be mostly covered by the background image.
        backgroundColor: 'hsl(var(--section-bg-contact))', 
      }}
    >
      {/* Background Image div */}
      <div
        className="absolute inset-0 z-0 bg-fit"
{/*         className="absolute inset-0 z-0 bg-cover bg-center" */}
        style={{ backgroundImage: "url('/florida.png')" }}
        data-ai-hint="map florida"
      >
        {/* Overlay to darken the background image for better text contrast */}
        <div className="absolute inset-0 bg-black/60 z-1"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto">
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center min-h-full pt-8 px-4 pb-8">
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Contact Header */}
            <div className="flex flex-col items-center mb-12">
              <PhoneCall size={48} className="mb-4 text-accent" strokeWidth={1} />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight cyberpunk-text-glow">CONTACT</h1>
            </div>

            {/* Reach Me Section */}
            <div className="w-full mb-6">
              <div className="relative mb-4 flex justify-center">
                <SectionHeader title="REACH ME" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                <div className="flex flex-col items-center lg:flex-row bg-background/20 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <MapPin size={36} strokeWidth={1} className="text-accent" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">
                    <div>BASED IN</div>
                    <div>RIVERVIEW</div>
                    <div>FLORIDA, USA</div>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/20 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Phone size={36} strokeWidth={1} className="text-accent" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">TEL: (813) 419-9723</div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/20 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Mail size={36} strokeWidth={1} className="text-accent" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left lowercase">
                    KennethWebber @geekyandthebra.in
                  </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/20 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Linkedin size={36} strokeWidth={1} className="text-accent" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">FREELANCE AVAILABLE</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl w-full">
              <div className="relative mb-6 flex justify-center">
                <SectionHeader title="DROP ME A LINE" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background/20 backdrop-blur-sm p-6 rounded-lg cyberpunk-border"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs mb-2">NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/30 border border-accent/30 text-white flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs mb-2">EMAIL</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/30 border border-accent/30 text-white flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className="block text-xs mb-2">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-40 bg-background/30 border border-accent/30 text-white flex min-h-[80px] px-3 py-2 text-sm ring-offset-background placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 text-sm font-medium rounded-md cyberpunk-glow"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
