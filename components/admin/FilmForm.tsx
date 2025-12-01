'use client'

import { useState } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface Film {
  id: string
  title: string
  description: string | null
  youtubeUrl: string
  thumbnailUrl: string | null
  isFeatured: boolean
  categoryId: string | null
}

interface Category {
  id: string
  name: string
}

interface FilmFormProps {
  film: Film | null
  categories: Category[]
  onClose: () => void
}

export function FilmForm({ film, categories, onClose }: FilmFormProps) {
  const [formData, setFormData] = useState({
    title: film?.title || '',
    description: film?.description || '',
    youtubeUrl: film?.youtubeUrl || '',
    thumbnailUrl: film?.thumbnailUrl || '',
    categoryId: film?.categoryId || '',
    isFeatured: film?.isFeatured || false,
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(film?.thumbnailUrl || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image')
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse (max 5MB)')
      return
    }

    setSelectedFile(file)
    setUploadingImage(true)

    // Preview immédiat
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload de l'image
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const { url } = await uploadResponse.json()
      setFormData({ ...formData, thumbnailUrl: url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Erreur lors de l\'upload de l\'image')
      setImagePreview(null)
      setSelectedFile(null)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setFormData({ ...formData, thumbnailUrl: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = film ? `/api/films/${film.id}` : '/api/films'
      const method = film ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          thumbnailUrl: formData.thumbnailUrl || null,
        }),
      })

      if (response.ok) {
        onClose()
      }
    } catch (error) {
      console.error('Error saving film:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {film ? 'Modifier le film' : 'Nouveau film'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL YouTube *
            </label>
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              required
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image du film (optionnel)
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <label className="inline-flex items-center justify-center p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploadingImage}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center justify-center p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 hover:border-primary-500/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadingImage ? (
                    <>
                      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="text-sm text-gray-400">Upload en cours...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                />
              </label>
            )}
            
            {!imagePreview && !uploadingImage && (
              <p className="mt-2 text-xs text-gray-500">
                Si aucune image n'est fournie, la miniature YouTube sera utilisée
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Catégorie
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Aucune catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-primary-600 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="isFeatured" className="text-gray-300 font-medium">
              Film en vedette
            </label>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

