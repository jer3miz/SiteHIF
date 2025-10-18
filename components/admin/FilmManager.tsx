'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Star, Film } from 'lucide-react'
import { FilmForm } from './FilmForm'

interface FilmData {
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

interface FilmManagerProps {
  initialFilms: FilmData[]
  categories: Category[]
}

export function FilmManager({ initialFilms, categories }: FilmManagerProps) {
  const [films, setFilms] = useState<FilmData[]>(initialFilms)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingFilm, setEditingFilm] = useState<FilmData | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) return

    try {
      const response = await fetch(`/api/films/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setFilms(films.filter((f) => f.id !== id))
      }
    } catch (error) {
      console.error('Error deleting film:', error)
    }
  }

  const handleEdit = (film: FilmData) => {
    setEditingFilm(film)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingFilm(null)
    window.location.reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Gestion des films</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau film</span>
        </button>
      </div>

      {films.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Aucun film pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {films.map((film) => (
            <div
              key={film.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{film.title}</h3>
                    {film.isFeatured && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full text-xs text-primary-300">
                        <Star className="w-3 h-3" />
                        <span>En vedette</span>
                      </span>
                    )}
                  </div>
                  {film.category && (
                    <span className="inline-block px-3 py-1 mb-2 text-xs text-primary-300 bg-primary-900/30 rounded-full border border-primary-500/30">
                      {film.category.name}
                    </span>
                  )}
                  {film.description && (
                    <p className="text-gray-400 mt-2">{film.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">{film.youtubeUrl}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(film)}
                    className="p-2 text-gray-400 hover:text-primary-400 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(film.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <FilmForm
          film={editingFilm}
          categories={categories}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}

