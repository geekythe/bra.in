"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"
import SectionHeader from "@/components/section-header"
import Image from "next/image"
import { getAboutServices, getAboutClients, type AboutService, type AboutClient } from "@/lib/hygraph"
import type { SectionProps } from "@/types";

export default function AboutSection({ id }: SectionProps) {
  const [services, setServices] = useState<AboutService[]>([])
  const [clients, setClients] = useState<AboutClient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAboutData() {
      try {
        setIsLoading(true)
        const [servicesData, clientsData] = await Promise.all([getAboutServices(), getAboutClients()])

        setServices(servicesData)
        setClients(clientsData)
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Work process steps (static data)
  const workProcess = [
    {
      icon: "M10 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm10 10h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2z M7 19v-6 M17 5v6",
      title: "DISCOVER",
    },
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      title: "IDEA",
    },
    {
      icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
      title: "DESIGN",
    },
    {
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      title: "DEVELOP",
    },
    {
      icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
      title: "TEST",
    },
    {
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      title: "LAUNCH",
    },
  ]

  // Fun facts data (static data)
  const funFacts = [
    {
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      title: "24 COUNTRIES",
      subtitle: "VISITED",
    },
    {
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      title: "72 ARTICLES",
      subtitle: "PUBLISHED",
    },
    {
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "20,000 CUPS",
      subtitle: "OF COFFEE",
    },
    {
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
      title: "12 AWARDS",
      subtitle: "WON",
    },
  ]

  const ServicesSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="animate-pulse flex flex-col items-center text-center">
          <div className="mb-6 w-20 h-20 bg-background/20 rounded-full"></div>
          <div className="h-5 bg-background/20 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-background/20 rounded w-full mb-2"></div>
          <div className="h-4 bg-background/20 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-background/20 rounded w-4/5"></div>
        </div>
      ))}
    </div>
  )

  const ClientsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="animate-pulse flex items-center justify-center">
          <div className="h-16 w-full bg-background/20 rounded"></div>
        </div>
      ))}
    </div>
  )

  return (
    <div id={id} className="h-full w-full overflow-y-auto bg-gradient-to-br from-[#6F42C1] to-[#4A2C80] py-12 px-4 animated-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex justify-center mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold text-white ">About Me</h1>
        </div>

        <div className="mb-20">
          <div className="flex justify-center mb-16">
            <SectionHeader title="SERVICES" />
          </div>

          {isLoading ? (
            <ServicesSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((serviceItem, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-background/10 p-6 rounded-lg backdrop-blur-sm cyberpunk-purple-glow"
                >
                  <div className="mb-6 w-20 h-20 relative">
                    <Image
                      src={serviceItem.service.icon?.url || "https://placehold.co/80x80.png"}
                      alt={serviceItem.service.title}
                      width={80}
                      height={80}
                      data-ai-hint="service icon"
                    />
                  </div>
                  <h3 className="text-white font-semibold mb-4">{serviceItem.service.title}</h3>
                  <p className="text-white/80 text-sm">{serviceItem.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pb-16">
          <div className="flex justify-center mb-16">
            <SectionHeader title="WORK PROCESS" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workProcess.map((step, index) => (
              <div
                key={index}
                className="bg-background/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center cyberpunk-border"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#21A2EF] mb-4"
                >
                  <path d={step.icon}></path>
                </svg>
                <h3 className="text-white text-sm font-medium">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex justify-center mb-16">
            <SectionHeader title="CLIENTS" />
          </div>

          {isLoading ? (
            <ClientsSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clients.map((clientItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-background/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="relative h-16 w-full">
                    <Image
                      src={clientItem.client.icon?.url || "https://placehold.co/100x64.png"}
                      alt={clientItem.client.title}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                       data-ai-hint="client logo"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-20">
          <div className="flex justify-center mb-16">
            <SectionHeader title="FUN FACT" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-background/10 p-6 rounded-lg backdrop-blur-sm cyberpunk-purple-glow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#EA3AB8] mb-4"
                >
                  <path d={fact.icon}></path>
                </svg>
                <h3 className="text-white font-bold text-xl mb-1 cyberpunk-text-glow">{fact.title}</h3>
                <p className="text-white/70 text-sm">{fact.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
