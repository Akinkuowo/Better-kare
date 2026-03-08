'use server'

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    categoryId: z.string(),
    stock: z.number().int().min(0),
    images: z.array(z.string()),
    featured: z.boolean().default(false),
})

export async function createProduct(formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        categoryId: formData.get('categoryId') as string,
        stock: parseInt(formData.get('stock') as string),
        images: JSON.parse(formData.get('images') as string || '[]'),
        featured: formData.get('featured') === 'true',
    }

    const validated = ProductSchema.parse(data)
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.product.create({
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/products')
    revalidatePath('/products')
}

export async function updateProduct(id: string, formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        categoryId: formData.get('categoryId') as string,
        stock: parseInt(formData.get('stock') as string),
        images: JSON.parse(formData.get('images') as string || '[]'),
        featured: formData.get('featured') === 'true',
    }

    const validated = ProductSchema.parse(data)
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.product.update({
        where: { id },
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/products')
    revalidatePath('/products')
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        })

        revalidatePath('/admin/products')
        revalidatePath('/products')
    } catch (error) {
        console.error('Failed to delete product:', error)
        throw new Error('Failed to delete product')
    }
}