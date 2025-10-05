import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hif-studio.com' },
    update: {},
    create: {
      email: 'admin@hif-studio.com',
      password: hashedPassword,
      name: 'Admin HIF',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'court-metrage' },
      update: {},
      create: {
        name: 'Court-métrage',
        slug: 'court-metrage',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'documentaire' },
      update: {},
      create: {
        name: 'Documentaire',
        slug: 'documentaire',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clip-musical' },
      update: {},
      create: {
        name: 'Clip Musical',
        slug: 'clip-musical',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  // Create example films
  const films = await Promise.all([
    prisma.film.upsert({
      where: { slug: 'film-vedette' },
      update: {},
      create: {
        title: 'Film Vedette',
        slug: 'film-vedette',
        description: 'Un film magnifique qui capture l\'essence du cinéma moderne. Une œuvre visuelle époustouflante.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isFeatured: true,
        categoryId: categories[0].id,
      },
    }),
    prisma.film.upsert({
      where: { slug: 'lumieres-de-la-ville' },
      update: {},
      create: {
        title: 'Lumières de la ville',
        slug: 'lumieres-de-la-ville',
        description: 'Une exploration poétique des lumières urbaines à travers le temps.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isFeatured: false,
        categoryId: categories[1].id,
      },
    }),
    prisma.film.upsert({
      where: { slug: 'la-danse-des-ombres' },
      update: {},
      create: {
        title: 'La danse des ombres',
        slug: 'la-danse-des-ombres',
        description: 'Un court-métrage expérimental sur le mouvement et les contrastes.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        isFeatured: false,
        categoryId: categories[0].id,
      },
    }),
  ])

  console.log('✅ Films created:', films.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

