'use client'

import { useState } from 'react'
import { FilmCard } from './FilmCard'

interface Film {
  id: string
  title: string
  slug: string
  youtubeUrl: string
  thumbnailUrl: string | null
  categoryId: string | null
  category?: {
    name: string
  } | null
}

interface Category {
  id: string
  name: string
  slug: string
}

interface FilmGridProps {
  films: Film[]
  categories: Category[]
}

export function FilmGrid({ films, categories }: FilmGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFilms = selectedCategory
    ? films.filter((film) => film.categoryId === selectedCategory)
    : films

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Films Grid */}
      {filteredFilms.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">Aucun film trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  )
}

