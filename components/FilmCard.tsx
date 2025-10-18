'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { getYoutubeThumbnail } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

interface FilmCardProps {
  film: {
    id: string
    title: string
    slug: string
    youtubeUrl: string
    thumbnailUrl: string | null
    category?: {
      name: string
    } | null
  }
}

export function FilmCard({ film }: FilmCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const thumbnail = film.thumbnailUrl || getYoutubeThumbnail(film.youtubeUrl)

  return (
    <Link href={`/films/${film.slug}`}>
      <div
        className="group relative aspect-video overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
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
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Video Player */}
        {showVideo && (
          <div className="absolute inset-0 z-10">
            <ReactPlayer
              url={film.youtubeUrl}
              playing={true}
              muted={true}
              loop={true}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              config={{
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
          {film.category && (
            <span className="inline-block w-fit px-3 py-1 mb-2 text-xs font-semibold text-primary-300 bg-primary-900/50 rounded-full backdrop-blur-sm border border-primary-500/30">
              {film.category.name}
            </span>
          )}
          <h3 className="text-lg font-bold text-white drop-shadow-lg">
            {film.title}
          </h3>
        </div>

        {/* Play Icon on Hover */}
        {!showVideo && (
          <div
            className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-primary-600/80 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

