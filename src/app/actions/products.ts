'use server'

import { prisma } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function generateSlug(name: string) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const stock = parseInt(formData.get('stock') as string, 10)
    const categoryId = formData.get('categoryId') as string
    const featured = formData.get('featured') === 'on'
    const imagesRaw = formData.get('images') as string

    // Parse image URLs from newline-separated string
    const images = imagesRaw
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0)

    if (!name || !price || !categoryId) {
        throw new Error('Name, price, and category are required.')
    }

    let slug = generateSlug(name)

    // Ensure slug uniqueness by appending a short suffix if needed
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) {
        slug = `${slug}-${Date.now()}`
    }

    await prisma.product.create({
        data: {
            name,
            slug,
            description,
            price,
            stock: isNaN(stock) ? 0 : stock,
            categoryId,
            featured,
            images,
        },
    })

    revalidatePath('/admin/products')
    redirect('/admin/products')
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/products')
}
