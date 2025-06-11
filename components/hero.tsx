"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden px-4">
      <div className="container mx-auto py-12 sm:py-20 flex flex-col items-center text-center z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-pink-500 fill-pink-500 mx-auto" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-dancing text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600 mb-4 sm:mb-6 leading-tight"
        >
          Feliz Dia dos Namorados
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-montserrat text-base sm:text-xl md:text-2xl text-pink-800 max-w-2xl mb-8 sm:mb-10 leading-relaxed px-4"
        >
          Para a pessoa mais especial da minha vida, que faz meu coração bater mais forte a cada dia, como se
          estivéssemos sempre na mesma sintonia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#timeline"
            className="font-montserrat bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px] inline-flex items-center justify-center"
          >
            Nossa História
          </a>
        </motion.div>
      </div>
    </section>
  )
}
