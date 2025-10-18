'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { getYoutubeThumbnail } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

interface FeaturedFilmProps {
  film: {
    id: string
    title: string
    slug: string
    description: string | null
    youtubeUrl: string
    thumbnailUrl: string | null
    category?: {
      name: string
    } | null
  }
}

export function FeaturedFilm({ film }: FeaturedFilmProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const thumbnail = film.thumbnailUrl || getYoutubeThumbnail(film.youtubeUrl)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Link href={`/films/${film.slug}`}>
        <div
          className="relative h-full w-full cursor-pointer"
          onMouseEnter={() => {
            setIsHovering(true)
            setTimeout(() => setShowVideo(true), 300)
          }}
          onMouseLeave={() => {
            setIsHovering(false)
            setShowVideo(false)
          }}
        >
          {/* Thumbnail */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={thumbnail}
              alt={film.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Video Player */}
          {showVideo && (
            <div className="absolute inset-0">
              <ReactPlayer
                url={film.youtubeUrl}
                playing={true}
                muted={true}
                loop={true}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
            <div className="container mx-auto max-w-4xl">
              {film.category && (
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-primary-300 bg-primary-900/30 rounded-full backdrop-blur-sm border border-primary-500/30">
                  {film.category.name}
                </span>
              )}
              <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl">
                {film.title}
              </h1>
              {film.description && (
                <p className="text-xl text-gray-200 mb-6 max-w-2xl drop-shadow-lg">
                  {film.description}
                </p>
              )}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white bg-primary-600 hover:bg-primary-500 transition-colors px-6 py-3 rounded-lg">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">Voir le film</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Indicator */}
          {!showVideo && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-primary-600/80 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

