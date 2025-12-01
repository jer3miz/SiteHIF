'use client'

import { useEffect, useState } from 'react'
import { HIFLogo } from './HIFLogo'

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
        {/* Logo HIF */}
        <HIFLogo 
          size="2xl" 
          showStudio={true}
          animated={true}
          color="#e0e0e0"
        />

        {/* Loading bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 animate-loadingBar rounded-full" />
        </div>
      </div>
    </div>
  )
}

