
"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Linkedin, MapPin, Phone, Mail, PhoneCall } from "lucide-react"
import SectionHeader from "@/components/section-header"
import type { SectionProps } from "@/types"

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
    <div id={id} className="relative h-full w-full text-white ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image.png"
          alt="Abstract contact background"
          data-ai-hint="abstract background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/50 z-10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex h-full items-start justify-center p-4 pt-16">
        <div className="w-full max-w-5xl flex flex-col items-center gap-y-4">
          {/* Main Contact Header */}
          <div className="flex flex-col  items-center">
            <PhoneCall size={48} className="mb-1 text-white" strokeWidth={1.5} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact</h1>
          </div>

          {/* Reach Me Section */}
          <div className="w-full ">
            <div className="flex justify-center  ">
              <SectionHeader title="REACH ME" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Info Box 1: Location */}
              <div className="flex flex-col items-center lg:flex-row p-2 rounded-lg ">
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
              <div className="flex flex-col items-center lg:flex-row  p-2 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Phone size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white">TEL: (813) 419-9723</div>
              </div>

              {/* Info Box 3: Email */}
              <div className="flex flex-col items-center lg:flex-row  p-2 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Mail size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white ">
                  KennethWebber<br/>@geekyandthebra.in
                </div>
              </div>

              {/* Info Box 4: LinkedIn */}
              <div className="flex flex-col items-center lg:flex-row  p-2 rounded-lg ">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 lg:mb-0 flex-shrink-0">
                  <Linkedin size={42} strokeWidth={1.5} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-center lg:text-left text-white">FREELANCE AVAILABLE</div>
              </div>
            </div>
          </div>

          {/* Drop Me A Line Section (Form) */}
          <div className="w-full md:px-12 items-center ">
            <div className="flex justify-center  mb-4 ">
              <SectionHeader title="DROP ME A LINE" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1"
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs mb-1 text-white uppercase">NAME</label>
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
                <label htmlFor="contact-email" className="block text-xs mb-1 text-white uppercase">EMAIL</label>
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
                <label htmlFor="contact-message" className="block text-xs mb-1 text-white uppercase">MESSAGE</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="w-full bg-input border border-accent/30 text-foreground flex min-h-[50px] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#21A2EF] hover:[#21A2EF]/80 text-white shadow-sm shadow-[#21A2EF] px-8 py-3 text-sm font-semibold rounded-md transition-colors uppercase"
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
