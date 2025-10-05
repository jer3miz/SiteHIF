'use client'

import { useEffect, useState } from 'react'
import { Film } from 'lucide-react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Simulate loading time and start fade out
    const timer = setTimeout(() => {
      setIsFading(true)
      // Remove from DOM after fade animation
      setTimeout(() => setIsLoading(false), 800)
    }, 2000) // Show for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Icon */}
        <div className="relative">
          <Film className="w-24 h-24 text-primary-500 animate-pulse" />
          <div className="absolute inset-0 w-24 h-24">
            <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full animate-ping" />
          </div>
        </div>

        {/* Logo HIF with fill animation */}
        <div className="relative">
          <h1 className="text-8xl font-bold tracking-wider overflow-hidden">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-800">
              HIF
            </span>
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 animate-fillUp"
            >
              HIF
            </span>
          </h1>
        </div>

        {/* Studio text */}
        <p className="text-gray-400 text-xl tracking-[0.3em] animate-fadeIn">
          STUDIO
        </p>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 animate-loadingBar rounded-full" />
        </div>
      </div>
    </div>
  )
}

