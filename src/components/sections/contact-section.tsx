
"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Linkedin, MapPin, Phone, Mail, PhoneCall } from "lucide-react"
import SectionHeader from "@/components/section-header"
import type { SectionProps } from "@/types"

// Import Leaflet map with no SSR
const FloridaMap = dynamic(() => import("@/components/florida-map"), {
  ssr: false,
})

export default function ContactSection({ id }: SectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { name, email, message })
    // You can add a toast notification here
    alert("Message sent (simulated)!")
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div id={id} className="relative h-full w-full text-white overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <FloridaMap />
      </div>

      {/* Content Overlay - scrollable */}
      <div className="relative z-10 flex flex-col items-center bg-background/40  h-full overflow-y-auto py-6 md:py-8 px-4 md:px-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
        <div className="w-full max-w-5xl">
          {/* Main Contact Header */}
          <div className="flex flex-col items-center mb-6">
            <PhoneCall size={48} className="mb-4 text-white" strokeWidth={1.5} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight ">Contact</h1>
          </div>

          {/* Reach Me Section */}
          <div className="w-full mb-2">
            <div className="flex justify-center">
              <SectionHeader title="REACH ME" />
            </div>
            <div className="grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Info Box 1: Location */}
              <div className="flex flex-col items-center lg:flex-row p-4 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <MapPin size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white">
                  <div>BASED IN</div>
                  <div>RIVERVIEW</div>
                  <div>FLORIDA, USA</div>
                </div>
              </div>

              {/* Info Box 2: Phone */}
              <div className="flex flex-col items-center lg:flex-row  p-4 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Phone size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white">TEL: (813) 419-9723</div>
              </div>

              {/* Info Box 3: Email */}
              <div className="flex flex-col items-center lg:flex-row  p-4 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Mail size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white ">
                  KennethWebber<br/>@geekyandthebra.in
                </div>
              </div>

              {/* Info Box 4: LinkedIn */}
              <div className="flex flex-col items-center lg:flex-row  p-4 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Linkedin size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white">FREELANCE AVAILABLE</div>
              </div>
            </div>
          </div>

          {/* Drop Me A Line Section (Form) */}
          <div className="w-full md:px-16 items-center pb-6">
            <div className="flex justify-center mb-2">
              <SectionHeader title="DROP ME A LINE" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6  p-3 rounded-lg "
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs mb-2 text-white uppercase">NAME</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-input border border-accent/30 text-foreground flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs mb-2 text-white uppercase">EMAIL</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border border-accent/30 text-foreground flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-message" className="block text-xs mb-2 text-white uppercase">MESSAGE</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="w-full bg-input border border-accent/30 text-foreground flex min-h-[80px] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-3 text-sm font-semibold rounded-md  transition-colors"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

    
