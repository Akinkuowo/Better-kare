import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Create Categories
    const skincare = await prisma.category.upsert({
        where: { slug: 'skincare' },
        update: {},
        create: {
            name: 'Skincare',
            slug: 'skincare',
            description: 'Nourishing skincare products',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
    })

    const makeup = await prisma.category.upsert({
        where: { slug: 'makeup' },
        update: {},
        create: {
            name: 'Makeup',
            slug: 'makeup',
            description: 'Enhance your natural beauty',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
    })

    const haircare = await prisma.category.upsert({
        where: { slug: 'haircare' },
        update: {},
        create: {
            name: 'Haircare',
            slug: 'haircare',
            description: 'For healthy, shiny hair',
            image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
    })

    // Create 5 Sample Products
    const pt1 = await prisma.product.upsert({
        where: { slug: 'hydrating-facial-serum' },
        update: {},
        create: {
            name: 'Hydrating Facial Serum',
            slug: 'hydrating-facial-serum',
            description: 'Deeply hydrating serum with hyaluronic acid and vitamin C for a radiant glow.',
            price: 45.00,
            stock: 100,
            featured: true,
            categoryId: skincare.id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'])
        },
    })

    const pt2 = await prisma.product.upsert({
        where: { slug: 'matte-liquid-lipstick' },
        update: {},
        create: {
            name: 'Matte Liquid Lipstick',
            slug: 'matte-liquid-lipstick',
            description: 'Long-lasting, non-drying matte liquid lipstick in a vibrant crimson shade.',
            price: 24.50,
            stock: 50,
            featured: true,
            categoryId: makeup.id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'])
        },
    })

    const pt3 = await prisma.product.upsert({
        where: { slug: 'argan-oil-hair-mask' },
        update: {},
        create: {
            name: 'Argan Oil Hair Mask',
            slug: 'argan-oil-hair-mask',
            description: 'Intense repair hair mask infused with pure Moroccan argan oil.',
            price: 32.00,
            stock: 75,
            featured: false,
            categoryId: haircare.id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'])
        },
    })

    const pt4 = await prisma.product.upsert({
        where: { slug: 'refreshing-rose-toner' },
        update: {},
        create: {
            name: 'Refreshing Rose Toner',
            slug: 'refreshing-rose-toner',
            description: 'Gentle and soothing rose water toner for all skin types.',
            price: 28.00,
            stock: 120,
            featured: true,
            categoryId: skincare.id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'])
        },
    })

    const pt5 = await prisma.product.upsert({
        where: { slug: 'volumizing-mascara' },
        update: {},
        create: {
            name: 'Volumizing Mascara',
            slug: 'volumizing-mascara',
            description: 'Get dramatic, fuller lashes instantly with our clump-free formula.',
            price: 19.99,
            stock: 200,
            featured: false,
            categoryId: makeup.id,
            images: JSON.stringify(['https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'])
        },
    })

    console.log('Seeding complete!')
    console.log({ skincare, makeup, haircare, pt1, pt2, pt3, pt4, pt5 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
