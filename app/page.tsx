"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Timeline from "@/components/timeline"
import Gallery from "@/components/gallery"
import StackedGallery from "@/components/stacked-gallery"
import Playlist from "@/components/playlist"
import Message from "@/components/message"
import Footer from "@/components/footer"
import FloatingHearts from "@/components/floating-hearts"
import CalendarCounter from "@/components/calendar-counter"
import LoveButton from "@/components/love-button"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white text-pink-900 relative">
      <div className="relative z-10">
        <FloatingHearts />
        <Header />
        <motion.div style={{ opacity }} className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <FloatingHearts count={15} />
        </motion.div>
        <Hero />
        <Timeline />
        <Gallery />
        <StackedGallery />
        <Playlist />
        <Message />
        <Footer />
        <CalendarCounter />
        <LoveButton />
      </div>
    </main>
  )
}
