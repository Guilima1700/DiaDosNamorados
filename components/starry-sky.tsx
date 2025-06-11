"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  moveSpeed: number
  moveDirection: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

interface Constellation {
  points: { x: number; y: number }[]
  connections: [number, number][]
}

export default function StarrySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [showMessage, setShowMessage] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [constellations, setConstellations] = useState<{
    heart: Constellation
    initials: Constellation
    date: Constellation
  }>()

  // Criar constelações baseadas no tamanho da tela
  const createConstellations = (width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Constelação do coração
    const heartPoints = [
      { x: centerX, y: centerY + 30 }, // ponta inferior
      { x: centerX - 20, y: centerY }, // esquerda meio
      { x: centerX - 30, y: centerY - 20 }, // esquerda superior
      { x: centerX - 15, y: centerY - 35 }, // esquerda topo
      { x: centerX, y: centerY - 25 }, // centro topo
      { x: centerX + 15, y: centerY - 35 }, // direita topo
      { x: centerX + 30, y: centerY - 20 }, // direita superior
      { x: centerX + 20, y: centerY }, // direita meio
    ]

    const heartConnections: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
    ]

    // Constelação das iniciais "K + A"
    const initialsPoints = [
      // K
      { x: centerX - 120, y: centerY - 80 },
      { x: centerX - 120, y: centerY - 40 },
      { x: centerX - 120, y: centerY },
      { x: centerX - 120, y: centerY + 40 },
      { x: centerX - 100, y: centerY - 20 },
      { x: centerX - 80, y: centerY - 40 },
      { x: centerX - 80, y: centerY + 20 },

      // +
      { x: centerX - 40, y: centerY - 20 },
      { x: centerX - 40, y: centerY + 20 },
      { x: centerX - 60, y: centerY },
      { x: centerX - 20, y: centerY },

      // A
      { x: centerX + 20, y: centerY + 40 },
      { x: centerX + 40, y: centerY - 80 },
      { x: centerX + 60, y: centerY + 40 },
      { x: centerX + 30, y: centerY - 20 },
      { x: centerX + 50, y: centerY - 20 },
    ]

    const initialsConnections: [number, number][] = [
      // K
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [4, 6],
      // +
      [7, 8],
      [9, 10],
      // A
      [11, 12],
      [12, 13],
      [11, 14],
      [14, 15],
      [15, 13],
    ]

    // Constelação da data "20/07/2024"
    const dateY = height - 150
    const datePoints = [
      // 2
      { x: centerX - 150, y: dateY - 20 },
      { x: centerX - 130, y: dateY - 20 },
      { x: centerX - 130, y: dateY },
      { x: centerX - 150, y: dateY },
      { x: centerX - 150, y: dateY + 20 },
      { x: centerX - 130, y: dateY + 20 },

      // 0
      { x: centerX - 110, y: dateY - 20 },
      { x: centerX - 90, y: dateY - 20 },
      { x: centerX - 90, y: dateY + 20 },
      { x: centerX - 110, y: dateY + 20 },

      // /
      { x: centerX - 70, y: dateY + 20 },
      { x: centerX - 60, y: dateY - 20 },

      // 0
      { x: centerX - 40, y: dateY - 20 },
      { x: centerX - 20, y: dateY - 20 },
      { x: centerX - 20, y: dateY + 20 },
      { x: centerX - 40, y: dateY + 20 },

      // 7
      { x: centerX, y: dateY - 20 },
      { x: centerX + 20, y: dateY - 20 },
      { x: centerX + 10, y: dateY + 20 },

      // /
      { x: centerX + 40, y: dateY + 20 },
      { x: centerX + 50, y: dateY - 20 },

      // 2024
      { x: centerX + 70, y: dateY },
      { x: centerX + 90, y: dateY },
      { x: centerX + 110, y: dateY },
      { x: centerX + 130, y: dateY },
    ]

    const dateConnections: [number, number][] = [
      // 2
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      // 0
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 6],
      // /
      [10, 11],
      // 0
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 12],
      // 7
      [16, 17],
      [17, 18],
      // /
      [19, 20],
      // 2024
      [21, 22],
      [22, 23],
      [23, 24],
    ]

    return {
      heart: { points: heartPoints, connections: heartConnections },
      initials: { points: initialsPoints, connections: initialsConnections },
      date: { points: datePoints, connections: dateConnections },
    }
  }

  // Criar estrelas aleatórias
  const createStars = (width: number, height: number, count: number): Star[] => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      brightness: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      moveSpeed: Math.random() * 0.1 + 0.05,
      moveDirection: Math.random() * Math.PI * 2,
    }))
  }

  // Criar estrela cadente
  const createShootingStar = (width: number): ShootingStar => {
    return {
      x: Math.random() * width,
      y: -10,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 3 + 2,
      life: 0,
      maxLife: 60,
    }
  }

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      setStars(createStars(canvas.width, canvas.height, 200))
      setConstellations(createConstellations(canvas.width, canvas.height))
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  // Loop de animação
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !constellations) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let lastTime = 0

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Limpar canvas
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Desenhar estrelas normais
      stars.forEach((star) => {
        // Atualizar posição
        star.x += Math.cos(star.moveDirection) * star.moveSpeed
        star.y += Math.sin(star.moveDirection) * star.moveSpeed

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Atualizar brilho (piscar)
        star.brightness += Math.sin(currentTime * star.twinkleSpeed) * 0.01

        // Desenhar estrela
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.brightness))})`
        ctx.fill()
      })

      // Desenhar constelações
      const drawConstellation = (constellation: Constellation, color = "rgba(255, 255, 255, 0.8)") => {
        // Desenhar pontos (estrelas)
        constellation.points.forEach((point) => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        })

        // Desenhar conexões
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        constellation.connections.forEach(([start, end]) => {
          const startPoint = constellation.points[start]
          const endPoint = constellation.points[end]
          if (startPoint && endPoint) {
            ctx.beginPath()
            ctx.moveTo(startPoint.x, startPoint.y)
            ctx.lineTo(endPoint.x, endPoint.y)
            ctx.stroke()
          }
        })
      }

      drawConstellation(constellations.heart, "rgba(255, 182, 193, 0.9)")
      drawConstellation(constellations.initials, "rgba(255, 255, 255, 0.8)")
      drawConstellation(constellations.date, "rgba(173, 216, 230, 0.8)")

      // Atualizar estrelas cadentes
      setShootingStars((prev) => {
        const updated = prev
          .map((star) => ({
            ...star,
            x: star.x + star.vx,
            y: star.y + star.vy,
            life: star.life + 1,
          }))
          .filter((star) => star.life < star.maxLife && star.y < canvas.height)

        // Adicionar nova estrela cadente ocasionalmente
        if (Math.random() < 0.002 && updated.length < 3) {
          updated.push(createShootingStar(canvas.width))
        }

        return updated
      })

      // Desenhar estrelas cadentes
      shootingStars.forEach((star) => {
        const alpha = 1 - star.life / star.maxLife

        // Trilha
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(star.x - star.vx * 10, star.y - star.vy * 10)
        ctx.lineTo(star.x, star.y)
        ctx.stroke()

        // Estrela
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        // Mostrar mensagem quando estrela cadente aparece
        if (star.life === 1) {
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 3000)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [stars, shootingStars, constellations])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fundo com degradê */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-950 to-black" />

      {/* Canvas das estrelas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: "transparent" }} />

      {/* Mensagem da estrela cadente */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-white/20 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-4xl sm:text-5xl mb-4"
              >
                ⭐
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-dancing text-2xl sm:text-3xl text-white mb-2 font-bold"
              >
                Você é meu desejo realizado
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/80 font-montserrat text-sm sm:text-base"
              >
                💫 Uma estrela cadente passou por aqui 💫
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
