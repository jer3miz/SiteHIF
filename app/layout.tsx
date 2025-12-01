import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { LoadingScreen } from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HIF Production - Cinématographie',
  description: 'Production de cinématographie HIF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LoadingScreen />
        <div className="min-h-screen bg-black">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

