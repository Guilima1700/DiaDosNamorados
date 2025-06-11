"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  moveSpeed: number
  moveDirection: number
  originalBrightness: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  trail: { x: number; y: number; alpha: number }[]
}

interface ConstellationPoint {
  x: number
  y: number
}

export default function SkyOfLove() {
  const [showMessage, setShowMessage] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  // Criar estrelas aleatórias
  const createStars = (width: number, height: number, count: number): Star[] => {
    return Array.from({ length: count }, () => {
      const brightness = Math.random() * 0.8 + 0.2
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        brightness,
        originalBrightness: brightness,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        moveSpeed: Math.random() * 0.15 + 0.05,
        moveDirection: Math.random() * Math.PI * 2,
      }
    })
  }

  // Criar estrela cadente
  const createShootingStar = (width: number, height: number): ShootingStar => {
    const startSide = Math.random()
    let x, y, vx, vy

    if (startSide < 0.5) {
      // Vem da esquerda
      x = -50
      y = Math.random() * height * 0.3
      vx = Math.random() * 4 + 3
      vy = Math.random() * 2 + 1
    } else {
      // Vem do topo
      x = Math.random() * width
      y = -50
      vx = (Math.random() - 0.5) * 3
      vy = Math.random() * 4 + 3
    }

    return {
      x,
      y,
      vx,
      vy,
      life: 0,
      maxLife: 80,
      trail: [],
    }
  }

  // Desenhar constelação do coração
  const drawHeart = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale = 1) => {
    const size = 40 * scale
    const points: ConstellationPoint[] = [
      { x: centerX, y: centerY + size * 0.8 }, // ponta inferior
      { x: centerX - size * 0.5, y: centerY + size * 0.2 }, // esquerda meio
      { x: centerX - size * 0.7, y: centerY - size * 0.3 }, // esquerda superior
      { x: centerX - size * 0.4, y: centerY - size * 0.7 }, // esquerda topo
      { x: centerX - size * 0.1, y: centerY - size * 0.5 }, // centro esquerdo
      { x: centerX, y: centerY - size * 0.4 }, // centro topo
      { x: centerX + size * 0.1, y: centerY - size * 0.5 }, // centro direito
      { x: centerX + size * 0.4, y: centerY - size * 0.7 }, // direita topo
      { x: centerX + size * 0.7, y: centerY - size * 0.3 }, // direita superior
      { x: centerX + size * 0.5, y: centerY + size * 0.2 }, // direita meio
    ]

    const connections: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 0],
    ]

    // Desenhar estrelas
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 182, 193, 0.9)"
      ctx.fill()

      // Brilho extra
      ctx.beginPath()
      ctx.arc(point.x, point.y, 6 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 182, 193, 0.3)"
      ctx.fill()
    })

    // Desenhar conexões
    ctx.strokeStyle = "rgba(255, 182, 193, 0.6)"
    ctx.lineWidth = 1.5 * scale
    connections.forEach(([start, end]) => {
      ctx.beginPath()
      ctx.moveTo(points[start].x, points[start].y)
      ctx.lineTo(points[end].x, points[end].y)
      ctx.stroke()
    })
  }

  // Desenhar iniciais "K + A"
  const drawInitials = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale = 1) => {
    const size = 25 * scale
    const spacing = 80 * scale

    // K
    const kPoints: ConstellationPoint[] = [
      { x: centerX - spacing, y: centerY - size },
      { x: centerX - spacing, y: centerY },
      { x: centerX - spacing, y: centerY + size },
      { x: centerX - spacing + size * 0.8, y: centerY - size * 0.3 },
      { x: centerX - spacing + size * 0.8, y: centerY + size * 0.3 },
    ]

    // +
    const plusPoints: ConstellationPoint[] = [
      { x: centerX - size * 0.4, y: centerY },
      { x: centerX + size * 0.4, y: centerY },
      { x: centerX, y: centerY - size * 0.4 },
      { x: centerX, y: centerY + size * 0.4 },
    ]

    // A
    const aPoints: ConstellationPoint[] = [
      { x: centerX + spacing - size * 0.4, y: centerY + size },
      { x: centerX + spacing, y: centerY - size },
      { x: centerX + spacing + size * 0.4, y: centerY + size },
      { x: centerX + spacing - size * 0.2, y: centerY },
      { x: centerX + spacing + size * 0.2, y: centerY },
    ]

    const allPoints = [...kPoints, ...plusPoints, ...aPoints]
    const connections: [number, number][] = [
      // K
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      // +
      [5, 6],
      [7, 8],
      // A
      [9, 10],
      [10, 11],
      [9, 12],
      [12, 13],
      [13, 11],
    ]

    // Desenhar estrelas
    allPoints.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 2.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fill()
    })

    // Desenhar conexões
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
    ctx.lineWidth = 1 * scale
    connections.forEach(([start, end]) => {
      if (allPoints[start] && allPoints[end]) {
        ctx.beginPath()
        ctx.moveTo(allPoints[start].x, allPoints[start].y)
        ctx.lineTo(allPoints[end].x, allPoints[end].y)
        ctx.stroke()
      }
    })
  }

  // Desenhar data "20/07/2024"
  const drawDate = (ctx: CanvasRenderingContext2D, centerX: number, y: number, scale = 1) => {
    const dateText = "20/07/2024"
    const spacing = 15 * scale
    const startX = centerX - (dateText.length * spacing) / 2

    dateText.split("").forEach((char, index) => {
      const x = startX + index * spacing

      ctx.beginPath()
      ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(173, 216, 230, 0.8)"
      ctx.fill()

      // Pequeno brilho
      ctx.beginPath()
      ctx.arc(x, y, 4 * scale, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(173, 216, 230, 0.3)"
      ctx.fill()
    })
  }

  // Atualizar dimensões
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: 600, // Altura fixa para a seção
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Inicializar estrelas quando entrar na view
  useEffect(() => {
    if (isInView && dimensions.width > 0) {
      setStars(createStars(dimensions.width, dimensions.height, 100))
      setShootingStars([])
    }
  }, [isInView, dimensions])

  // Loop de animação
  useEffect(() => {
    if (!isInView) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let lastTime = 0

    const animate = (currentTime: number) => {
      if (!isInView) return

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Limpar canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0)"
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar estrelas normais
      stars.forEach((star) => {
        // Movimento suave
        star.x += Math.cos(star.moveDirection) * star.moveSpeed
        star.y += Math.sin(star.moveDirection) * star.moveSpeed

        // Wrap around
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Efeito de piscar
        star.brightness = star.originalBrightness + Math.sin(currentTime * star.twinkleSpeed) * 0.3

        // Desenhar estrela
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.brightness))})`
        ctx.fill()

        // Brilho suave
        if (star.brightness > 0.7) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${(star.brightness - 0.7) * 0.3})`
          ctx.fill()
        }
      })

      // Desenhar constelações
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width / 800, canvas.height / 600)

      drawHeart(ctx, centerX, centerY - 50 * scale, scale)
      drawInitials(ctx, centerX, centerY + 80 * scale, scale)
      drawDate(ctx, centerX, canvas.height - 80 * scale, scale)

      // Atualizar estrelas cadentes
      setShootingStars((prev) => {
        const updated = prev
          .map((star) => {
            // Atualizar posição
            star.x += star.vx
            star.y += star.vy
            star.life += 1

            // Adicionar ponto à trilha
            star.trail.push({ x: star.x, y: star.y, alpha: 1 })
            if (star.trail.length > 15) {
              star.trail.shift()
            }

            // Diminuir alpha da trilha
            star.trail.forEach((point, index) => {
              point.alpha = index / star.trail.length
            })

            return star
          })
          .filter((star) => star.life < star.maxLife && star.y < canvas.height + 100)

        // Adicionar nova estrela cadente
        if (Math.random() < 0.005 && updated.length < 2) {
          const newStar = createShootingStar(canvas.width, canvas.height)
          updated.push(newStar)

          // Mostrar mensagem
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 4000)
        }

        return updated
      })

      // Desenhar estrelas cadentes
      shootingStars.forEach((star) => {
        const alpha = 1 - star.life / star.maxLife

        // Desenhar trilha
        if (star.trail.length > 1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
          ctx.lineWidth = 3
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.moveTo(star.trail[0].x, star.trail[0].y)

          star.trail.forEach((point, index) => {
            if (index > 0) {
              ctx.globalAlpha = point.alpha * alpha
              ctx.lineTo(point.x, point.y)
            }
          })
          ctx.stroke()
          ctx.globalAlpha = 1
        }

        // Desenhar estrela principal
        ctx.beginPath()
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        // Brilho da estrela
        ctx.beginPath()
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, stars, shootingStars, dimensions])

  return (
    <section
      id="sky-of-love"
      ref={containerRef}
      className="py-12 sm:py-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-dancing text-3xl sm:text-4xl md:text-5xl text-center font-bold text-white mb-4"
        >
          Céu do Nosso Amor
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 font-montserrat text-center mb-8 sm:mb-12 text-sm sm:text-base"
        >
          ✨ Nossas constelações especiais desenhadas nas estrelas ✨
        </motion.p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent", height: "600px" }}
      />

      {/* Mensagem da estrela cadente */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-white/20 shadow-2xl max-w-sm mx-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl mb-4"
            >
              🌟
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-dancing text-xl sm:text-2xl text-white mb-2 font-bold"
            >
              Você é meu desejo realizado
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 font-montserrat text-sm"
            >
              💫 Uma estrela cadente passou 💫
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
