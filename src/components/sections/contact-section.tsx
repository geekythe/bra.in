"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Linkedin, MapPin, Phone, Mail, PhoneCall } from "lucide-react"
import SectionHeader from "@/components/section-header"
import type { SectionProps } from "@/types";

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
    console.log({ name, email, message })
    // Basic toast notification
    alert("Message Sent! (Check console for details)");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div id={id} className="h-full w-full text-white overflow-hidden bg-[#666C73]">
      {/* Main Content - Ensure this div allows scrolling if content exceeds viewport */}
      <div className="flex-1 relative overflow-y-auto h-full">
        {/* Map Background */}
        <div className="fixed inset-0 z-0">
          <FloridaMap />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center min-h-full pt-8 px-4 pb-8">
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Contact Header */}
            <div className="flex flex-col items-center mb-12">
              <PhoneCall size={48} className="mb-4 text-[#EA3AB8]" strokeWidth={1} />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight cyberpunk-text-glow">CONTACT</h1>
            </div>

            {/* Reach Me Section */}
            <div className="w-full mb-6">
              <div className="relative mb-4 flex justify-center">
                <SectionHeader title="REACH ME" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                <div className="flex flex-col items-center lg:flex-row bg-background/10 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <MapPin size={42} strokeWidth={1} className="text-[#EA3AB8]" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">
                    <div>BASED IN</div>
                    <div>RIVERVIEW</div>
                    <div>FLORIDA, USA</div>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/10 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Phone size={42} strokeWidth={1} className="text-[#EA3AB8]" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">TEL: (813) 419-9723</div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/10 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Mail size={42} strokeWidth={1} className="text-[#EA3AB8]" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left lowercase">
                    KennethWebber @geekyandthebra.in
                  </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row bg-background/10 backdrop-blur-sm p-4 rounded-lg cyberpunk-border">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Linkedin size={42} strokeWidth={1} className="text-[#EA3AB8]" />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">FREELANCE AVAILABLE</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl w-full"> {/* Changed max-w-8xl to max-w-3xl for better form appearance */}
              <div className="relative mb-6 flex justify-center">
                <SectionHeader title="DROP ME A LINE" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background/10 backdrop-blur-sm p-6 rounded-lg cyberpunk-border"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs mb-2">NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/20 border border-[#EA3AB8]/30 text-white flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA3AB8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
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
                    className="w-full bg-background/20 border border-[#EA3AB8]/30 text-white flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA3AB8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className="block text-xs mb-2">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-40 bg-background/20 border border-[#EA3AB8]/30 text-white flex min-h-[80px] px-3 py-2 text-sm ring-offset-background placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA3AB8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-[#EA3AB8] hover:bg-[#EA3AB8]/80 text-white px-6 py-3 text-sm font-medium rounded-md cyberpunk-glow"
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
