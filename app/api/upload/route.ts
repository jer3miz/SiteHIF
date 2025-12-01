import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

// Configurer Cloudinary si les variables d'environnement sont présentes
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

const USE_CLOUDINARY = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'L\'image est trop volumineuse (max 5MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let imageUrl: string

    // Utiliser Cloudinary si configuré (production)
    if (USE_CLOUDINARY) {
      try {
        // Convertir le buffer en base64 pour Cloudinary
        const base64 = buffer.toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`

        // Upload vers Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'hif-production/films',
          resource_type: 'auto',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
          ],
        })

        imageUrl = result.secure_url
        console.log('Image uploaded to Cloudinary:', imageUrl)
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError)
        return NextResponse.json(
          { error: 'Erreur lors de l\'upload vers Cloudinary' },
          { status: 500 }
        )
      }
    } else {
      // Fallback : stockage local (développement uniquement)
      // Créer le dossier uploads/films s'il n'existe pas
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'films')
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true })
      }

      // Générer un nom de fichier unique
      const timestamp = Date.now()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}-${sanitizedName}`
      const filepath = join(uploadsDir, filename)

      // Sauvegarder le fichier
      await writeFile(filepath, buffer)

      // Retourner l'URL de l'image
      imageUrl = `/uploads/films/${filename}`
      console.log('Image saved locally:', imageUrl)
      console.warn('⚠️ Using local storage. Configure Cloudinary for production!')
    }

    return NextResponse.json({ url: imageUrl }, { status: 200 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
}

