import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        where: { 
          isFeatured: true,
          NOT: { id: params.id }
        },
        data: { isFeatured: false },
      })
    }

    const film = await prisma.film.update({
      where: { id: params.id },
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

    return NextResponse.json(film)
  } catch (error) {
    console.error('Error updating film:', error)
    return NextResponse.json({ error: 'Failed to update film' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.film.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting film:', error)
    return NextResponse.json({ error: 'Failed to delete film' }, { status: 500 })
  }
}

