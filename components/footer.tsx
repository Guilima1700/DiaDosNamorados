"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 sm:py-10 bg-gradient-to-b from-purple-50/50 to-pink-100/50">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500 fill-pink-500" />
          </div>
          <p className="font-dancing text-xl sm:text-2xl text-pink-600 mb-2">Feliz Dia dos Namorados!</p>
          <p className="font-montserrat text-pink-700 text-sm sm:text-base">Com todo meu amor, Kaue</p>
        </motion.div>
      </div>
    </footer>
  )
}
