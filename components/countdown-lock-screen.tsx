"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface FloatingHeart {
  id: number
  left: string
  top: string
  fontSize: string
  duration: number
  delay: number
}

export default function CountdownLockScreen() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Data alvo: 12 de junho à meia-noite
  const targetDate = useMemo(() => {
    return new Date(new Date().getFullYear(), 5, 12, 0, 0, 0) // Mês é 0-indexed, então 5 = junho
  }, [])

  // Criar corações flutuantes uma única vez
  const floatingHearts = useMemo<FloatingHeart[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 30 + 20}px`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  }, []) // Array vazio para criar apenas uma vez

  // Calcular tempo restante
  const calculateTimeLeft = useCallback(() => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    }
  }, [targetDate])

  // useEffect separado para mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect separado para o contador
  useEffect(() => {
    if (!mounted) return

    // Verificar se já passou da data
    const now = new Date()
    if (now >= targetDate) {
      setIsUnlocked(true)
      return
    }

    // Calcular tempo inicial
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)

    // Se já chegou a zero, desbloquear
    if (initialTime.days === 0 && initialTime.hours === 0 && initialTime.minutes === 0 && initialTime.seconds === 0) {
      setIsUnlocked(true)
      return
    }

    // Criar intervalo para atualizar contador
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Verificar se chegou a zero
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsUnlocked(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted, targetDate, calculateTimeLeft])

  // Não renderizar nada durante SSR
  if (!mounted) return null

  // Se já passou da data, não mostrar a tela de bloqueio
  if (isUnlocked) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-pink-500 to-red-600 flex flex-col items-center justify-center overflow-hidden">
      {/* Corações flutuantes de fundo - agora com animação contínua */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id} // Key estável baseada no ID
            className="absolute text-white/20"
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: heart.fontSize,
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: heart.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: heart.delay,
              ease: "linear",
            }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-white mx-auto mb-6 fill-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-dancing text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Surpresa Especial
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 font-montserrat text-base sm:text-lg mb-8 leading-relaxed"
          >
            Seu namorado Guilherme lindo está preparando uma surpresa especial para o Dia dos Namorados. Aguarde!
          </motion.p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
            <CountdownUnit value={timeLeft.days} label="Dias" />
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <CountdownUnit value={timeLeft.seconds} label="Seg" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/70 font-montserrat text-sm"
          >
            O site será desbloqueado automaticamente no Dia dos Namorados
          </motion.div>
        </div>
      </div>

      {/* Assinatura */}
      <div className="absolute bottom-6 text-center w-full text-white/50 font-montserrat text-sm">
        <p>Com muito amor, Guigui ❤️</p>
      </div>
    </div>
  )
}

// Componente para cada unidade do contador - Memoizado para evitar re-renderizações desnecessárias
const CountdownUnit = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-montserrat">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm text-white/80 font-montserrat">{label}</div>
    </div>
  )
}
