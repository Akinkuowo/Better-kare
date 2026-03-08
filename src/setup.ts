import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting database seed...')

    // Create categories
    const categories = [
        {
            name: 'Beauty Essentials',
            slug: 'beauty-essentials',
            description: 'Lashes, nails, mascara, eyeliner',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3'
        },
        {
            name: 'Lip Care',
            slug: 'lipcare',
            description: 'Scrub, gloss, lip cream and balm',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3'
        },
        {
            name: 'Feet Care Kit',
            slug: 'feet-care-kit',
            description: 'Complete feet care solutions',
            image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-4.0.3'
        },
        {
            name: 'Scented Candles',
            slug: 'scented-candles',
            description: 'Luxury scented candles',
            image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3'
        },
        {
            name: 'Room Spray',
            slug: 'room-spray',
            description: 'Room fresheners and sprays',
            image: 'https://images.unsplash.com/photo-1616940844649-535215ae4a72?ixlib=rb-4.0.3'
        },
        {
            name: 'Hair Care',
            slug: 'haircare',
            description: 'Hair creams and treatments',
            image: 'https://images.unsplash.com/photo-1522338242992-e1a54906ab5b?ixlib=rb-4.0.3'
        },
        {
            name: 'Journals',
            slug: 'journals',
            description: 'Beautiful journals and notebooks',
            image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3'
        },
        {
            name: 'Coloring Books',
            slug: 'coloring-books',
            description: 'Adult coloring books',
            image: 'https://images.unsplash.com/photo-1585314614250-d213876e49b6?ixlib=rb-4.0.3'
        },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        })
        console.log(`Created category: ${category.name}`)
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })
    console.log('Created admin user: admin@example.com / admin123')

    // Create sample products
    const categories_db = await prisma.category.findMany()

    for (const category of categories_db) {
        await prisma.product.upsert({
            where: { slug: `sample-${category.slug}` },
            update: {},
            create: {
                name: `Sample ${category.name}`,
                slug: `sample-${category.slug}`,
                description: `This is a sample product for ${category.name}`,
                price: 19.99,
                categoryId: category.id,
                stock: 50,
                featured: true,
                images: [category.image || ''],
            },
        })
        console.log(`Created sample product for: ${category.name}`)
    }

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })