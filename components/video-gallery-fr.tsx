"use client"

import { useState, useRef, useEffect } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

const VIDEOS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akupanel%20240%20_%20E%CC%81liminez%20la%20re%CC%81verbe%CC%81ration%20-%20WoodUpp-2-eKZtlhcQPAKFYRd6PK8pXZ3i0Cv4XO.mp4",
    label: "Client",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akupanel%20240%20_%20E%CC%81liminez%20la%20re%CC%81verbe%CC%81ration%20-%20WoodUpp-3-3C4xW1cYlltiGsbtVtdVGi7eLGtkRG.mp4",
    label: "Client",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akupanel%20240%20_%20E%CC%81liminez%20la%20re%CC%81verbe%CC%81ration%20-%20WoodUpp-4-mSEg1welpEmB59DXWCjwj7MkqFWrJS.mp4",
    label: "Client",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Akupanel%20240%20_%20E%CC%81liminez%20la%20re%CC%81verbe%CC%81ration%20-%20WoodUpp-6-0qD7LaI2eTiaRCEsNB9bHJSgXqWdLV.mp4",
    label: "Client",
  },
]

export function VideoGalleryFr() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [currentDot, setCurrentDot] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Handle scroll to update dots
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleScroll = () => {
      const items = scrollEl.querySelectorAll(".gallery-item")
      if (!items.length) return
      const firstItem = items[0] as HTMLElement
      const idx = Math.round(scrollEl.scrollLeft / (firstItem.offsetWidth + 12))
      setCurrentDot(Math.min(idx, VIDEOS.length - 1))
    }

    scrollEl.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollEl.removeEventListener("scroll", handleScroll)
  }, [])

  // Pause video when out of viewport
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const video = entry.target.querySelector("video") as HTMLVideoElement
            if (video && !video.paused) {
              video.pause()
              const idx = videoRefs.current.findIndex((v) => v === video)
              if (idx !== -1 && activeIndex === idx) {
                setActiveIndex(null)
              }
            }
          }
        })
      },
      { threshold: 0.25 }
    )

    const items = document.querySelectorAll(".gallery-item")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [activeIndex])

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index && !v.paused) {
          v.pause()
        }
      })
      video.play()
      setActiveIndex(index)
    } else {
      video.pause()
      setActiveIndex(null)
    }
  }

  return (
    <section className="py-10 sm:py-16 overflow-hidden">
      {/* Header */}
      <div className="text-center px-4 mb-6 sm:mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2">
          Galerie
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          Regardez ces magnifiques projets de nos clients et laissez-vous inspirer !
        </p>
      </div>

      {/* Gallery Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-snap-x-mandatory pb-4 px-4 scrollbar-hide md:grid md:grid-cols-2 md:gap-4 md:overflow-x-visible md:max-w-[700px] md:mx-auto lg:grid-cols-4 lg:max-w-[1060px] lg:gap-5 lg:px-10"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {VIDEOS.map((video, index) => (
          <div
            key={index}
            className={cn(
              "gallery-item flex-shrink-0 w-[72vw] max-w-[300px] md:w-full md:max-w-none relative rounded-2xl lg:rounded-[20px] overflow-hidden bg-foreground/90 cursor-pointer",
              "scroll-snap-align-start"
            )}
            style={{
              aspectRatio: "9 / 16",
              scrollSnapAlign: "start",
            }}
            onClick={() => toggleVideo(index)}
          >
            <video
              ref={(el) => { videoRefs.current[index] = el }}
              src={video.src}
              playsInline
              preload="metadata"
              loop
              muted
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/55 to-transparent rounded-b-2xl lg:rounded-b-[20px] pointer-events-none" />

            {/* Play button */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
                activeIndex === index ? "opacity-0" : "opacity-100"
              )}
            >
              <div className="w-14 h-14 lg:w-[60px] lg:h-[60px] rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 lg:w-7 lg:h-7 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>

            {/* Badge */}
            <span className="absolute bottom-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {video.label}
            </span>
          </div>
        ))}
      </div>

      {/* Dots (mobile only) */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {VIDEOS.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-200",
              currentDot === index
                ? "bg-accent scale-125"
                : "bg-border"
            )}
          />
        ))}
      </div>
    </section>
  )
}
