import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { VideoPlayer } from '@/components/VideoPlayer'

export default async function FilmDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const film = await prisma.film.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })

  if (!film) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/films"
          className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux films</span>
        </Link>

        <div className="max-w-5xl mx-auto">
          {/* Video Player */}
          <div className="mb-8">
            <VideoPlayer url={film.youtubeUrl} />
          </div>

          {/* Film Info */}
          <div className="space-y-6">
            <div>
              {film.category && (
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-primary-300 bg-primary-900/30 rounded-full border border-primary-500/30">
                  {film.category.name}
                </span>
              )}
              <h1 className="text-5xl font-bold text-white mb-4">{film.title}</h1>
              {film.description && (
                <p className="text-xl text-gray-300 leading-relaxed">
                  {film.description}
                </p>
              )}
            </div>

            {film.isFeatured && (
              <div className="inline-flex items-center px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg">
                <span className="text-primary-300 font-semibold">⭐ Film en vedette</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

