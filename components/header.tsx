"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Menu, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const menuItems = [
    { href: "#timeline", label: "Nossa História" },
    { href: "#gallery", label: "Galeria" },
    { href: "#playlist", label: "Playlist" },
    { href: "#message", label: "Mensagem" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500 fill-pink-500" />
          <span className="font-dancing text-xl sm:text-2xl font-bold text-pink-600">Nosso Amor</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 font-montserrat">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href.slice(1))}
                  className="text-pink-700 hover:text-pink-500 transition-colors cursor-pointer text-sm lg:text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-pink-600 hover:text-pink-500 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg md:hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href.slice(1))}
                      className="block text-pink-700 hover:text-pink-500 transition-colors cursor-pointer font-montserrat text-lg py-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
