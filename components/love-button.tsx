"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const loveMessages = [
  { language: "Português", message: "Eu te amo", flag: "🇧🇷" },
  { language: "Inglês", message: "I love you", flag: "🇺🇸" },
  { language: "Espanhol", message: "Te amo", flag: "🇪🇸" },
  { language: "Francês", message: "Je t'aime", flag: "🇫🇷" },
  { language: "Italiano", message: "Ti amo", flag: "🇮🇹" },
  { language: "Alemão", message: "Ich liebe dich", flag: "🇩🇪" },
  { language: "Japonês", message: "愛してる", flag: "🇯🇵" },
  { language: "Coreano", message: "사랑해", flag: "🇰🇷" },
  { language: "Russo", message: "Я тебя люблю", flag: "🇷🇺" },
  { language: "Árabe", message: "أحبك", flag: "🇸🇦" },
]

export default function LoveButton() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Carregar o último índice do localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem("loveButtonIndex")
    if (savedIndex) {
      setCurrentIndex(Number.parseInt(savedIndex))
    }
  }, [])

  // Salvar o índice atual no localStorage
  useEffect(() => {
    localStorage.setItem("loveButtonIndex", currentIndex.toString())
  }, [currentIndex])

  const handleClick = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setShowMessage(true)

    // Avançar para o próximo idioma após um tempo
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % loveMessages.length)
      setIsAnimating(false)
    }, 2000)

    // Esconder a mensagem após um tempo
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  const currentMessage = loveMessages[currentIndex]

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        onClick={handleClick}
        disabled={isAnimating}
        className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-red-400 disabled:to-pink-400 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 min-h-[44px] font-montserrat font-semibold text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.6, repeat: isAnimating ? 2 : 0 }}
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
        </motion.div>
        <span className="hidden sm:inline">Diga que me ama</span>
        <span className="sm:hidden">💕</span>
      </motion.button>

      {/* Mensagem de amor */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corações flutuantes de fundo */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-pink-200"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>

              {/* Conteúdo principal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                <div className="text-4xl sm:text-5xl mb-4">{currentMessage.flag}</div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-dancing text-2xl sm:text-3xl font-bold text-pink-600 mb-2"
                >
                  {currentMessage.message}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-pink-500 font-montserrat text-sm sm:text-base"
                >
                  em {currentMessage.language}
                </motion.p>
              </motion.div>

              {/* Coração pulsante */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              </motion.div>

              {/* Indicador de progresso */}
              <div className="mt-6 flex justify-center gap-1">
                {loveMessages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? "bg-pink-500" : "bg-pink-200"
                    }`}
                  />
                ))}
              </div>

              {/* Texto de instrução */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-pink-400 mt-4 font-montserrat"
              >
                Toque em qualquer lugar para fechar
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partículas de coração quando clica */}
      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-500"
                style={{
                  left: "20px",
                  bottom: "100px",
                }}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  x: Math.random() * 200 - 100,
                  y: -Math.random() * 150 - 50,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
