'use server'

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const CategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    image: z.string().optional().or(z.literal('')),
})

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const imageRaw = formData.get('image') as string

    // Parse image URL from newline-separated string (take the first one)
    const image = imageRaw
        ? imageRaw.split('\n')[0].trim()
        : ''

    const validated = CategorySchema.parse({ name, description, image })
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.category.create({
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}

export async function updateCategory(id: string, formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const imageRaw = formData.get('image') as string

    // Parse image URL from newline-separated string (take the first one)
    const image = imageRaw
        ? imageRaw.split('\n')[0].trim()
        : ''

    const validated = CategorySchema.parse({ name, description, image })
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    await prisma.category.update({
        where: { id },
        data: {
            ...validated,
            slug,
        },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: { id },
    })

    revalidatePath('/admin/categories')
    revalidatePath('/products')
}
