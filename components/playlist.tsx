"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react"
import { useState } from "react"

// Substitua o array de músicas com as músicas solicitadas

// Substitua com suas músicas favoritas
const songs = [
  {
    title: "The Only Exception",
    artist: "Paramore",
    cover: "/images/img3.jpeg",
  },
  {
    title: "Poesia Acústica 2",
    artist: "Delacruz I Maria I Ducon I Luiz Lins I Diomedes I Bk' I Kayuá",
    cover: "/images/img3.jpeg",
  },
  {
    title: "Se sinta assim (também)",
    artist: "Lulu Silvério",
    cover: "/images/img3.jpeg",
  },
  {
    title: "Um Amor Puro",
    artist: "Djavan",
    cover: "/images/img3.jpeg",
  },
  {
    title: "Lara",
    artist: "Henry Freitas",
    cover: "/images/img3.jpeg",
  },
]

// Links do YouTube para as músicas
const youtubeLinks = [
  "nXjhSMWBE30", 
  "bD6ifecX6rs",
  "_8gIdbesUxI",
  "Af7ieNv0wXY",
  "oRVo4XppzP0",
]

export default function Playlist() {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
  }

  return (
    <section id="playlist" className="py-12 sm:py-20 bg-gradient-to-b from-pink-50/50 to-purple-50/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-dancing text-3xl sm:text-4xl md:text-5xl text-center font-bold text-pink-600 mb-8 sm:mb-16"
        >
          Nossa Playlist de Amor
        </motion.h2>

        <div ref={ref} className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="relative h-48 sm:h-64 w-full bg-gradient-to-r from-pink-300 to-purple-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={songs[currentSong].cover || "/placeholder.svg"}
                  alt={songs[currentSong].title}
                  className="h-32 w-32 sm:h-48 sm:w-48 rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-700 font-dancing">{songs[currentSong].title}</h3>
                <p className="text-pink-500 font-montserrat text-sm sm:text-base">{songs[currentSong].artist}</p>
              </div>

              {/* Player do YouTube para músicas disponíveis */}
              {youtubeLinks[currentSong] && (
                <div className="mb-4 sm:mb-6">
                  <iframe
                    width="100%"
                    height="160"
                    src={`https://www.youtube.com/embed/${youtubeLinks[currentSong]}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&controls=1`}
                    title={`${songs[currentSong].title} - ${songs[currentSong].artist}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-lg"
                  ></iframe>
                </div>
              )}

              <div className="flex justify-center items-center gap-4 sm:gap-6">
                <button
                  onClick={prevSong}
                  className="p-2 sm:p-3 rounded-full hover:bg-pink-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <SkipBack className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-3 sm:p-4 bg-pink-500 hover:bg-pink-600 rounded-full text-white transition-colors shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="h-6 w-6 sm:h-8 sm:w-8" /> : <Play className="h-6 w-6 sm:h-8 sm:w-8" />}
                </button>
                <button
                  onClick={nextSong}
                  className="p-2 sm:p-3 rounded-full hover:bg-pink-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <SkipForward className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                </button>
              </div>

              {/* Barra de progresso simulada para músicas sem player */}
              {!youtubeLinks[currentSong] && (
                <div className="mt-6 sm:mt-8">
                  <div className="h-2 bg-pink-100 rounded-full">
                    <div className="h-full w-1/3 bg-pink-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs sm:text-sm text-pink-500 font-montserrat">
                    <span>1:23</span>
                    <span>3:45</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-pink-50 p-3 sm:p-4">
              <h4 className="font-bold text-pink-700 mb-2 font-dancing text-base sm:text-lg">Próximas músicas:</h4>
              <ul className="space-y-2">
                {songs.map((song, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                      index === currentSong ? "bg-pink-200" : "hover:bg-pink-100"
                    } transition-colors min-h-[44px]`}
                    onClick={() => setCurrentSong(index)}
                  >
                    <Music className="h-4 w-4 text-pink-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-pink-800 text-sm sm:text-base truncate">{song.title}</p>
                      <p className="text-xs sm:text-sm text-pink-500 truncate">{song.artist}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
