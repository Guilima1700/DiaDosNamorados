"use client"

import { useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import Image from "next/image"
import { Heart, RotateCcw } from "lucide-react"

// Fotos para a galeria empilhada
const stackedPhotos = [
  {
    id: 1,
    src: "/images/anonew.jpeg",
    alt: "Primeiro ano novo juntos",
    caption: "Nosso primeiro Ano Novo juntos",
  },
  {
    id: 2,
    src: "/images/lov.jpeg",
    alt: "Primeiro carnaval",
    caption: "Primeiro carnaval (Combinadinhos)",
  },
  {
    id: 3,
    src: "/images/img3.jpeg",
    alt: "Nos conhecendo",
    caption: "O grande início do que estava por vir",
  },
  {
    id: 4,
    src: "/images/img4.jpeg",
    alt: "Pedido de namoro",
    caption: "Pedido oficial de namoro",
  },
  {
    id: 5,
    src: "/images/img2.jpeg",
    alt: "Festinha juntos (Eu todo apaixonado)",
    caption: "Festinha juntos (Eu todo apaixonado)",
  },
]

export default function StackedGallery() {
  const [photos, setPhotos] = useState(stackedPhotos)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | "down">("right")

  const moveToBack = (direction: "left" | "right" | "up" | "down") => {
    setExitDirection(direction)
    setPhotos((prev) => {
      const newPhotos = [...prev]
      const topPhoto = newPhotos.shift()
      if (topPhoto) {
        newPhotos.push(topPhoto)
      }
      return newPhotos
    })
  }

  const resetStack = () => {
    setPhotos(stackedPhotos)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 80 // Reduzido para mobile
    const { offset, velocity } = info

    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 400) {
      moveToBack(offset.x > 0 ? "right" : "left")
    } else if (Math.abs(offset.y) > threshold || Math.abs(velocity.y) > 400) {
      moveToBack(offset.y > 0 ? "down" : "up")
    }
  }

  const getExitAnimation = (direction: string) => {
    switch (direction) {
      case "left":
        return { x: -300, rotate: -20, opacity: 0 }
      case "right":
        return { x: 300, rotate: 20, opacity: 0 }
      case "up":
        return { y: -300, rotate: 10, opacity: 0 }
      case "down":
        return { y: 300, rotate: -10, opacity: 0 }
      default:
        return { x: 300, rotate: 20, opacity: 0 }
    }
  }

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-rose-50/50 to-pink-100/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="font-dancing text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Nossos Momentos Especiais
          </h2>
          <p className="font-montserrat text-pink-700 mb-6 text-sm sm:text-base px-4">
            Arraste as fotos para o lado para ver a próxima memória
          </p>
          <button
            onClick={resetStack}
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-full transition-colors font-montserrat text-sm sm:text-base min-h-[44px]"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        </motion.div>

        <div className="flex justify-center">
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem]">
            <AnimatePresence mode="popLayout">
              {photos.map((photo, index) => {
                const isTop = index === 0
                const zIndex = photos.length - index
                const scale = 1 - index * 0.04
                const yOffset = index * 6
                const rotation = index * 1.5 - 1.5

                return (
                  <motion.div
                    key={photo.id}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                    style={{
                      zIndex,
                    }}
                    initial={{
                      scale: 0.8,
                      y: -100,
                      opacity: 0,
                      rotate: Math.random() * 20 - 10,
                    }}
                    animate={{
                      scale,
                      y: yOffset,
                      opacity: index < 3 ? 1 : 0,
                      rotate: rotation,
                    }}
                    exit={getExitAnimation(exitDirection)}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    drag={isTop}
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.6}
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    whileDrag={
                      isTop
                        ? {
                            scale: 1.02,
                            zIndex: 1000,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                          }
                        : {}
                    }
                  >
                    <div className="w-full h-full bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-pink-100 polaroid-effect">
                      <div className="relative w-full h-3/4 sm:h-4/5 rounded-xl overflow-hidden mb-2 sm:mb-3">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover romantic-filter"
                          draggable={false}
                        />
                        {isTop && (
                          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 fill-pink-500" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-dancing text-sm sm:text-lg text-pink-700 leading-tight">{photo.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Indicador de swipe */}
            <motion.div
              className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-center gap-2 text-pink-500 font-montserrat text-xs sm:text-sm">
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="text-base sm:text-lg"
                >
                  👆
                </motion.div>
                <span>Arraste para ver mais</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
