"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    L: any
  }
}

export default function FloridaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Load Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    link.crossOrigin = ""
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    script.crossOrigin = ""

    script.onload = () => {
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        // Initialize the map centered on Florida
        const map = window.L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          scrollWheelZoom: false,
          boxZoom: false,
          keyboard: false,
        }).setView([27.4663, -81.6404], 8 ) // Florida coordinates

        // Add OpenStreetMap tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Add some markers for major Florida cities
        const cities = [
       
          { name: "Riverview", coords: [27.8646, -82.3193] },
         
        ]

        cities.forEach((city) => {
          window.L.marker(city.coords).addTo(map).bindPopup(`<b>${city.name}</b>`)
        })

        mapInstanceRef.current = map

        // Handle resize
        const handleResize = () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize()
          }
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }
    }

    document.head.appendChild(script)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      // Clean up script and link elements
      document.head.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full opacity-60" style={{ filter: "sepia(20%) saturate(80%)" }} />
}
