import { prisma } from '@/lib/prisma'
import { FeaturedFilmCard } from '@/components/FeaturedFilmCard'
import { HIFLogo } from '@/components/HIFLogo'
import { Film, Award, Video, Play, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const featuredFilm = await prisma.film.findFirst({
    where: { isFeatured: true },
    include: { category: true },
  })

  const recentFilms = await prisma.film.findMany({
    where: { isFeatured: false },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-primary-950/20 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(48,15,89,0.15),transparent_50%)] animate-pulse" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-800/10 rounded-full blur-3xl animate-pulse delay-700" />
          {/* Transition gradient at bottom for smooth section transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-primary-950/30 to-transparent" />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="space-y-10">
              {/* Logo animé */}
              <div className="animate-fadeIn">
                <HIFLogo 
                  size="2xl" 
                  showStudio={true}
                  animated={true}
                  color="#e0e0e0"
                />
              </div>
              
              {/* Titre principal */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-900/30 rounded-full border border-primary-500/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <span className="text-sm text-primary-300 font-semibold">Cinématographie de prestige</span>
                </div>
                
                <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  Créateurs d'
                  <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    émotions visuelles
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Nous transformons vos idées en œuvres cinématographiques captivantes. 
                  Chaque projet est une aventure unique où l'art rencontre la technologie.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <Link
                  href="/films"
                  className="group inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-600/50"
                >
                  <Play className="w-5 h-5" />
                  <span>Découvrir nos films</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/films"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all backdrop-blur-sm border border-white/10 hover:border-white/20"
                >
                  <span>Notre portfolio</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Featured Film */}
            <div className="space-y-6 lg:pl-8">
              {featuredFilm ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
                    <span className="px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-semibold flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>En vedette</span>
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
                  </div>
                  <FeaturedFilmCard film={featuredFilm} />
                </>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 flex items-center justify-center">
                  <p className="text-gray-500">Aucun film en vedette</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-500/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-gradient-to-b from-black via-primary-950/10 to-gray-900">
        {/* Smooth transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-950/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Notre expertise</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des services complets pour donner vie à vos projets audiovisuels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-primary-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-900/50 transition-colors border border-primary-500/30">
                <Video className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Production</h3>
              <p className="text-gray-400 leading-relaxed">
                Courts-métrages, documentaires et clips musicaux réalisés avec passion et professionnalisme.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-primary-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-900/50 transition-colors border border-primary-500/30">
                <Film className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Réalisation</h3>
              <p className="text-gray-400 leading-relaxed">
                Direction artistique et technique pour des projets visuels à fort impact émotionnel.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-primary-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-900/50 transition-colors border border-primary-500/30">
                <Award className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Post-production</h3>
              <p className="text-gray-400 leading-relaxed">
                Montage, étalonnage et effets visuels pour sublimer chaque séquence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Films Section */}
      {recentFilms.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Films récents</h2>
                <p className="text-gray-400">Découvrez nos dernières créations</p>
              </div>
              <Link
                href="/films"
                className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors group"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentFilms.map((film) => (
                <div key={film.id}>
                  <FeaturedFilmCard film={film} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export const dynamic = 'force-dynamic'

