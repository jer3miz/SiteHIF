'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film } from 'lucide-react'
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
          <Link href="/" className="flex items-center space-x-2 group">
            <Film className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="relative text-2xl font-bold overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-800">
                HIF
              </span>
              <span 
                className={`absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-[1500ms] ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{
                  clipPath: isLoaded ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'
                }}
              >
                HIF
              </span>
            </span>
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
            <Link
              href="/admin/login"
              className="text-sm font-medium text-gray-400 hover:text-primary-400 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

