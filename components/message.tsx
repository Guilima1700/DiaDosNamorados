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
  Hoje é um daqueles dias que a gente para pra sentir mais forte o que vive todo dia... e eu quero te dizer com todas as letras: eu nunca imaginei ser tão feliz assim, nem nos meus melhores sonhos.

Em um mundo tão confuso, onde tudo muda o tempo todo, encontrar uma certeza é raro. Mas eu encontrei a minha. E ela tem nome, sorriso, jeitinho único... e é você. 💖

Você é a pessoa com quem quero dividir tudo: cada momento bom, cada desafio, cada vitória e até os perrengues. Porque com você, até o caos vira conforto.

Já são dois anos de uma história cheia de sentimentos intensos, aprendizados, risadas, superações e muito, muito amor. A gente sabe o que viveu. Só a gente sabe. E isso é o mais bonito.

Sei que amor não é o único ingrediente pra dar certo, mas com a nossa conexão, respeito, entrega e carinho, a gente tem tudo o que precisa. De verdade. ✨

Tô indo pra você agora, com o coração batendo forte e cheio de gratidão pelos dois anos mais lindos da minha vida. Te amo infinitamente, minha princesa. Você é o meu lar, meu mundo, meu sempre. 💗
  `

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
