"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Gift, Camera, Music, Utensils } from "lucide-react"

// Substitua estes dados pelos momentos importantes do relacionamento
const timelineEvents = [
  {
    date: "27 de Abril de 2024",
    title: "Primeira vez que nos conhecemos",
    description:
      "Aniversario de um amigo nosso em comum, foi tipo amor a primeira vista, nunca irei esquecer desse dia",
    icon: <MapPin />,
  },
  {
    date: "04 de maio de 2024",
    title: "Nosso primeiro beijo",
    description: "Sob as estrelas, naquela noite perfeita que nunca vou esquecer.",
    icon: <Calendar />,
  },
  {
    date: "20 de Julho de 2024",
    title: "Pedido de namoro",
    description: "Quando oficializamos nosso amor no show de colo de Deus",
    icon: <Gift />,
  },
  {
    date: "10 de Outubro de 2024",
    title: "Nossa primeira viagem",
    description: "Aqueles dias em porto que foi simplesmente mágico",
    icon: <Camera />,
  },
  {
    date: "25 de Dezembro de 2024",
    title: "Nosso primeiro Natal juntos",
    description: "Aquele primeiro natal com sua familia que foi incrivel",
    icon: <Music />,
  },
  {
    date: "12 de Junho de 2024",
    title: "Nosso primeiro Dia dos Namorados",
    description: "Aquele buque de flores que te dei",
    icon: <Utensils />,
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="timeline" className="py-12 sm:py-20 bg-white/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-dancing text-3xl sm:text-4xl md:text-5xl text-center font-bold text-pink-600 mb-8 sm:mb-16"
        >
          Nossa História de Amor
        </motion.h2>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Linha vertical - oculta em mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden sm:block"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`mb-8 sm:mb-12 flex flex-col sm:flex-row ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="hidden sm:block sm:w-1/2"></div>
              <div className="relative w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center z-10 mx-auto sm:mx-4 mb-4 sm:mb-0 shadow-lg">
                <div className="text-white text-sm">{event.icon}</div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                  <span className="text-xs sm:text-sm text-pink-400 font-montserrat">{event.date}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-pink-700 mt-1 font-dancing leading-tight">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-pink-800 font-montserrat text-sm sm:text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
