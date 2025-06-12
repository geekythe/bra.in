"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { getCertifications, type CertificationHygraph } from "@/lib/hygraph" // Use CertificationHygraph
import type { SectionProps } from "@/types";
import Image from "next/image"; // Import Image

export default function CertificationsSection({ id }: SectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedCertification, setSelectedCertification] = useState<CertificationHygraph | null>(null)
  const [certifications, setCertifications] = useState<CertificationHygraph[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCertificationsData() { // Renamed to avoid conflict
      try {
        setIsLoading(true)
        setError(null)

        const certificationsData = await getCertifications()

        const sortedCertifications = [...certificationsData].sort((a, b) => {
          if (a.order && b.order) return a.order - b.order
          return a.title.localeCompare(b.title)
        })

        setCertifications(sortedCertifications)

        const allCategories = certificationsData.flatMap((cert) => {
          if (!cert.category) return ["uncategorized"]
          if (typeof cert.category === "string" && cert.category.includes(",")) {
            return cert.category.split(",").map((cat) => cat.trim().toLowerCase())
          }
          if (Array.isArray(cert.category)) {
            return cert.category.map(cat => String(cat).trim().toLowerCase());
          }
          return [String(cert.category).toLowerCase()]
        })

        const uniqueCategories = Array.from(new Set(allCategories)).filter(Boolean).sort()
        setCategories(uniqueCategories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch certifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertificationsData()
  }, [])

  const filteredCertifications =
    activeFilter === "all"
      ? certifications
      : certifications.filter((cert) => {
          if (!cert.category) return false;
          const certCategories = Array.isArray(cert.category)
            ? cert.category.map(c => String(c).trim().toLowerCase())
            : typeof cert.category === 'string'
            ? cert.category.split(",").map((cat) => cat.trim().toLowerCase())
            : [String(cert.category).toLowerCase()];
          return certCategories.includes(activeFilter.toLowerCase());
        });


  const filters = [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category.toLowerCase(),
      label: category.toUpperCase(),
    })),
  ]

  const getNavigationIndices = () => {
    if (!selectedCertification) return { prev: null, next: null }

    const currentCategory = Array.isArray(selectedCertification.category) 
        ? selectedCertification.category[0]?.toString().toLowerCase() 
        : selectedCertification.category?.toString().toLowerCase();

    const categoryFilteredCerts = certifications.filter((cert) => {
      if (!cert.category) return false
      const certCategories = Array.isArray(cert.category)
            ? cert.category.map(c => String(c).trim().toLowerCase())
            : typeof cert.category === 'string'
            ? cert.category.split(",").map((cat) => cat.trim().toLowerCase())
            : [String(cert.category).toLowerCase()];
      return certCategories.includes(currentCategory!);
    })

    const currentIndex = categoryFilteredCerts.findIndex(
      (cert) => cert.uniqueId === selectedCertification.uniqueId
    )

    return {
      prev: categoryFilteredCerts[currentIndex - 1] || null,
      next: categoryFilteredCerts[currentIndex + 1] || null,
    }
  }
  
  const CertificationSkeleton = () => (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-background/10 backdrop-blur-sm rounded-md overflow-hidden shadow-md cyberpunk-border"
        >
          <div className="h-48 bg-background/20 flex items-center justify-center">
             <div className="w-32 h-32 bg-background/30 rounded"></div>
          </div>
          <div className="p-6 text-center">
            <div className="h-5 bg-background/20 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-background/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  );


  return (
    <div className="h-full w-full bg-[#4b3f7b] overflow-y-auto py-12 px-4 md:px-8 relative">
      {selectedCertification ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#4b3f7b] z-50 overflow-y-auto"
        >
          <div className="w-full absolute top-1/2 flex justify-center items-center">
            <div className="w-full max-w-7xl mt-8 flex justify-between items-center px-4 py-2 rounded">
              {getNavigationIndices().prev ? (
                <button
                  onClick={() => setSelectedCertification(getNavigationIndices().prev)}
                  className="px-3 py-3 bg-[#6F42C1] text-white rounded-md hover:bg-[#6F42C1]/80 transition-colors"
                >
                  <ChevronLeft />
                </button>
              ) : (
                <div></div>
              )}

              {getNavigationIndices().next && (
                <button
                  onClick={() => setSelectedCertification(getNavigationIndices().next)}
                  className="px-3 py-3 bg-[#EA3AB8] text-white rounded-md hover:bg-[#EA3AB8]/80 transition-colors"
                >
                  <ChevronRight />
                </button>
              )}
            </div>
          </div>

          <div className="min-h-screen py-12 md:py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setSelectedCertification(null)}
                className="flex items-center text-white hover:text-white/80 mb-8 group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span>Back to certifications</span>
              </button>

              <div className="rounded-lg cyberpunk-border bg-black shadow-xl overflow-hidden">
                <div className="h-64 bg-black md:h-90 lg:h-124 xl:h-[36rem] border-2 border-gray-50 shadow-xl bg-background/20 flex items-center justify-center">
                  <img
                    src={selectedCertification.image.url}
                    alt={selectedCertification.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-8 bg-gray-300 text-black">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-3xl md:text-4xl font-bold text-white cyberpunk-text-glow">
                        {selectedCertification.title}
                      </h1>
                      <span className="text-sm font-medium px-3 py-1 rounded-full">
                        {selectedCertification.date}
                      </span>
                    </div>
                    <p className=" text-lg mb-8">Issued by <strong className="underline">{selectedCertification.issuer}</strong></p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold  mb-4">Certification Overview</h2>
                        <p className=" mb-6 leading-relaxed">{selectedCertification.description}</p>
                        {selectedCertification.details && (
                          <p className=" leading-relaxed">{selectedCertification.details}</p>
                        )}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold  mb-4">Certification Details</h2>

                        <div className="mb-6">
                          <h3 className="text-sm font-medium  mb-2">CATEGORY</h3>
                          <div className="flex flex-wrap gap-2">
                            {(() => {
                              const cats =
                                typeof selectedCertification.category === "string" &&
                                selectedCertification.category.includes(",")
                                  ? selectedCertification.category.split(",").map((cat) => cat.trim())
                                  : [selectedCertification.category]

                              return cats.map((category, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-[#EA3AB8]/20 text-[#EA3AB8] text-sm rounded-full"
                                >
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </span>
                              ))
                            })()}
                          </div>
                        </div>

                        {/* <div className="mb-6">
                          <h3 className="text-sm font-medium  mb-2">CREDENTIAL ID</h3>
                          <p className="">{selectedCertification.credentialId}</p>
                        </div> */}

                        {selectedCertification.skill?.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-sm font-medium  mb-2">SKILLS</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedCertification.skill.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-[#6F42C1]/20 text-[#6F42C1] text-sm rounded-full"
                                >
                                  {skill.techused}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedCertification.credentialurl && (
                        <div>
                          {/* href={selectedCertification.credentialurl} */}
                        <a
                          href="https://www.linkedin.com/in/therealkennethwebber/details/certifications/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full font-bold text-center px-6 py-3 bg-[#EA3AB8] text-white rounded-md hover:bg-[#EA3AB8]/80 transition-all"
                          style={{
                            textShadow: `
                              1.5px 1px 0 #000,
                              2px 1.5px 0 #000,
                              2.5px 2px 0 #000
                            `,
                          }}
                        >
                          Verify Credential
                        </a>
                      </div>
                      
                      
                        
                        
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-2">
              <Award className="text-white" size={24} />
            </div>
            <h2 className="text-5xl font-bold text-white mb-12 ">Certifications</h2>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`text-sm tracking-wider ${
                    activeFilter === filter.id ? "text-white font-medium" : "text-white/70 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-center mb-8">
              <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">Error Loading Certifications</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredCertifications.length === 0 && (
            <div className="text-center mb-8">
              <div className="bg-yellow-500/20 border border-yellow-500 text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">No Certifications Found</h3>
                <p>
                  {activeFilter === "all"
                    ? "No certifications are available."
                    : `No certifications found for category: ${activeFilter}`}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <p className="text-white text-center w-full col-span-full">Loading...</p>
            ) : (
              filteredCertifications.map((certification) => (
                <div
                  key={certification.uniqueId || certification.credentialId || certification.title}
                  className="bg-background/10 backdrop-blur-sm rounded-md overflow-hidden shadow-md cursor-pointer cyberpunk-border"
                  onClick={() => setSelectedCertification(certification)}
                >
                  <div className="h-48 overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={certification.image?.url || "/placeholder.svg"}
                      alt={certification.title}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-white">{certification.title}</h3>
                    <p className="text-sm text-white/70">{certification.issuer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
