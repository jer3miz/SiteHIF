import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const films = await prisma.film.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(films)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch films' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, description, youtubeUrl, thumbnailUrl, categoryId, isFeatured } = body

    // If this film is set as featured, unfeatured all other films
    if (isFeatured) {
      await prisma.film.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      })
    }

    const film = await prisma.film.create({
      data: {
        title,
        slug: slugify(title),
        description,
        youtubeUrl,
        thumbnailUrl: thumbnailUrl || null,
        categoryId: categoryId || null,
        isFeatured: isFeatured || false,
      },
      include: { category: true },
    })

    return NextResponse.json(film, { status: 201 })
  } catch (error) {
    console.error('Error creating film:', error)
    return NextResponse.json({ error: 'Failed to create film' }, { status: 500 })
  }
}

