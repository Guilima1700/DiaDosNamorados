"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface FloatingHeartsProps {
  count?: number
}

export default function FloatingHearts({ count = 30 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 15,
    }))
    setHearts(newHearts)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <Heart
            className="text-pink-400 fill-pink-400"
            style={{
              width: heart.size,
              height: heart.size,
              filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
