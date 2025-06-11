"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart } from "lucide-react"
import confetti from "canvas-confetti"

export default function Message() {
  const [showMessage, setShowMessage] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Substitua com sua mensagem especial
  const specialMessage = `Meu amor,

Desde que você entrou na minha vida, tudo ganhou mais cor, mais sentido, mais amor.

Seu sorriso ilumina meus dias, seu carinho me acalma, e seu jeito me faz querer ser alguém melhor todos os dias. Você é minha paz no caos, meu abrigo nos momentos difíceis, e minha alegria em cada detalhe.

Obrigado por estar comigo, por me apoiar, por dividir seus sonhos comigo e transformar os meus em realidade só por estar ao meu lado. Cada momento com você vira uma lembrança especial, e cada dia ao seu lado é uma nova chance de te amar mais.

Você é minha namorada, minha parceira, minha melhor amiga, e o grande amor da minha vida.

Te amo mais do que palavras conseguem explicar.
Pra sempre nós. 💖`

  const handleClick = () => {
    setShowMessage(true)

    // Dispara confetti quando a mensagem é revelada
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#db2777", "#be185d"],
    })
  }

  return (
    <section id="message" className="py-12 sm:py-20 bg-white/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-dancing text-3xl sm:text-4xl md:text-5xl text-center font-bold text-pink-600 mb-8 sm:mb-16"
        >
          Uma Mensagem Especial Para Você
        </motion.h2>

        <div ref={ref} className="max-w-2xl mx-auto">
          {!showMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <p className="text-pink-700 mb-6 sm:mb-8 font-montserrat text-base sm:text-lg leading-relaxed">
                Clique no botão abaixo para ver uma mensagem especial que preparei para você...
              </p>
              <button
                onClick={handleClick}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0.5 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:shadow-pink-500/30 min-h-[44px] min-w-[44px]"
              >
                <span className="relative flex items-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 transition-all duration-300 group-hover:bg-transparent">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 group-hover:text-white transition-colors" />
                  <span className="text-pink-700 group-hover:text-white transition-colors text-sm sm:text-base">
                    Revelar Mensagem
                  </span>
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl border-2 border-pink-200 mx-4"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500 fill-pink-500" />
              </div>
              <div className="whitespace-pre-line font-dancing text-lg sm:text-xl text-pink-800 leading-relaxed text-center">
                {specialMessage}
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={() => setShowMessage(false)}
                  className="text-pink-500 hover:text-pink-700 font-montserrat text-sm sm:text-base min-h-[44px] px-4 py-2"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
