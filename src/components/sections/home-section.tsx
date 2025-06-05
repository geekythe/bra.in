"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { SectionProps } from "@/types"; // Import SectionProps

// Accept id, even if not used directly, for MainLayout
export default function HomeSection({ id }: SectionProps) {
  const [typedText, setTypedText] = useState("")
  const phrases = ["a blogger.", "a wordpress lover.", "an adventurer."]
  const currentPhraseIndex = useRef(0)
  const currentCharIndex = useRef(0)
  const isDeleting = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null) // Not used in current iframe setup

  useEffect(() => {
    const typeText = () => {
      const currentPhrase = phrases[currentPhraseIndex.current]

      if (isDeleting.current) {
        setTypedText(currentPhrase.substring(0, currentCharIndex.current - 1))
        currentCharIndex.current -= 1

        if (currentCharIndex.current === 0) {
          isDeleting.current = false
          currentPhraseIndex.current = (currentPhraseIndex.current + 1) % phrases.length
          setTimeout(typeText, 500) // Pause before typing next phrase
          return
        }
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex.current + 1))
        currentCharIndex.current += 1

        if (currentCharIndex.current === currentPhrase.length) {
          isDeleting.current = true
          setTimeout(typeText, 1500) // Pause before deleting
          return
        }
      }

      const typingSpeed = isDeleting.current ? 50 : 150
      setTimeout(typeText, typingSpeed)
    }

    // Start typing animation only on client-side
    const timeoutId = setTimeout(typeText, 100); 

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [])

  // playbackRate is not applicable for YouTube iframe directly via ref like this
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.playbackRate = 0.5 
  //   }
  // }, [])

  return (
    <div id={id} className="h-full w-full relative overflow-hidden bg-gradient-to-br from-[#1F1C6A] to-[#141144] animated-gradient">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#4B3F7B]/80 z-10"></div>
               <iframe
          src="https://www.youtube.com/embed/sQ22pm-xvrE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=sQ22pm-xvrE"
          className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end text-white text-center px-4 pb-12">
        <div className="w-full flex flex-col  items-center mb-8 ">
          <p className="text-xl mb-2 font-light ">Hi, I am</p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 ">Kenneth Webber</h1>

          <h4 className="text-xl mb-8">
            I am{" "}
            <strong className="text-[#21A2EF] ">
              {typedText}
              <span className="animate-pulse">|</span>
            </strong>
          </h4>

          <div className="flex items-center justify-center mb-4">
             <p className="text-lg md:text-xl pl-3.5">10 Years In</p>
            
            <div className="mx-3 relative w-20 h-20">
              <Image src="/500.png" alt="Inc 500" fill className="object-contain" priority data-ai-hint="company logo award"/>
            </div>
            <p className="text-lg md:text-xl">Fortune 500</p>
          </div>
        </div>
      </div>
    </div>
  )
}
