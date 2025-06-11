import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CountdownLockScreen from "@/components/countdown-lock-screen"

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Nosso Amor | Dia dos Namorados",
  description: "Um site especial para celebrar nosso amor",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${dancing.variable} ${montserrat.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CountdownLockScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
