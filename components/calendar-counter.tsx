"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Heart, X } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CalendarCounter() {
  const [showModal, setShowModal] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Data de início do relacionamento: 20 de julho de 2024
  const startDate = new Date("2024-07-20T00:00:00")

  const calculateTimeElapsed = () => {
    const now = new Date()
    const difference = now.getTime() - startDate.getTime()

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed())
    }, 1000)

    // Calcular imediatamente na primeira renderização
    setTimeElapsed(calculateTimeElapsed())

    return () => clearInterval(timer)
  }, [])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {/* Botão fixo */}
      <motion.button
        onClick={openModal}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 min-h-[44px] min-w-[44px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="font-montserrat font-semibold hidden sm:block text-sm">Calendário</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-4 sm:p-8 relative mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-pink-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
              </button>

              {/* Cabeçalho */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="bg-pink-100 p-2 sm:p-3 rounded-full">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500 fill-pink-500" />
                  </div>
                </div>
                <h2 className="font-dancing text-2xl sm:text-3xl font-bold text-pink-600 mb-2">Nosso Tempo Juntos</h2>
                <p className="text-pink-700 font-montserrat text-sm sm:text-base">Desde 20 de Julho de 2024</p>
              </div>

              {/* Contador */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 sm:p-4 rounded-xl text-center border border-pink-100">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600 font-montserrat">{timeElapsed.days}</div>
                  <div className="text-xs sm:text-sm text-pink-500 font-montserrat">
                    {timeElapsed.days === 1 ? "Dia" : "Dias"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 sm:p-4 rounded-xl text-center border border-pink-100">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600 font-montserrat">{timeElapsed.hours}</div>
                  <div className="text-xs sm:text-sm text-pink-500 font-montserrat">
                    {timeElapsed.hours === 1 ? "Hora" : "Horas"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 sm:p-4 rounded-xl text-center border border-pink-100">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600 font-montserrat">
                    {timeElapsed.minutes}
                  </div>
                  <div className="text-xs sm:text-sm text-pink-500 font-montserrat">
                    {timeElapsed.minutes === 1 ? "Minuto" : "Minutos"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 sm:p-4 rounded-xl text-center border border-pink-100">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600 font-montserrat">
                    {timeElapsed.seconds}
                  </div>
                  <div className="text-xs sm:text-sm text-pink-500 font-montserrat">
                    {timeElapsed.seconds === 1 ? "Segundo" : "Segundos"}
                  </div>
                </div>
              </div>

              {/* Mensagem especial */}
              <div className="text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 sm:p-4 rounded-xl">
                <p className="font-dancing text-base sm:text-lg">Cada segundo ao seu lado é especial! 💕</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
