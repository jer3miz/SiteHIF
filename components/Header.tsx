'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HIFLogo } from './HIFLogo'
import { useEffect, useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true)
  }, [])
  
  const isActive = (path: string) => {
    return pathname === path
  }

  // Don't show header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary-900/30">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <HIFLogo 
              size="md" 
              color="#e0e0e0"
              className="group-hover:opacity-80 transition-opacity"
            />
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                isActive('/') ? 'text-primary-500' : 'text-gray-300'
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/films"
              className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                isActive('/films') ? 'text-primary-500' : 'text-gray-300'
              }`}
            >
              Films
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                isActive('/contact') ? 'text-primary-500' : 'text-gray-300'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

