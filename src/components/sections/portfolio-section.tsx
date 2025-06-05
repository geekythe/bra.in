"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { getPortfolioProjects, type PortfolioProjectHygraph } from "@/lib/hygraph"
import type { SectionProps } from "@/types";
import Image from "next/image"; // Import Image

export default function PortfolioSection({ id }: SectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioProjectHygraph | null>(null)
  const [projects, setProjects] = useState<PortfolioProjectHygraph[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true)
        const projectsData = await getPortfolioProjects()
        setProjects(projectsData)

        const allCategories = projectsData.flatMap((project) => {
          if (Array.isArray(project.category)) {
            return project.category.map((c) => c.pcategory);
          } else if (project.category && typeof project.category === 'object' && 'pcategory' in project.category) {
            return [(project.category as { pcategory: string }).pcategory];
          }
          return [];
        }).filter(Boolean);


        const uniqueCategories = Array.from(new Set(allCategories as string[]))
          .sort((a, b) => a.localeCompare(b))

        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching portfolio projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => {
        if (Array.isArray(project.category)) {
          return project.category.some((cat) => cat.pcategory === activeFilter);
        } else if (project.category && typeof project.category === 'object' && 'pcategory' in project.category) {
          return (project.category as { pcategory: string }).pcategory === activeFilter;
        }
        return false;
      });

  const filters = [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category,
      label: category.toUpperCase(),
    })),
  ]

  const ProjectSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-background/10 backdrop-blur-sm rounded-md overflow-hidden shadow-md cyberpunk-border"
        >
          <div className="h-48 bg-background/20"></div>
          <div className="p-6 text-center">
            <div className="h-5 bg-background/20 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-background/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div id={id} className="h-full w-full bg-[#6E3F7B] overflow-y-auto py-12 px-4 md:px-8 relative">
    <AnimatePresence>
      {selectedProject ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#6E3F7B] z-50 overflow-y-auto"
        >
          <div className="min-h-screen py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center text-white hover:text-white/80 mb-8 group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span>Back to portfolio</span>
              </button>

              <div className="bg-background/10 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden cyberpunk-border">
                <div className="h-64 md:h-96 bg-background/20 overflow-hidden">
                  <img
                    src={selectedProject.image?.url || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-8">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 cyberpunk-text-glow">
                      {selectedProject.title}
                    </h1>
                    <p className="text-white/70 text-lg mb-8">{selectedProject.subtitle}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
                        <p className="text-white/90 mb-6 leading-relaxed">{selectedProject.description}</p>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>

                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-white/70 mb-2">CATEGORIES</h3>
                          <div className="flex flex-wrap gap-2">
                            {(Array.isArray(selectedProject.category)
                              ? selectedProject.category.map((c) => c.pcategory)
                              : [selectedProject.category?.pcategory]
                            ).map((category, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-sm rounded-full"
                              >
                                {category?.charAt(0).toUpperCase() + category?.slice(1)}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-white/70 mb-2">TECHNOLOGIES</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technology?.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-[#21A2EF]/20 text-[#21A2EF] text-sm rounded-full"
                              >
                                {tech.techused}
                              </span>
                            ))}
                          </div>
                        </div>
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
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-2">
              <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-white mb-12 ">Portfolio</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`text-sm tracking-wider transition-colors ${
                    activeFilter === filter.id
                      ? "text-white font-bold underline"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <ProjectSkeleton />
            ) : (
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.number}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-background/10 backdrop-blur-sm rounded-md overflow-hidden shadow-md cursor-pointer cyberpunk-border"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="h-48 overflow-hidden bg-background/20">
                      <img
                        src={project.image?.url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="text-sm text-white/70">{project.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  </div>
  )
}
