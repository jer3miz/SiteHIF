import { prisma } from '@/lib/prisma'
import { FeaturedFilm } from '@/components/FeaturedFilm'
import { FilmCard } from '@/components/FilmCard'
import { FilmGrid } from '@/components/FilmGrid'

export default async function FilmsPage() {
  const [featuredFilm, otherFilms, categories] = await Promise.all([
    prisma.film.findFirst({
      where: { isFeatured: true },
      include: { category: true },
    }),
    prisma.film.findMany({
      where: { isFeatured: false },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ])

  return (
    <div className="pt-16">
      {featuredFilm && <FeaturedFilm film={featuredFilm} />}
      
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8 text-white">Tous les films</h2>
        <FilmGrid films={otherFilms} categories={categories} />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

