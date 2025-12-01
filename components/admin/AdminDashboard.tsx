'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Film, Folder, LogOut } from 'lucide-react'
import { HIFLogo } from '../HIFLogo'
import { FilmManager } from './FilmManager'
import { CategoryManager } from './CategoryManager'

interface Film {
  id: string
  title: string
  slug: string
  description: string | null
  youtubeUrl: string
  thumbnailUrl: string | null
  isFeatured: boolean
  categoryId: string | null
  category?: {
    id: string
    name: string
  } | null
}

interface Category {
  id: string
  name: string
  slug: string
}

interface AdminDashboardProps {
  initialFilms: Film[]
  initialCategories: Category[]
}

export function AdminDashboard({ initialFilms, initialCategories }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'films' | 'categories'>('films')

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Gradient background that stays fixed during scroll */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-primary-900/30 to-black pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(48,15,89,0.15),transparent_50%)] pointer-events-none z-0" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HIFLogo 
                size="sm" 
                showStudio={false}
                color="#e0e0e0"
              />
              <div>
                <p className="text-xs text-gray-400">Administration</p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('films')}
              className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'films'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Film className="w-5 h-5" />
              <span className="font-medium">Films</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'categories'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Folder className="w-5 h-5" />
              <span className="font-medium">Catégories</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {activeTab === 'films' && (
          <FilmManager initialFilms={initialFilms} categories={initialCategories} />
        )}
        {activeTab === 'categories' && (
          <CategoryManager initialCategories={initialCategories} />
        )}
      </div>
    </div>
  )
}

